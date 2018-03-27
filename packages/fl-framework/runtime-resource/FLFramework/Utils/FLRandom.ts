/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 随机数工具类
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLRandom {

    /**
     * 随机一个整数，取值区间[min, max]
     * @param min 最小值
     * @param max 最大值
     */
    static randomNumBoth (min: number, max: number): number {
        let range = max - min;
        let rand = Math.random();
        let num = min + Math.round(rand * range); //四舍五入
        return num;
    }

    /**
     * 随机一个整数，取值区间[min, max)
     * @param min 最小值
     * @param max 最大值
     */
    static randomNumberContainMin (min: number, max: number): number {
        let range = max - min;
        let rand = Math.random();
        let num = min + Math.floor(rand * range); //舍去
        return num;
    }

    /**
     * 随机一个整数，取值区间(min, max]
     * @param min 最小值
     * @param max 最大值
     */
    static randomNumberContainMax (min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        if (Math.round(Rand * Range) == 0) {       
          return min + 1;
        }
        var num = min + Math.round(Rand * Range);
        return num;
    }

    /**
     * 随机一个整数，取值区间(min, max)
     * @param min 最小值
     * @param max 最大值
     */
    static randomNumberInside (min: number, max: number): number {
        let range = max - min;
        let rand = Math.random();

        if (Math.round(rand * range) == 0) {
          return min + 1;
        } else if (Math.round(rand * max) == max) {
          return max - 1;
        } else {
          return min + Math.round(rand * range) - 1;
        }
   }
}
