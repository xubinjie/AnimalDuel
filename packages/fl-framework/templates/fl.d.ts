/**
 * 风领框架的命名空间模块，用于定义框架对象
 * 
 * 
 */

/**
 * js中的unescape()全局函数，可对通过 escape() 编码的字符串进行解码。
 * 
 * 该函数的工作原理是这样的：通过找到形式为 %xx 和 %uxxxx 的字符序列（x 表示十六进制的数字），用 Unicode 字符 \u00xx 和 \uxxxx 替换这样的字符序列进行解码。
 * ECMAScript v3 已从标准中删除了 unescape() 函数，并反对使用它，因此应该用 decodeURI() 和 decodeURIComponent() 取而代之。
 */
declare function unescape (any): string;

/**
 * socket.io 模块
 */
declare module io {
    export function connect(host: string, params?: any): any;
}

/**
 * 微信jssdk模块
 */
declare let wx: any;

/**
 * 风领框架全局模块
 */
declare module fl {
    /**
     * AppID
     */
    export const appId: string;
    /**
     * 渠道ID
     * 
     * C-001: 微信H5
     * C-101: iOS Native
     * C-201: android Native
     */
    export const channelId: string;
    /**
     * 版本号
     */
    export const version: string;
    /**
     * 是否启用调试模式
     */
    export const isDebug: boolean;
    /**
     * 音频剪辑对象
     */
    export const audioClips: any;

    /**
     * 是否是空值（null|undefined）
     * @param value 要判空的值
     */
    export function isEmpty (value): boolean;

    /**
     * 是否是空值（null|undefined|空字符串）
     * @param value 要判空的值
     */
    export function isEmptyString (value): boolean;

    /**
     * 如果对象为null或者undefined就返回第二个参数的值
     * @param value 要判空的值
     * @param defaultValue 默认返回值
     */
    export function ifnull (value, defaultValue): any;



    /**
     * protobuf.js 模块
     */
    export module ProtoBuf {
        export function Builder(options);
        export function ByteBuffer(capacity, littleEndian, noAssert);
        export function loadJson(json, builder, filename);
        export function loadJsonFile(filename, callback, builder);
        export function loadProto(proto, builder?, filename?);
        export function loadProtoFile(filename, callback, builder);
        export function newBuilder(options);
        export function protoFromFile(filename, callback, builder);
        export function protoFromString(proto, builder, filename);
    }
}