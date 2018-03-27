/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * fl全局模块定义
 * zengbinsi
 * 2017-12-02
 */


window.fl = window.fl || {};
window.dcodeIO = window.dcodeIO || {};


/**
 * AppID
 */
fl.appId = 'fl-game-002';
/**
 * 渠道ID
 * 
 * C-001: 微信H5
 * C-002: 微信小游戏
 * C-101: iOS Native
 * C-201: android Native
 */
fl.channelId = 'C-001';
/**
 * 版本号
 */
fl.version = '0.2.1.0';
/**
 * 是否启用调试模式
 */
fl.isDebug = false;
/**
 * 音频剪辑对象
 */
fl.audioClips = {};









/**
 * 是否是空值（null|undefined）
 * @param value 要判空的值
 */
fl.isEmpty = function (value) {
    return (value === undefined || value === null);
};

/**
 * 是否是空值（null|undefined|空字符串）
 * @param value 要判空的值
 */
fl.isEmptyString = function (value) {
    return (fl.isEmpty(value) || value === '');
};

/**
 * 如果对象为null或者undefined就返回第二个参数的值
 * @param value 要判空的值
 * @param defaultValue 默认返回值
 */
fl.ifnull = function (value, defaultValue) {
    if (value === undefined || value === null) {
        return defaultValue;
    } else {
        return value;
    }
}





/**
 * protobuf.js 模块
 */
if (window.dcodeIO || window.dcodeIO.ProtoBuf) {
    fl.ProtoBuf = window.dcodeIO.ProtoBuf;
}

/**
 * crypto.js 模块
 */
if (CryptoJS || window.CryptoJS) {
    fl.CryptoJS = CryptoJS || window.CryptoJS;
}