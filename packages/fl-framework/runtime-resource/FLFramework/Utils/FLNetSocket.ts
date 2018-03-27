import { FLCryptoJS } from "./FLCryptoJS";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * Socket网络工具类
 * zengbinsi
 * 2017-12-07
 * 
 * 支持Native和WEB平台 2017-12-23
 */




const {ccclass, property} = cc._decorator;

@ccclass
export class FLNetSocket {

    /**
     * 链接主机地址
     * @param host 主机地址
     */
    static connection (host: string, params?: any): any {
        // let socket = io.connect("ws://tools.itharbors.com:4000", {"force new connection" : true, "transports": ['websocket']});
        let socket = io.connect(host, params);
        socket.on('connect', data=>{
            // 将网络事件转发成游戏事件
            cc.systemEvent.emit('connect', data);
        });

        socket.on('disconnect', data=>{
            // 将网络事件转发成游戏事件
            cc.systemEvent.emit('disconnect', data);
        });
        return socket
    }

    /**
     * 添加网络事件
     * @param socket 套接字对象
     * @param eventName 事件名称
     * @param cryptoKey 密钥
     */
    static addEvent (socket, eventName: string, cryptoKey?: string) {
        // 注册事件监听
        socket.on(eventName, data=>{
            if (cryptoKey && data) {
                data = FLCryptoJS.aesDecrypt(data, cryptoKey);
            }
            // 将网络事件转发成游戏事件
            cc.systemEvent.emit(eventName, data);
        });
    }
}
