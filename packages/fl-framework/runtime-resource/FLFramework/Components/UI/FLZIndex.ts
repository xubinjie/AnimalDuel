/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 调整层级顺序
 * zengbinsi
 * 2017-12-02
 */




 
const {ccclass, property, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
export class FLZIndex extends cc.Component {

    @property
    _zIndex: number = 0;

    @property({
        tooltip: '层级, 如果要在父节点下层，需要小于等于-1。',
    })
    get zIndex () {
        return this._zIndex;
    }
    set zIndex (value) {
        this._zIndex = value;
        this.targetNode.setLocalZOrder(this._zIndex);
    }
    // zIndex: number = 0;

    @property({
        type: cc.Node,
        tooltip: '节点对象，默认为当前组件关联的节点对象。'
    })
    targetNode: cc.Node = null;

    onLoad() {
        if (!this.targetNode) {
            this.targetNode = this.node;
        }

        // this.targetNode._sgNode.zIndex = this.zIndex;
        this.targetNode.setLocalZOrder(this._zIndex);
    }

    setZIndex (z) {
        this._zIndex = z;
        // this.targetNode._sgNode.zIndex = this.zIndex;
        this.targetNode.setLocalZOrder(this._zIndex);
    }

    getZIndex () {
        // return this.targetNode._sgNode.zIndex;
        return this.targetNode.getLocalZOrder();
    }
}
