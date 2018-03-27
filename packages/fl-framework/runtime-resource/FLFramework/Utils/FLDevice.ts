/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 设备信息
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLDevice {

    /**
     * 是否是本地原生环境
     */
    static isNative (): boolean {
        return cc.sys.isNative;
    }

    /**
     * 是否原生iOS环境
     */
    static isNativeIOS (): boolean {
        return cc.sys.isNative && cc.sys.OS_IOS === cc.sys.os;
    }

    /**
     * 是否原生android OS环境
     */
    static isNativeAndroid (): boolean {
        return cc.sys.isNative && cc.sys.OS_ANDROID === cc.sys.os;
    }

    /**
     * 是否浏览器环境
     */
    static isBrowser (): boolean {
        return cc.sys.isBrowser;
    }

    /**
     * 是否iOS浏览器环境
     */
    static isBrowserIOS (): boolean {
        return cc.sys.isBrowser && cc.sys.OS_IOS === cc.sys.os;;
    }

    /**
     * 是否android浏览器环境
     */
    static isBrowserAndroid (): boolean {
        return cc.sys.isBrowser && cc.sys.OS_ANDROID === cc.sys.os;
    }

    /**
     * 是否是微信浏览器环境
     */
    static isBrowserWeChat (): boolean {
        let ua = window.navigator.userAgent.toLowerCase();
        // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        let tag = ua.match(/MicroMessenger/i);
        if (tag && tag.toString() == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 是否是微信小游戏环境
     */
    static isWechatGame (): boolean {
        return cc.sys.platform === cc.sys.WECHAT_GAME;
    }

    /**
     * 是否是移动设备
     */
    static isMobile (): boolean {
        return cc.sys.isMobile;
    }

    /**
     * 是否是移动设备原生环境
     */
    static isMobileNative (): boolean {
        return cc.sys.isMobile && cc.sys.isNative;
    }

    /**
     * 是否是移动设备浏览器环境
     */
    static isMobileBrowser (): boolean {
        return cc.sys.isMobile && cc.sys.isBrowser;
    }

    /**
     * 获取操作系统名称
     */
    static getOSName (): string {
        return cc.sys.os;
    }

    /**
     * 获取系统版本号
     */
    static getOSVersion (): string {
        return cc.sys.osVersion;
    };

    /**
     * 获取系统版本号
     */
    static getOSMainVersion (): number {
        return cc.sys.osMainVersion;
    };

    /**
     * 获取浏览器版本号
     */
    static getBrowerVersion (): string {
        return cc.sys.browserVersion;
    };

    /**
     * 获取浏览器类型
     */
    static getBrowserType (): string {
        return cc.sys.browserType;
    };


    /**
     * 获取设备窗口的像素尺寸
     */
    static getWindowPixelResolution (): cc.Size {
        return cc.sys.windowPixelResolution;
    };

    /**
     * 获取语言简称
     */
    static getLanguage (): string {
        return cc.sys.language;
    }
}
