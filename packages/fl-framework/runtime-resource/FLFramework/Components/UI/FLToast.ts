import { EToastShowTime } from "../../Constructors/FLEnums";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 吐司提示
 * zengbinsi
 * 2017-12-15
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLToast extends cc.Component {

    @property({
        type: cc.Node,
        tooltip: '吐司黑色背景'
    })
    bg: cc.Node = null;

    @property({
        type: cc.Label,
        tooltip: '吐司内容标签'
    })
    labContent: cc.Label = null;

    @property({
        tooltip: '吐司淡入时间'
    })
    fadeInTime: number = 0.3;

    @property({
        tooltip: '吐司淡出时间'
    })
    fadeOutTime: number = 0.3;

    onLoad () {
        // init logic
        // let node = cc.instantiate(prefabAsset);
        this.node.opacity = 0;
    }

    /**
     * 设置吐司显示
     * @param content 吐司内容
     */
    setData (content: string): FLToast {
        if (!this.node.parent) {
            cc.error('设置数据之前需要先将吐司添加到场景中。');
            return this;
        }

        this.labContent.overflow = cc.Label.Overflow.NONE;
        this.labContent.string = content;

        if (this.labContent.node.width > 500) {
            this.labContent.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.labContent.node.width = 500;
        }

        this.bg.width = this.labContent.node.width + 50;
        this.bg.height = this.labContent.node.height + 30;

        return this;
    }

    /**
     * 显示吐司
     * @param showTime 吐司显示时间
     * @param customTime 自定义吐司显示的时间，如果showTime为EToastShowTime.CUSTOM时，本参数为必选参数
     */
    show (showTime: EToastShowTime, customTime?: number): FLToast {
        this.node.opacity = 0;
        this.node.parent = cc.director.getScene().getChildByName('Canvas');
        this.node.x = 0;
        this.node.y = -(this.node.parent.height / 4);

        if (showTime === EToastShowTime.SHORT) {
            showTime = 1;
        } else if (showTime === EToastShowTime.LONG) {
            showTime = 3;
        } else if (showTime === EToastShowTime.CONTENT_LEN) {
            showTime = this.labContent.string.length * 0.3;
        } else if (showTime === EToastShowTime.CUSTOM) {
            showTime = customTime ? customTime : 1;
        } else {
            showTime = 1;
        }

        this.node.runAction(cc.sequence(
            cc.fadeIn(this.fadeInTime),
            cc.delayTime(showTime),
            cc.fadeOut(this.fadeOutTime),
            cc.callFunc(()=>{
                this.node.destroy();
            })
        ));

        return this;
    }
}
