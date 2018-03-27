import { EToastShowTime, EDialogButtonTypes } from "../Constructors/FLEnums";
import { FLToast } from "../Components/UI/FLToast";
import { FLDialog } from "../Components/UI/FLDialog";
import { FLLoadingMaskLayer } from "../Components/UI/FLLoadingMaskLayer";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 提示工具类
 * zengbinsi
 * 2017-12-15
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLToolTips {
    /**
     * 吐司预设
     */
    static toastPrefab: cc.Prefab;

    /**
     * 弹窗预设
     */
    static dialogPrefab: cc.Prefab;

    /**
     * 加载中遮盖层预设
     */
    static loadingMaskLayerPrefab: cc.Prefab;

    /**
     * 初始化预设
     */
    static init (): void {
        cc.loader.loadRes('pre/FLToast', cc.Prefab, (err, prefab)=>{
            if (err) {
                return; cc.error(err);
            }
            FLToolTips.toastPrefab = prefab;
        });

        cc.loader.loadRes('pre/FLDialog', cc.Prefab, (err, prefab)=>{
            if (err) {
                return; cc.error(err);
            }
            FLToolTips.dialogPrefab = prefab;
        });

        cc.loader.loadRes('pre/FLLoadingMaskLayer', cc.Prefab, (err, prefab)=>{
            if (err) {
                return; cc.error(err);
            }
            FLToolTips.loadingMaskLayerPrefab = prefab;
        });
    }

    /**
     * 显示吐司
     * @param content 吐司内容
     * @param showTime 吐司显示时长
     * @param customShowTime 自定义吐司显示时长，如果showTime为EToastShowTime.CUSTOM时，本参数为必选参数
     */
    static showToast (content: string, showTime: EToastShowTime, customShowTime?: number): void {
        if (!FLToolTips.toastPrefab) {
            cc.loader.loadRes('pre/FLToast', cc.Prefab, (err, prefab)=>{
                if (err) {
                    return cc.error(err);
                }
                FLToolTips.toastPrefab = prefab;
                return FLToolTips.showToast(content, showTime, customShowTime);
            });
        } else {
            let node = cc.instantiate(FLToolTips.toastPrefab);
            node.getComponent(FLToast).show(showTime, customShowTime).setData(content);
        }
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
    static showDialog (title: string, content: string, buttonType: EDialogButtonTypes = EDialogButtonTypes.SUBMIT, callback?: Function, submitTitle: string = '确定', cancellTitle: string = '取消'): void {
        if (!FLToolTips.dialogPrefab) {
            cc.loader.loadRes('pre/FLDialog', cc.Prefab, (err, prefab)=>{
                if (err) {
                    return cc.error(err);
                }
                FLToolTips.dialogPrefab = prefab;
                return FLToolTips.showDialog(title, content, buttonType, callback, submitTitle, cancellTitle);
            });
        } else {
            let node = cc.instantiate(FLToolTips.dialogPrefab);
            node.getComponent(FLDialog).setData(title, content, buttonType, callback, submitTitle, cancellTitle).show();
        }
    }

    /**
     * 显示加载中遮盖层
     * @param tipContent 遮盖层文字提示内容
     */
    static showLoadingMaskLayer (tipContent?: string): cc.Node {
        if (!FLToolTips.loadingMaskLayerPrefab) {
            cc.loader.loadRes('pre/FLLoadingMaskLayer', cc.Prefab, (err, prefab)=>{
                if (err) {
                    return cc.error(err);
                }
                FLToolTips.loadingMaskLayerPrefab = prefab;
                return FLToolTips.showLoadingMaskLayer(tipContent);
            });
        } else {
            let node = cc.instantiate(FLToolTips.loadingMaskLayerPrefab);
            node.getComponent(FLLoadingMaskLayer).setData(tipContent).show();
            return node;
        }
    }
}

if (cc.systemEvent) {
    // 游戏初始化完成
    cc.systemEvent.once(cc.game.EVENT_GAME_INITED, (event: cc.Event.EventCustom)=>{
        // 加载框架全局预设
        FLToolTips.init();
    });
}
