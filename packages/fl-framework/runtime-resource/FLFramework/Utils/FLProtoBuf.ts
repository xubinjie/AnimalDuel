/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * protobuf.js 工具类
 * zengbinsi
 * 2017-12-13
 * 
 * 支持iOS和WEB平台，Android未测试 2017-12-23
 */
 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLProtoBuf {

    // import { FLProtoBuf } from "./Utils/FLProtoBuf";
    // import * as GameProtos from "../Constructors/Protos/GameProtos";
    // let builder = FLProtoBuf.loadProto(flProtoDefine, 'fl');
    // let buffer = FLProtoBuf.encodeObject(builder, 'UserInfo2', {id : 1001,name : "ihow"});
    // let u2 = FLProtoBuf.decodeBuffer(builder, 'UserInfo2', buffer)
    // cc.log(buffer);
    // cc.log(u2, u2.id, u2.name);

    /**
     * 加载Proto定义
     * @param protoDefine proto定义内容字符串
     * @param packageName proto定义中的package名称
     */
    static loadProto (protoDefine: string, packageName: string): any {
        if (!fl.ProtoBuf || !fl.ProtoBuf.loadProto) {
            return;
        }

        return fl.ProtoBuf.loadProto(protoDefine).build(packageName);
    }

    /**
     * 编码
     * @param build build对象
     * @param msgName message定义名称
     * @param obj js对象
     */
    static encodeObject (build, msgName, obj): any {
        try {
            var msgObj = new build[msgName](obj);
            var buffer = msgObj.encode().toBuffer();
            return buffer;
        } catch (e) {
            cc.error(e);
            return new ArrayBuffer(0);
        }
    }

    /**
     * 解码
     * @param build build对象
     * @param msgName message定义名称
     * @param buffer buffer对象
     */
    static decodeBuffer (build, msgName, buffer): any {
        try {
            var message = build[msgName].decode(buffer)
            return message;
        } catch (e) {
            cc.error(e);
            return {};
        }
    }

}
