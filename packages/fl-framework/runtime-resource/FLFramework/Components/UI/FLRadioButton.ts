/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 单选框
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLRadioButton extends cc.Component {

    @property({
        type: cc.SpriteFrame,
        tooltip: '未选中状态的图片'
    })
    sprUnchecked: cc.SpriteFrame = null;

    @property({
        type: cc.SpriteFrame,
        tooltip: '选中状态的图片'
    })
    sprChecked: cc.SpriteFrame = null;

    @property({
        type: cc.Sprite,
        tooltip: '显示状态的精灵，默认获取当前节点的cc.Sprite组件对象'
    })
    spr: cc.Sprite = null;

    @property({
        tooltip: '文字标签内容'
    })
    text: string = '';

    @property({
        type: cc.Label,
        tooltip: '文字标签'
    })
    labText: cc.Label = null;

    @property({
        tooltip: '是否默认选中'
    })
    isChecked: boolean = false;

    @property({
        tooltip: '是否允许取消选中'
    })
    isEnabledCancel: boolean = false;

    @property({
        tooltip: '是否允许点选Label标签也识别为有效操作，设置为false后只能点击当前节点才能出发状态切换'
    })
    isCheckLabel: boolean = true;

    @property({
        tooltip: '分组名称'
    })
    groupName: string = 'default';

    @property({
        type: [cc.Component.EventHandler],
        tooltip: '选中事件回调'
    })
    checkedEvents: Array<cc.Component.EventHandler> = [];

    onLoad() {
        if (!this.spr) {
            this.spr = this.node.getComponent(cc.Sprite);
        }

        if (this.isChecked) {
            this.onCheck();
        } else {
            this.onUncheck();
        }

        if (this.labText) {
            this.labText.string = this.text.toString();
        }

        // let node = cc.instantiate(prefabAsset);
        this.addCheckedEventListener();
    }

    onCheck () {
        this.isChecked = true;
        this.spr.spriteFrame = this.sprChecked;
    }

    onUncheck () {
        this.isChecked = false;
        this.spr.spriteFrame = this.sprUnchecked;
    }

    addCheckedEventListener () {
        cc.systemEvent.on('W_EVENT_WRADIO_BUTTON_CHECKED_' + this.groupName, this.onChecked, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.emitCheck, this);

        if (this.isCheckLabel && this.labText) {
            this.labText.node.on(cc.Node.EventType.TOUCH_START, (event)=>{
                // 2017-10-26 by zengbinsi
                // 这里不做任何操作，让touch时间自动冒泡到父节点去处理
                // 这里不做任何操作，让touch时间自动冒泡到父节点去处理
                // 这里不做任何操作，让touch时间自动冒泡到父节点去处理
            }, this);
        }
    }

    onChecked (event) {
        let data = event.getUserData() || {};
        // 标记当前是否是取消操作
        data.isCancelled = false;
        if (data.radioButton === this) {
            if (this.isChecked && this.isEnabledCancel) {
                this.onUncheck();
                // 标记当前是否是取消操作
                data.isCancelled = true;
            } else {
                this.onCheck();
            }
        } else {
            this.onUncheck();
        }

        // 标记是选中状态回调还是取消状态回调
        data.isChecked = this.isChecked;
        
        for (let i = 0; i < this.checkedEvents.length; ++i) {
            this.checkedEvents[i].emit([data, this.checkedEvents[i].customEventData]);
        }
    }

    // 触发
    emitCheck(event): void {
        if (this.isChecked && !this.isEnabledCancel) {return;}
        cc.systemEvent.emit('W_EVENT_WRADIO_BUTTON_CHECKED_' + this.groupName, {radioButton: this, target: this.node});
    }

    onDestroy () {
        cc.systemEvent.off('W_EVENT_WRADIO_BUTTON_CHECKED_' + this.groupName, this.onChecked, this);
    }
}
