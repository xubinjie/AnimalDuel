/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 加载遮盖层
 * zengbinsi
 * 2017-12-15
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLLoadingMaskLayer extends cc.Component {

    @property({
        type: cc.Node,
        tooltip: '加载中图标'
    })
    sprLoadingIcon: cc.Node = null;

    @property({
        type: cc.Label,
        tooltip: '遮盖文字提示'
    })
    labTip: cc.Label = null;

    @property({
        tooltip: '默认提示文字内容'
    })
    tipContent: string = '请稍后...';


    onLoad () {
        // init logic
        // let node = cc.instantiate(prefabAsset);
        if (this.labTip) {
            this.labTip.string = this.tipContent;
        }
    }

    /**
     * 设置提示文字
     * @param tipContent 提示文字
     */
    setData (tipContent: string): FLLoadingMaskLayer {
        this.tipContent = tipContent || '';

        if (!this.labTip) {
            return this;
        }

        this.labTip.string = this.tipContent;
        return this;
    }

    /**
     * 显示遮盖层
     */
    show (): FLLoadingMaskLayer {
        this.node.parent = cc.director.getScene().getChildByName('Canvas');
        this.node.x = 0;
        this.node.y = 0;

        return this;
    }
}
