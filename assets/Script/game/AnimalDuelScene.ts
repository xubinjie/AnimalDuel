import {
    FLToolTips
} from "../../../packages/fl-framework/runtime-resource/FLFramework/Utils/FLToolTips";
import {
    EToastShowTime
} from "../../../packages/fl-framework/runtime-resource/FLFramework/Constructors/FLEnums";
import {
    FLRandom
} from "../../../packages/fl-framework/runtime-resource/FLFramework/Utils/FLRandom";
import {
    eAnimalType, eChessColor, GameState
} from "../common/GameEnums";
import Chess from "./Chess";
import MoveCom from "./MoveCom";
import {
    CHESSBOARD_POINT
} from "../common/GameConfig";
import GameData from "./GameData";


/**
 * 斗兽棋游戏场景组件
 */
const {
    ccclass,
    property
} = cc._decorator;

@ccclass
export default class AnimalDuelScene extends cc.Component {

    // /**
    //  * 
    //  */
    // @property({
    //     type:cc.Node,
    //     tooltip:''
    // })
    // node1: cc.Node = null;

    /**
     * 动物类型数组
     */
    animalTypeData = [
        eAnimalType.ELEPHANT,
        eAnimalType.ELEPHANT,
        eAnimalType.LION,
        eAnimalType.LION,
        eAnimalType.TIGER,
        eAnimalType.TIGER,
        eAnimalType.LEOPARD,
        eAnimalType.LEOPARD,
        eAnimalType.WOLF,
        eAnimalType.WOLF,
        eAnimalType.DOG,
        eAnimalType.DOG,
        eAnimalType.CAT,
        eAnimalType.CAT,
        eAnimalType.RAT,
        eAnimalType.RAT,
    ]


    /** 
     * 棋子预设
     */
    @property({
        type: cc.Prefab,
        tooltip: '棋预设'
    })
    preChess: cc.Prefab = null;

    /**
     * 蓝方棋子集合
     */
    blueChessArr: cc.Node[] = [];

     /**
     * 红方的棋子集合
     */
    redChessArr: cc.Node[] = [];

    onLoad() {
        this.initData();
    }

    /**
     * 初始化数据
     */
    initData() {
        this.animalTypeData = [
            eAnimalType.ELEPHANT,
            eAnimalType.ELEPHANT,
            eAnimalType.LION,
            eAnimalType.LION,
            eAnimalType.TIGER,
            eAnimalType.TIGER,
            eAnimalType.LEOPARD,
            eAnimalType.LEOPARD,
            eAnimalType.WOLF,
            eAnimalType.WOLF,
            eAnimalType.DOG,
            eAnimalType.DOG,
            eAnimalType.CAT,
            eAnimalType.CAT,
            eAnimalType.RAT,
            eAnimalType.RAT,
        ]
        this.initChessboard();

        this.gameStart();
    }



    /**
     * 初始化棋盘
     */
    initChessboard() {
        //棋牌坐标
        let localGridPosition = [{
                localGridX: 0,
                localGridY: 0
            }, {
                localGridX: 0,
                localGridY: 1
            }, {
                localGridX: 0,
                localGridY: 2
            }, {
                localGridX: 0,
                localGridY: 3
            },
            {
                localGridX: 1,
                localGridY: 0
            }, {
                localGridX: 1,
                localGridY: 1
            }, {
                localGridX: 1,
                localGridY: 2
            }, {
                localGridX: 1,
                localGridY: 3
            },
            {
                localGridX: 2,
                localGridY: 0
            }, {
                localGridX: 2,
                localGridY: 1
            }, {
                localGridX: 2,
                localGridY: 2
            }, {
                localGridX: 2,
                localGridY: 3
            },
            {
                localGridX: 3,
                localGridY: 0
            }, {
                localGridX: 3,
                localGridY: 1
            }, {
                localGridX: 3,
                localGridY: 2
            }, {
                localGridX: 3,
                localGridY: 3
            }
        ]

        for (let i = 0; i < 16; i++) {
            let max = 16 - (i + 1);
            //先随机取动物类型索引
            let index1 = FLRandom.randomNumberContainMax(0, max);
            //随机取格子横坐标索引
            let index2 = FLRandom.randomNumberContainMax(0, max);
            if (max === 0){
                index1 = 0;
                index2 = 0;
            }
            
            let type = this.animalTypeData[index1];
            let localGridPot = localGridPosition[index2];
            this.animalTypeData.splice(index1, 1);
            localGridPosition.splice(index2, 1);
            //创建棋牌
            this.createChess(type, {
                localGridX: localGridPot.localGridX,
                localGridY: localGridPot.localGridY
            });
        }
    }

    /**
     * 创建棋子
     * @param type 动物类型
     * @param pot 格子坐标
     */
    createChess(type, pot: {
        localGridX: number,
        localGridY: number
    }) {
        let node = cc.instantiate(this.preChess);
        node.parent = this.node;
        let initPot = CHESSBOARD_POINT[pot.localGridX][pot.localGridY];
        node.getComponent(Chess).initData(type);
        node.getComponent(MoveCom).initLocalPot(pot, initPot);
        node.x = initPot.x;
        node.y = initPot.y;
        //检查并放入数组
        this.checkPushChessArr(node);
    }

    /**
     * 将棋子添加的蓝色和红色的棋子数组
     * 检查并放入棋子数组，先放入蓝色棋子数组，
     * 如果有蓝色棋子数组中有相同类型的棋子则放入红色的棋子数组
     */
    checkPushChessArr(node){
        let type = node.getComponent(Chess).mType;
        let isAddBlue = true;
        for (let i = 0; i < this.blueChessArr.length; i++) {
            let blueChess = this.blueChessArr[i];
            //判断蓝方是否有相同类型的棋子，如果有，将isAddBlue设置为false
            let comChess = blueChess.getComponent(Chess);
            if (comChess.mType === type){
                isAddBlue = false;
            }
        }
        if (isAddBlue){
            this.blueChessArr.push(node);
        }else{
            this.redChessArr.push(node);
        }
        node.getComponent(Chess).setChessColor(isAddBlue);
    }

    /**
     * 游戏开始
     */
    gameStart(){
        //设置棋子颜色
        GameData.setPlayerColor(eChessColor.B, eChessColor.R);
        GameData.state = GameState.MY_BOUT;
    }



    // update (dt) {},
}