/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * FPS状态调试面板
 * zengbinsi
 * 2017-12-02
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLStatsSwitch extends cc.Component {

    @property({
        tooltip: '是否显示调试的FPS面板'
    })
    isDisplayStats: boolean = false;

    onLoad() {
        // init logic
        // let node = cc.instantiate(prefabAsset);
        cc.director.setDisplayStats(this.isDisplayStats);
    }
}
