/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 数据本地化
 * zengbinsi
 * 2017-08-08
 */


const { ccclass } = cc._decorator;

@ccclass
export class FLStore {

    /**
     * 保存数据
     * @param {string} key 索引键
     * @param {*} value 值
     */
    static set (key: string, value: any): void {
        let val: any = {
            type: typeof(value),
            value: value
        };
        val = JSON.stringify(val);
    
        // 记录key
        let keys: any = FLStore.get('flstoreKeys', {});
        keys[key] = 1;
        cc.sys.localStorage.setItem('flstoreKeys', JSON.stringify(keys));
        cc.sys.localStorage.setItem(key, val);
    }

    /**
     * 保存今天的数据 
     * @param {string} key 索引键 
     * @param {*} defaultValue 当没有取到值的时候返回的默认值 
     */
    static setTodayValue (key: string, value: any): void {
        let date: Date = new Date();
        let day: string = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay();

        return FLStore.set(key + '_' + day, value);
    }
    
    /**
     * 获取数据 
     * @param {string} key 索引键 
     * @param {*} defaultValue 当没有取到值的时候返回的默认值 
     */
    static get (key: string, defaultValue?: any): any {
        let data: any = cc.sys.localStorage.getItem(key);
        if (!data) {
            return defaultValue;
        }
    
        let val: any = JSON.parse(data);
    
        if (val.value === undefined || val.value === null) {
            return defaultValue;
        }
        return val.value;
    }

    /**
     * 获取今天的数据 
     * @param {string} key 索引键 
     * @param {*} defaultValue 当没有取到值的时候返回的默认值 
     */
    static getTodayValue (key: string, defaultValue: any): any {
        let date: Date = new Date();
        let day: string = date.getFullYear() + '_' + date.getMonth() + '_' + date.getDay();

        return FLStore.get(key + '_' + day, defaultValue);
    }

    /**
     * 获取bool值
     * @param {string} key 
     * @param {bool} defaultValue 
     */
    static getBool (key: string, defaultValue?: boolean): boolean {
        let value: any = FLStore.get(key);

        if (value === 'true') {
            return true;
        } else if (value === 'false') {
            return false;
        } 

        return defaultValue;
    }

    /**
     * 设置bool值
     * @param {string} key 
     * @param {bool} value 
     */
    static setBool (key: string, value: boolean): void {
        if (value === true) {
            FLStore.set(key, 'true');
        } else {
            FLStore.set(key, 'false');
        }
    }

    /**
     * 移除数据
     * @param {string} key 
     */
    static remove (key: string): void {
        cc.sys.localStorage.removeItem(key);
    }

    /**
     * 清空所有缓存数据
     */
    static clear (): void {
        let keys = FLStore.get('flstoreKeys', {});

        for (var key in keys) {
            cc.sys.localStorage.removeItem(key);
            keys[key] = undefined;
        }
        cc.sys.localStorage.setItem('flstoreKeys', JSON.stringify(keys));
    }
}




