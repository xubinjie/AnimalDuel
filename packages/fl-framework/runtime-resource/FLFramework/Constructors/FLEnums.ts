/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 框架枚举对象
 * zengbinsi
 * 2017-12-14
 */


/**
 * 弹窗的按钮类型
 */
export enum EDialogButtonTypes {
    /**
     * 只显示确认按钮
     */
    SUBMIT = 1,
    /**
     * 显示确认和取消按钮
     */
    SUBMIT_CANCELL
}

/**
 * 弹窗的结果
 */
export enum EDialogResults {
    /**
     * 已确认
     */
    CONFIRMED = 1,
    /**
     * 已取消
     */
    CANCELLED,
    /**
     * 关闭
     */
    CLOSED
}

/**
 * 吐司显示的时长
 */
export enum EToastShowTime {
    /**
     * 短
     */
    SHORT = 1,
    /**
     * 长
     */
    LONG,
    /**
     * 根据吐司内容长度
     */
    CONTENT_LEN,
    /**
     * 自定义时间
     */
    CUSTOM
}


/**
 * 方向枚举
 */
export enum EDirection {
    /**
     * 左边
     */
    LEFT = 10,
    /**
     * 右边
     */
    RIGHT = 20,
    /**
     * 顶部
     */
    TOP = 30,
    /**
     * 上面
     */
    UP = 31,
    /**
     * 底部
     */
    BOTTOM = 40,
    /**
     * 下
     */
    DOWN = 41,
    /**
     * 前面
     */
    FORE = 50,
    /**
     * 后面
     */
    BACK = 60,
    /**
     * 中间
     */
    CENTER = 70,
}
