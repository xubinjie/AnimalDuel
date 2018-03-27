/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 数学工具类
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLMath {

    /**
     * 获得从arr数组中取出n个项的所有组合
     * @param {array} arr 原始数据集合
     * @param {number} n 要取出的个数
     */
    static arrayCombine(arr, n): any {
        let m = arr.length;
        if(n > m) {
            return [];
        }

        n = n || m;
        if (n === m) {
            let result = [];
            result.push(arr);
            return result;
        }

        // 采用01转换法，将所有被选中的对象标记为1，未选中的标记为0

        let resultIndexs = [],
            flagArr = [],
            isEnd = false,
            i, j, leftCnt;
        
        // 首先初始化，将数组前n个元素置1，表示第一个组合为前n个数。
        for (i = 0; i < m; ++i) {
            flagArr[i] = i < n ? 1 : 0;
        }
        resultIndexs.push(flagArr.concat());
        
        // 然后从左到右扫描数组元素值的“10”组合，找到第一个“10”组合后将其变为“01”组合；
        // 同时将其左边的所有“1”全部移动到数组的最左端。
        while (!isEnd) {
            leftCnt = 0;

            for (i = 0; i < m - 1; i++) {
                if (flagArr[i] == 1 && flagArr[i+1] == 0) {
                    for(j = 0; j < i; j++) {
                        flagArr[j] = j < leftCnt ? 1 : 0;
                    }
                    flagArr[i] = 0;
                    flagArr[i+1] = 1;
                    let aTmp = flagArr.concat();
                    resultIndexs.push(aTmp);

                    // 当第一个“1”移动到数组的m-n的位置，即n个“1”全部移动到最右端时，就得到了最后一个组合
                    if(aTmp.slice(-n).join("").indexOf('0') == -1) {
                        isEnd = true;
                    }
                    break;
                }
                flagArr[i] == 1 && leftCnt++;
            }
        }
        // return resultIndexs;


        // 将对应选中的下标转换成原始数组的数据进行填充到结果
        let result = [];
        
        for (let i = 0; i < resultIndexs.length; i++) {
            result[i] = [];
            let ri = resultIndexs[i];

            for (let j = 0; j < ri.length; j++) {
                if (ri[j] === 1) {
                    result[i].push(arr[j]);
                }
            }
        }

        return result;
    }


    /**
     * 格式化数字长度
     * @param num 整数
     * @param len 格式化后的长度
     */
    static formatLen (num, len): string {
        let result = num.toString();

        if (result.length >= len) {
            return result;
        }

        while (result.length < len) {
            result = '0' + result;
        }
        
        return result;
    }
}
