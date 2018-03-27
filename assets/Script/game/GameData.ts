import {
    eChessColor, GameState
} from "../common/GameEnums";

/**
 * 游戏全局数据
 */
const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class GameData {
    /**
     * 我的棋子颜色
     */
    static myColor: string = eChessColor.B;
    /**
     * 其他玩家的棋子颜色
     */
    static otherPlayerColor: string = eChessColor.R
    /**
     * 游戏状态
     */
    static state:GameState = GameState.READY;

    /**
     * 设置玩家棋子颜色
     * @param myColor 我的棋子颜色
     * @param otherPlayerColor 其他玩家棋子颜色
     */
    static setPlayerColor(myColor:eChessColor, otherPlayerColor:eChessColor){
        this.myColor = myColor;
        this.otherPlayerColor = otherPlayerColor;
    }

    

}