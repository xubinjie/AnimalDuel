/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 放大镜
 * zengbinsi
 * 2017-10-17
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLMagnifier extends cc.Component {

    @property({
        type: cc.Node,
        tooltip: '内容节点，内容节点结构应该和被放大的节点结构完全一致。通常可以将被放大节点直接复制一份为内容节点。内容节点一般是mask节点的子节点。'
    })
    content: cc.Node = null;

    @property({
        tooltip: '缩放倍数'
    })
    magnifierScale: number = 2;

    @property({
        type: cc.Node,
        tooltip: '被放大的节点，就是放大镜观察的节点。该节点的子节点需要添加Widget组件，勾上四个方向的对齐，并设置Widget的“Align Once”为false。'
    })
    lookNode: cc.Node = null;

    onLoad () {
        this.content.scale = this.magnifierScale;
        this.content.anchorX = 0;
        this.content.anchorY = 0;
    }

    update (dt) {
        let wPos = this.node.convertToWorldSpace(cc.p(this.node.width / 2, this.node.height / 2));
        let nPos = this.lookNode.convertToNodeSpace(wPos);

        this.content.anchorX = nPos.x / this.lookNode.width;
        this.content.anchorY = nPos.y / this.lookNode.height;
    }
}
