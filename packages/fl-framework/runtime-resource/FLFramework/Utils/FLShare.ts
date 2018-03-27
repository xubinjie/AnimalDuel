import { FLNetHTTP } from "./FLNetHTTP";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 分享模块
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLShare {

    /**
     * 初始化微信分享，获取签名，设置回调
     * @param routeURL 获取签名信息的服务端api链接
     * @param title 分享标题
     * @param desc 分享说明
     * @param url 分享链接
     * @param shareIconUrl 分享图链接（分享图300X300的png）
     * @param isDebug 是否启用调试模式
     */
    static wechatUseJSSDK (routeURL: string, title: string, desc: string, url: string, shareIconUrl: string, isDebug: boolean = false): void {
        if(wx) {
            FLNetHTTP.get(routeURL + '?url=' + encodeURIComponent(window.location.href.split('#')[0]), {}, (data)=>{
                let signPackage = data.data || data;
                wx.config({
                    debug: isDebug,
                    appId: signPackage.appid,
                    timestamp: signPackage.timestamp,
                    nonceStr: signPackage.nonceStr,
                    signature: signPackage.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'sendAppMessage'
                    ]
                });
                wx.ready(function () {
                    // 分享到朋友
                    wx.onMenuShareAppMessage({
                        title: title,
                        desc: desc,
                        link: url,
                        imgUrl: shareIconUrl
                    });
                    //分享到朋友圈  注：分享到朋友圈没有描述
                    wx.onMenuShareTimeline({
                        title: title,
                        // desc: wxCustomConfig.desc,//分享描述
                        link: url,
                        imgUrl: shareIconUrl
                    });
        
                });
            }, (err)=>{
                cc.warn(err);
            });
        } else {
            cc.warn('“wx”对象不存在！');
        }
    }
}
