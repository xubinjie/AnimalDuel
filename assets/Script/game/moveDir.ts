import { eMoveDir } from "../common/GameEnums";
import MoveCom from "./MoveCom";

/**
 * 移动方向组件
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class moveDir extends cc.Component {

    /**
     * 设置移动方向
     */
    @property({
        tooltip:'移动方向'
    })
    dir: String = eMoveDir.UP;
    


    onLoad () {
        //注册点击事件，点击后触发对应方向移动
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchMove, this);
    }

    /**
     * 触发移动事件
     */
    touchMove(){
        this.node.parent.getComponent(MoveCom).moveFn(this.dir);
    }

    /**
     * 运行动画效果
     */
    runEffect(){

    }

    onDestroy(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchMove, this);
    }

    
    // update (dt) {},
}
