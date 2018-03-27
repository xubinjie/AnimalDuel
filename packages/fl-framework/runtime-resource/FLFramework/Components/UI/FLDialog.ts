import { EDialogButtonTypes, EDialogResults } from "../../Constructors/FLEnums";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 对话框
 * zengbinsi
 * 2017-12-01
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLDialog extends cc.Component {

    @property({
        type: cc.Label,
        tooltip: '标题'
    })
    labTitle: cc.Label = null;

    @property({
        type: cc.Label,
        tooltip: '内容'
    })
    labContent: cc.Label = null;

    @property({
        type: cc.Node,
        tooltip: '确定按钮'
    })
    btnSubmit: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: '取消按钮'
    })
    btnCancell: cc.Node = null;

    @property({
        type: cc.Label,
        tooltip: '确定按钮的文字（可选）'
    })
    labButtonSubmitTitle: cc.Label = null;

    @property({
        type: cc.Label,
        tooltip: '取消按钮的文字（可选）'
    })
    labButtonCancellTitle: cc.Label = null;

    @property({
        tooltip: '按钮距离中心点的偏移量，默认100'
    })
    buttonOffsetX: number = 100;

    @property({
        tooltip: '点击按钮后是否默认关闭弹窗'
    })
    isAutoDestroy: boolean = true;

    /**
     * 弹窗回调，回调函数有个EDialogResults类型的result参数
     */
    private dialogCallback: Function = null;


    onLoad() {
        // init logic
        // let node = cc.instantiate(prefabAsset);
    }

    /**
     * 设置弹窗数据
     * @param title 弹窗标题
     * @param content 弹窗内容
     * @param buttonType 弹窗按钮类型，默认只显示确定按钮
     * @param callback 结果回调，回调函数有个EDialogResults类型的result参数
     * @param submitTitle 确认按钮标题
     * @param cancellTitle 取消按钮标题
     */
    setData (title: string, content: string, buttonType: EDialogButtonTypes = EDialogButtonTypes.SUBMIT, callback?: Function, submitTitle: string = '确定', cancellTitle: string = '取消'): FLDialog {
        this.labTitle.string = title;
        this.labContent.string = content;
        this.dialogCallback = callback;

        // 更改按钮显示
        if (buttonType === EDialogButtonTypes.SUBMIT) {
            this.btnCancell.active = false;
            this.btnSubmit.x = 0;
        } else {
            this.btnCancell.active = true;
            this.btnCancell.x = -this.buttonOffsetX;
            this.btnSubmit.x = this.buttonOffsetX;
        }

        // 更改按钮文字显示
        if (this.labButtonSubmitTitle) {
            this.labButtonSubmitTitle.string = submitTitle;
        }
        if (this.labButtonCancellTitle) {
            this.labButtonCancellTitle.string = cancellTitle;
        }

        return this;
    }

    // 点击确定按钮回调
    onSubmited (): void {
        if (this.dialogCallback) {
            this.dialogCallback.call(this.dialogCallback, EDialogResults.CONFIRMED);
        }

        if (this.isAutoDestroy) {
            this.hide();
        }
    }

    // 点击取消按钮回调
    onCancelled (): void {
        if (this.dialogCallback) {
            this.dialogCallback.call(this.dialogCallback, EDialogResults.CANCELLED);
        }

        if (this.isAutoDestroy) {
            this.hide();
        }
    }

    // 点击关闭按钮回调
    onClosed (): void {
        if (this.dialogCallback) {
            this.dialogCallback.call(this.dialogCallback, EDialogResults.CLOSED);
        }

        if (this.isAutoDestroy) {
            this.hide();
        }
    }

    /**
     * 显示弹窗
     */
    show (): FLDialog {
        this.node.parent = cc.director.getScene().getChildByName('Canvas');
        this.node.x = 0;
        this.node.y = 0;
        this.node.scale = 1.1;

        this.node.stopAllActions();
        this.node.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.95, 0.95),
            cc.scaleTo(0.1, 1, 1)
        ));

        return this;
    }

    hide (): void{
        this.node.stopAllActions();
        this.node.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.callFunc(()=>{
                this.node.destroy();
            })
        ));
    }
}
