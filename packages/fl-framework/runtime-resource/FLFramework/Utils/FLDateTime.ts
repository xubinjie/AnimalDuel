/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 日期-时间
 * zengbinsi
 * 2017-12-02
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLDateTime extends Date {

    // constructor (dateStr?: any) {
    //     super(dateStr);
    // }

    /**
     * 获取时间戳（秒）
     * @param isMillisecond 是否返回毫秒时间戳
     */
    static getTimeStamp (isMillisecond?: boolean): number {
        if (isMillisecond) {
            return (new Date()).getTime();
        } else {
            return Math.floor((new Date()).getTime() / 1000);
        }
    }

    /**
     * 时间戳转Date对象
     * @param {string | number} timeStamp 时间戳
     * @param {boolean} isMillisecond 是否是毫秒
     * @returns {Date}
     */
    static convertToDate (timeStamp: number, isMillisecond?: boolean): Date {
        timeStamp = Math.floor(timeStamp);

        if (!isMillisecond) {
            timeStamp *= 1000;
        }
    
        return new Date(timeStamp);
    }






    /**
     * 格式化时间 2017-10-20 00:00:00
     * @param date 时间
     */
    format (date: Date): string {
        let r = '';
    
        r += date.getFullYear() + '-';
        r += (date.getMonth() + 1) + '-';
        r += date.getDate() + ' ';
    
        r += date.getHours() + ':';
        r += date.getMinutes() + ':';
        r += date.getSeconds();
    
        return r;
    }

    /**
     * 格式化时间字符串 00:00:00
     * @param time 时间戳（秒）
     */
    formatTimeString (time: number): string {
        time = Math.floor(time + 0.95);
        let hour = Math.floor(time / 3600);
        let minute = Math.floor(time % 3600 / 60);
        let second = Math.floor(time % 60);
        let result = '';
        
        result += hour > 9 ? hour.toString() : '0' + hour.toString();
        result += ':';
        result += minute > 9 ? minute.toString() : '0' + minute.toString();
        result += ':';
        result += second > 9 ? second.toString() : '0' + second.toString();
    
        return result;
    }

    /**
     * 秒格式化成时间字符串  7day 12:21:12 
     * @param s 时间戳（秒）
     */
    arriveTimerFormat (s: number): string {
        if (s < 0) {
            return;
        }
    
        let t;
        let hour = Math.floor(s / 3600);
        let min = Math.floor(s / 60) % 60;
        let sec = s % 60;
    
        let day = Math.floor(hour / 24);
        if (day > 0) {
            hour = hour - 24 * day;
            t = day + "day " + hour + ":";
        } else {
            t = hour + ":";
        }
    
        if (min < 10) {
            t += "0";
        }
        t += min + ":";
        
        if (sec < 10) {
            t += "0";
        }
        t += sec;
        return t;
    }

}
