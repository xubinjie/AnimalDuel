import { eChessColor, eChessState } from "../common/GameEnums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Chess extends cc.Component {

    /**
     * 
     */
    @property({
        type:cc.Label,
        tooltip:''
    })
    lb: cc.Label = null;

    /**
     * 棋子类型
     */
    mType :number = 0;

    /**
     * 是否为蓝方的棋子,默认为蓝方，否则为红方
     */
    isBlue:eChessColor = eChessColor.B;

    
    /**
     * 棋子状态
     */
    chessState:eChessState = eChessState.NOT_OPEN;

    /**
     * 盖子
     */
    @property({
        type:cc.Node,
        tooltip:'盖子',
    })
    cap :cc.Node = null;

    onLoad () {
        
    }

    /**
     * 初始化棋子数据
     */
    initData(type){
        this.mType = type;
        this.lb.string = type;
    }

    /**
     * 设置动物图片
     */
    setAnimalIMG(){

    }

    /**
     * 设置棋子颜色
     * @param 是否为蓝方棋子
     */
    setChessColor(isAddBlue){
        if (isAddBlue){
            this.node.color =  cc.color(0,100,180,255);
        }else{
            this.node.color =  cc.color(160,80,0,255);
            this.isBlue = eChessColor.R;
        }
    }

    /**
     * 隐藏盖子
     */
    hideCap(){
        this.cap.active = false;
    }

    
    
    // update (dt) {},
}
