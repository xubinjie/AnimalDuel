/**
 * 枚举：动物类型
 */
export enum eAnimalType {
    /**
     * 大象
     */
    ELEPHANT = 8,
    /**
     * 狮子
     */
    LION = 7,
    /**
     * 老虎
     */
    TIGER = 6,
    /**
     * 豹
     */
    LEOPARD = 5,
    /**
     * 狼
     */
    WOLF = 4,
    /**
     * 狗
     */
    DOG = 3,
    /**
     * 猫
     */
    CAT = 2,
    /**
     * 鼠
     */
    RAT = 1,
}

/**
 * 棋子颜色
 */
export enum eChessColor {
    /**
     * 蓝色
     */
    B = 'b',
    /**
     * 红色
     */
    R = 'r',
}

/**
 * 游戏状态
 */
export enum GameState {
  /**
   * 准备好
   */
  READY = 10001,
  /**
   * 我的回合
   */
  MY_BOUT = 10002,
  /**
   * 其他人回合
   */
  OTHER_BOUT = 10003,
  /**
   * 其他人的回合
   */
  GAME_OVER = 10004,

}

/**
 * 棋子状态
 */
export enum eChessState{
    /**
     * 未打开
     */
    NOT_OPEN = 11001,
    /**
     * 未选中
     */
    NOT_CHOOSE = 11002,
    /**
     * 选中
     */
    CHOOSE = 11003,
}

/**
 * 游戏枚举
 */
export enum eGameEvents{
    /**
     * 我的回合结束
     */
    MY_BOUT_END = '20001',
    /**
     * 棋子重置
     */
    RESET_FN = '20002',
}

/**
 * 移动方向
 */
export enum eMoveDir{
    /**
     * 上
     */
    UP = '13001',
    /**
     * 下
     */
    Down = '13002',
    /**
     * 左
     */
    LEFT = '13003',
    /**
     * 右
     */
    RIGHT = '13004',
}