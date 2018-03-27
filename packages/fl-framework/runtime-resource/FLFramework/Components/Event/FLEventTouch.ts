/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 触摸事件组件
 * zengbinsi
 * 2017-12-02
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLEventTouch extends cc.Component {

    @property({
        type: [cc.Component.EventHandler],
        tooltip: '当手指触点落在目标节点区域内时的回调'
    })
    touchStart: cc.Component.EventHandler[] = [];

    @property({
        type: [cc.Component.EventHandler],
        tooltip: '当手指在屏幕上目标节点区域内移动时的回调'
    })
    touchMove: cc.Component.EventHandler[] = [];

    @property({
        type: [cc.Component.EventHandler],
        tooltip: '当手指在目标节点区域内离开屏幕时的回调'
    })
    touchEnd: cc.Component.EventHandler[] = [];

    @property({
        type: [cc.Component.EventHandler],
        tooltip: '当手指在目标节点区域外离开屏幕时的回调'
    })
    touchCancel: cc.Component.EventHandler[] = [];

    onLoad () {
        // let node = cc.instantiate(prefabAsset);
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            for (let i = 0; i < this.touchStart.length; ++i) {
                this.touchStart[i].emit([event]);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            for (let i = 0; i < this.touchMove.length; ++i) {
                this.touchMove[i].emit([event]);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            for (let i = 0; i < this.touchEnd.length; ++i) {
                this.touchEnd[i].emit([event]);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            for (let i = 0; i < this.touchCancel.length; ++i) {
                this.touchCancel[i].emit([event]);
            }
        }, this);
    }
}
