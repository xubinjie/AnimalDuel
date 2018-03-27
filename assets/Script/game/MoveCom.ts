import Chess from "./Chess";
import { GameState, eGameEvents, eChessState, eMoveDir } from "../common/GameEnums";
import GameData from "./GameData";
import { CHESSBOARD_POINT } from "../common/GameConfig";
import moveDir from "./moveDir";

/**
 * 移动组件，棋子移动等等
 */
const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class MoveCom extends cc.Component {

    // /**
    //  * 
    //  */
    // @property({
    //     type:cc.Node,
    //     tooltip:''
    // })
    // node1: cc.Node = null;

    /**
     * 棋盘的横坐标0123
     * 
     */
    localX: number = 0;
    /**
     * 棋盘的纵坐标0123
     */
    localY: number = 0;


    /**
     * 记录坐标
     */
    mPot:cc.Vec2 = null;

    /**
     * 棋子组件
     */
    comChess:Chess = null;

    /**
     * 操作棋子移动方向：上
     */
    moveDir1 : cc.Node = null;
    /**
     * 操作棋子移动方向：下
     */
    moveDir2 : cc.Node = null;
    /**
     * 操作棋子移动方向：左
     */
    moveDir3 : cc.Node = null;
    /**
     * 操作棋子移动方向：右
     */
    moveDir4 : cc.Node = null;

    onLoad() {
        this.comChess = this.node.getComponent(Chess);
        this.moveDir1 = this.node.getChildByName('moveDir1');
        this.moveDir2 = this.node.getChildByName('moveDir2');
        this.moveDir3 = this.node.getChildByName('moveDir3');
        this.moveDir4 = this.node.getChildByName('moveDir4');

        cc.systemEvent.on(eGameEvents.MY_BOUT_END, this.setMyBoutEnd, this);
        cc.systemEvent.on(eGameEvents.RESET_FN, this.resetFn, this);

    }

    /**
     *   初始化棋盘格子的位置
     * @param pot 位置
     */
    initLocalPot(pot: {
        localGridX: number,
        localGridY: number
    }, mPot:cc.Vec2 ) {
        this.localX = pot.localGridX;
        this.localY = pot.localGridY;

        this.mPot = mPot;
    }

    /**
     * 准备移动
     */
    prepare() {
        //判断移动下一步
        //下一步是否有棋子，是对方棋子还是我方棋子
        //对方棋子，比较大小，是否能杀死对方
        //判断是否移动成功
    }

    /**
     * 移动
     */
    moveFn(dir) {
        if (dir === eMoveDir.UP){
            this.localY = this.localY + 1;
            
        }
        if (dir === eMoveDir.Down){
            this.localY = this.localY - 1;
        }
        if (dir === eMoveDir.LEFT){
            this.localX = this.localX - 1;
        }
        if (dir === eMoveDir.RIGHT){
            this.localX = this.localX + 1;
        }

        let pot = CHESSBOARD_POINT[this.localX][this.localY];
        cc.log(pot);
        let act = cc.sequence(
            cc.moveTo(0.2, pot.x, pot.y),
            cc.callFunc(()=>{
                cc.log(dir);
            }),
        )
        this.node.runAction(act);
    }

    /**
     * 是否杀死对方棋子
     */
    isKill() {

    }

    /**
     * 点击移动
     */
    userTouch() {
        //是否是我的回合,不是则不能点击棋子
        if (GameData.state!= GameState.MY_BOUT){
            return
        }
        //点击的棋子是否打开过，没有的话则打开棋子
        if (this.comChess.chessState === eChessState.NOT_OPEN){
            this.openChess();
            return
        }

        //判断点击是不是我的颜色棋子
        if (GameData.myColor != this.comChess.isBlue){
            return;
        }
        cc.log(this.comChess.chessState);
        //判断是否是选中状态
        if(this.comChess.chessState === eChessState.CHOOSE){
            this.putDownChess();
        }else if(this.comChess.chessState === eChessState.NOT_CHOOSE){
            this.chooseChess();
        }
        
    }

    /**
     * 打开棋子
     */
    openChess(){
        //打开棋子调用我的回合结束
        cc.systemEvent.emit(eGameEvents.RESET_FN);
        this.comChess.chessState = eChessState.NOT_CHOOSE;
        this.comChess.hideCap();
        
        cc.systemEvent.emit(eGameEvents.MY_BOUT_END);
    }

    /**
     * 选中棋子
     */
    chooseChess(){
        if (this.comChess.chessState === eChessState.CHOOSE){
            return;
        }
        cc.systemEvent.emit(eGameEvents.RESET_FN);
        this.comChess.chessState = eChessState.CHOOSE;
        this.node.runAction(cc.scaleTo(0.1, 1.1, 1.1));
        this.node.runAction(cc.moveBy(0.1, 0, 20));
        let z = this.node.getSiblingIndex();
        let newZ = z+100;
        this.node.setSiblingIndex(newZ);

        this.activateMove();
    }

    /**
     * 放下棋子
     */
    putDownChess(){
        if (this.comChess.chessState === eChessState.NOT_CHOOSE){
            return;
        }
        this.comChess.chessState = eChessState.NOT_CHOOSE;
        this.node.runAction(cc.scaleTo(0.1, 1, 1));
        this.node.runAction(cc.moveBy(0.1, 0, -20));
        let z = this.node.getSiblingIndex();
        this.node.setSiblingIndex(1);
        this.hideMove();
    }

    /**
     * 重置
     */
    resetFn(){
        if (this.comChess.chessState === eChessState.CHOOSE){
            this.node.stopAllActions();
            this.node.setPosition(this.mPot);
            this.node.scaleX = 1;        
            this.node.scaleY = 1;
            this.comChess.chessState = eChessState.NOT_CHOOSE;
            this.hideMove();    
        }
    }

    /**
     * 激活移动
     */
    activateMove(){
        if (this.localY<3){
            this.moveDir1.active = true;
            this.moveDir1.getComponent(moveDir).runEffect();
        }
        if (this.localY>0){
            this.moveDir2.active = true;
            this.moveDir2.getComponent(moveDir).runEffect();
        }
        if (this.localX>0){
            this.moveDir3.active = true;
            this.moveDir3.getComponent(moveDir).runEffect();
        }
        if (this.localX<3){
            this.moveDir4.active = true;
            this.moveDir4.getComponent(moveDir).runEffect();
        }
    }

    /**
     * 隐藏移动
     */
    hideMove(){
        this.moveDir1.active = false;
        this.moveDir2.active = false;
        this.moveDir3.active = false;
        this.moveDir4.active = false;
    }

    

    

    /**
     * 设置我的回合结束
     */
    setMyBoutEnd(){
        
    }


    onDestroy(){
        cc.systemEvent.off(eGameEvents.MY_BOUT_END, this.setMyBoutEnd, this);
        cc.systemEvent.off(eGameEvents.RESET_FN, this.resetFn, this);
    }

    // update (dt) {},
}