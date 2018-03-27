/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 精灵添加shader特效
 * zengbinsi
 * 2017-06-28
 */



const {ccclass, property} = cc._decorator;

@ccclass
export default class FLShaderUtil extends cc.Component {

    @property({
        displayName: 'Vert No MVP Native',
        tooltip: 'native顶点着色器的代码模块名称（文件名）或者模块文件路径（包含文件名和扩展名），比如：blur_vsh。'
    })
    vert_no_mvp = '';

    @property({
        displayName: 'Vert Web',
        tooltip: 'web顶点着色器的代码模块名称（文件名）或者模块文件路径（包含文件名和扩展名），比如：blur_vsh。'
    })
    vert = '';

    @property({
        displayName: 'Frag',
        tooltip: '片元着色器的代码模块名称（文件名）或者模块文件路径（包含文件名和扩展名），比如：blur_fsh。'
    })
    frag = '';

    @property({
        displayName: 'Show Debug Logs',
        tooltip: '是否显示调试日志'
    })
    isShowDebugLogs = false;

    @property({
        tooltip: '是否默认启用'
    })
    isAutoUse = false;


    onLoad () {
        this.glNode = this.getComponent('cc.Sprite')._sgNode;
        this.defaultGLProgram = this.getGLProgram();

        if (this.isAutoUse) {
            let self = this;
            this.node.runAction(cc.callFunc(()=>{
                return self.use();
            }))
        }
    }

    /**
     * 使用Shader
     * @param {cc.String} vert_no_mvp 
     * @param {cc.String} vert 
     * @param {cc.String} frag 
     */
    use (vert_no_mvp, vert, frag) {
        this.vert_no_mvp = vert_no_mvp || this.vert_no_mvp;
        this.vert = vert || this.vert;
        this.frag = frag || this.frag;

        if (cc.sys.isNative) {
            if (this.frag === '' || this.vert_no_mvp === '' || this.frag === null || this.vert_no_mvp === null) {
                if (this.isShowDebugLogs) {cc.log('【WShaderUtil】vert or frag is null.');}
                return;
            }
        } else {
            if (this.frag === '' || this.vert === '' || this.frag === null || this.vert === null) {
                if (this.isShowDebugLogs) {cc.log('【WShaderUtil】vert or frag is null.');}
                return;
            }
        }

        this.glNode = this.getComponent('cc.Sprite')._sgNode;

        this.loadShaderCode();
        this.onInitGLProgram();
    }

    /**
     * 读取渲染程序代码
     */
    loadShaderCode () {

        if (this.isShowDebugLogs) {cc.log('【WShaderUtil】require GL code from module.');}
        if (cc.sys.isNative) {
            if (this.isShowDebugLogs) {cc.log('【WShaderUtil】require vert_no_mvp from module.');}
            this._default_vert_no_mvp = require(this.vert_no_mvp);
        } else {
            if (this.isShowDebugLogs) {cc.log('【WShaderUtil】require vert from module.');}
            this._default_vert = require(this.vert);
        }
        if (this.isShowDebugLogs) {cc.log('【WShaderUtil】require frag from module.');}
        this._black_white_frag = require(this.frag);
    }

    /**
     * 初始化GLProgram
     */
    onInitGLProgram () {
        if (this.isShowDebugLogs) {cc.log('【WShaderUtil】init GL Program.');}
        this._program = new cc.GLProgram();

        if (cc.sys.isNative) {
            if (this.isShowDebugLogs) {cc.log("【WShaderUtil】use native GLProgram");}
            this._program.initWithString(this._default_vert_no_mvp, this._black_white_frag);
            this._program.link();
            this._program.updateUniforms();
        } else {
            if (this.isShowDebugLogs) {cc.log("【WShaderUtil】use webGL GLProgram");}
            this._program.initWithVertexShaderByteArray(this._default_vert, this._black_white_frag);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
            this._program.link();
            this._program.updateUniforms();
        }
        this.setProgram(this.glNode, this._program);
        if (this.isShowDebugLogs) {cc.log('【WShaderUtil】use GL Program success.');}
    }

    /**
     * 设置GLProgram
     * @param {ccsg.Node} sgNode 
     * @param {cc.GLProgram} glProgram 
     */
    setProgram (sgNode, glProgram) {
        if (this.isShowDebugLogs) {cc.log('【WShaderUtil】set GL Program.');}
        if (cc.sys.isNative) {
            var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(glProgram);
            this.defaultGLProgram = sgNode.getGLProgramState();
            sgNode.setGLProgramState(glProgram_state);
        } else {
            this.defaultGLProgram = sgNode.getShaderProgram();
            sgNode.setShaderProgram(glProgram);    
        }
        
        var children = sgNode.children;
        if (!children) {
            return;
        }
    
        for (var i = 0; i < children.length; i++) {
            this.setProgram(children[i], glProgram);
        }
    }

    /**
     * 重置shader
     */
    resetGLProgram () {
        this.glNode = this.glNode || this.getComponent('cc.Sprite')._sgNode;

        if (cc.sys.isNative && this.defaultGLProgram) {
            this.glNode.setGLProgramState(this.defaultGLProgram);
        } else {
            this.glNode.setShaderProgram(this.defaultGLProgram);
        }
    }

    /**
     * 获取当前精灵的GLProgram
     */
    getGLProgram () {
        this.glNode = this.glNode || this.getComponent('cc.Sprite')._sgNode;

        if (cc.sys.isNative) {
            this.defaultGLProgram = this.glNode.getGLProgramState();
        } else {
            this.defaultGLProgram = this.glNode.getShaderProgram();
        }

        return this.defaultGLProgram;
    }

    /**
     * 禁用特效
     */
    unuse () {
        this.resetGLProgram();
    }

    // 每帧调用，去除注释启用该脚本生命周期
    // update () {
    //     // TODO
    // }
}

