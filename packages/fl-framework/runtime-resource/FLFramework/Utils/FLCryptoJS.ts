/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * CryptoJS工具类
 * zengbinsi
 * 2017-12-19
 * 
 * 支持iOS和WEB平台，Android未测试 2017-12-23
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLCryptoJS {

    /* 使用方法 https://www.npmjs.com/package/crypto-js */
    

    /**
     * aes加密
     * @param content 要加密的内容
     * @param key 秘钥
     */
    static aesEncrypt (content, key: string): string {
        return fl.CryptoJS.AES.encrypt(content, key).toString();
    }

    /**
     * aes解密
     * @param content 要解密的内容
     * @param key 秘钥
     */
    static aesDecrypt (content: string, key: string): string {
        var bytes  = fl.CryptoJS.AES.decrypt(content, key);
        return bytes.toString(fl.CryptoJS.enc.Utf8);
    }
}
