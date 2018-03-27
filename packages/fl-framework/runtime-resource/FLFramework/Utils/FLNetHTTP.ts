import { FLCryptoJS } from "./FLCryptoJS";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * HTTP网络工具类
 * zengbinsi
 * 2017-12-07
 * 
 * 支持Native和WEB平台 2017-12-23
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLNetHTTP {
    /**
     * 发送一个HTTP GET请求
     * @param router 路由
     * @param params 参数
     * @param cb 成功的回调
     * @param cbExcep 失败的回调
     * @param cryptoKey 密钥
     */
    static get (router: string, params: any, cb: any, cbExcep: any, cryptoKey?: string): void {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let responseText = xhr.responseText;
                    if (cryptoKey && xhr.responseText) {
                        responseText = FLCryptoJS.aesDecrypt(responseText, cryptoKey);
                    }

                    try {
                        let res = JSON.parse(responseText);
    
                        if (res.code < 200 || res.code >= 400) {
                            return cbExcep(res);
                        }
                        return cb(res);
                    } catch (error) {
                        return cb(responseText);
                    }
                } else if (cbExcep) {
                    return cbExcep(xhr.responseText ? JSON.parse(xhr.responseText) : xhr);
                }
            }
        };
    
        xhr.open("GET", router, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
        if (params.headerParams) {
            for (var key in params.headerParams) {
                xhr.setRequestHeader(key, params.headerParams[key]);
            }
        }
        params.headerParams = undefined;
    
        try {
            xhr.send();
        } catch (e) {
            cc.error(e);
        }
    };

    /**
     * 发送请求（POST/PUT/DELETE），默认是POST
     * @param router 路由
     * @param methodName 请求方法名
     * @param params 参数
     * @param cb 成功回调
     * @param cbExcep 失败回调 
     * @param cryptoKey 密钥 
     */
    static sendRequerst(router: string, methodName: string, params: any, cb: any, cbExcep: any, cryptoKey?: string): void {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    let responseText = xhr.responseText;
                    if (cryptoKey && xhr.responseText) {
                        responseText = FLCryptoJS.aesDecrypt(responseText, cryptoKey);
                    }

                    try {
                        let res = JSON.parse(responseText);
    
                        if (res.code < 200 || res.code >= 400) {
                            return cbExcep(res);
                        }
                        return cb(res);
                    } catch (err) {
                        return cb(responseText);
                    }
                } else if (cbExcep) {
                    return cbExcep(xhr.responseText ? JSON.parse(xhr.responseText) : xhr);
                }
            }
        };
    
        xhr.open(methodName || "POST", router);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
        if (params.headerParams) {
            for (var key in params.headerParams) {
                xhr.setRequestHeader(key, params.headerParams[key]);
            }
        }
        params.headerParams = undefined;
    
        try {
            if (cryptoKey) {
                params = FLCryptoJS.aesEncrypt(JSON.stringify(params), cryptoKey);
                xhr.send(params);
            } else {
                xhr.send(JSON.stringify(params));
            }
        } catch (e) {
            cc.error(e);
        }
    }

    /**
     * 发送POST请求
     * @param router 路由
     * @param params 参数
     * @param cb 成功回调
     * @param cbExcep 失败回调 
     */
    static post (router: string, params: any, cb: any, cbExcep: any): void {
        return FLNetHTTP.sendRequerst(router, 'POST', params, cb, cbExcep);
    };

    /**
     * 发送PUT请求
     * @param router 路由
     * @param params 参数
     * @param cb 成功回调
     * @param cbExcep 失败回调 
     */
    static put (router, params, cb, cbExcep) {
        return FLNetHTTP.sendRequerst(router, 'PUT', params, cb, cbExcep);
    };

    /**
     * 发送DELETE请求
     * @param router 路由
     * @param params 参数
     * @param cb 成功回调
     * @param cbExcep 失败回调 
     */
    static delete (router, params, cb, cbExcep) {
        return FLNetHTTP.sendRequerst(router, 'DELETE', params, cb, cbExcep);
    };

    /**
     * 在新的浏览器窗口中打开一个URL网络链接
     * @param url 网络链接
     */
    static openURLOnNewWindow (url): void {
        if (window.open) {
            window.open(url);
        } else {
            jsb.reflection.callStaticMethod("CocosJSBUtil", "openURL:", url);
        }
    }

    /**
     * 在当前浏览器窗口中打开一个URL网络链接
     * @param url 网络链接
     */
    static openURLOnThisWindow (url): void {
        if (window.location) {
            window.location.href = url;
        } else {
            jsb.reflection.callStaticMethod("CocosJSBUtil", "openURL:", url);
        }
    }

    /**
     * 获取当前页面URL中的参数  http://localhost:7456/?code=85c5eb85-e98f-47a5-81e4-5c51a0d792bd
     * @param name：URL中携带的数据参数名
     */
    static getQueryParams (name): string {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);

        if (r !== null) {
            if (decodeURIComponent) {
                return decodeURIComponent(r[2]);
            } else if (decodeURI) {
                return decodeURI(r[2]);
            } else {
                return unescape(r[2]);
            }
        }
        return null;
    };

    /**
     * 获取当前页面URL中的所有参数  http://localhost:7456/?code=85c5eb85-e98f-47a5-81e4-5c51a0d792bd&eid=100011&rid=961096
     * @param name：URL中携带的数据参数名
     */
    static getQueryArgs (): any { 
        let url = window.location.search; //获取url中"?"符后的字串 
        let theRequest = new Object(); 

        if (url.indexOf("?") != -1) { 
            let str = url.substr(1); 
            let strs = str.split("&"); 
            
            for(let i = 0; i < strs.length; i ++) { 
                
                if (decodeURIComponent) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]); 
                } else if (decodeURI) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]); 
                } else {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]); 
                }
            } 
        } 
        return theRequest; 
    };
}
