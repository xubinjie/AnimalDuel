import { FLDevice } from "./FLDevice";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 本地原生平台文件工具类
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLFileUtil {
    /**
     * 添加游戏资源检索路径
     * @param newPath 路径
     */
    static addSearchPath (newPath: string): void {
        if (FLDevice.isNative()) {
            var searchPaths = jsb.fileUtils.getSearchPaths();
            searchPaths.unshift(newPath);
            jsb.fileUtils.setSearchPaths(searchPaths);
        } else {
            cc.info('[FLFileUtil addSearchPath(string)void] Can not use "jsb".');
        }
    }

    /**
     * 获取文件的全路径
     * @param filePath 文件路径
     */
    static fullPathForFilename (filePath: string): string {
        if (FLDevice.isNative()) {
            return jsb.fileUtils.fullPathForFilename(filePath);
        } else {
            cc.info('[FLFileUtil fullPathForFilename(string)string] Can not use "jsb".');
        }
    }

    /**
     * 获取原生平台可写目录
     */
    static getWritablePath (): string {
        if (FLDevice.isNative()) {
            return jsb.fileUtils.getWritablePath();
        } else {
            cc.info('[FLFileUtil getWritablePath] Can not use "jsb".');
        }
    }

    /**
     * 判断文件是否存在
     * @param filePath 文件路径
     */
    static isFileExist (filePath: string): boolean {
        if (FLDevice.isNative()) {
            return jsb.fileUtils.isFileExist(filePath);
        } else {
            cc.info('[FLFileUtil isFileExist(string)boolean] Can not use "jsb".');
        }
    }

    /**
     * 读取文件的全部内容
     * @param filePath 文件路径
     */
    static getDataFromFile (filePath: string): string {
        if (FLDevice.isNative()) {
            return jsb.fileUtils.getDataFromFile(filePath);
        } else {
            cc.info('[FLFileUtil getDataFromFile(string)string] Can not use "jsb".');
        }
    }

    /**
     * 删除文件
     * @param filePath 文件路径
     */
    static removeFile (filePath: string): any {
        if (FLDevice.isNative()) {
            return jsb.fileUtils.removeFile(filePath);
        } else {
            cc.info('[FLFileUtil removeFile(string)any] Can not use "jsb".');
        }
    }
}
