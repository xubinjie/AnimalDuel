import { FLCryptoJS } from "./Utils/FLCryptoJS";
import { FLProtoBuf } from "./Utils/FLProtoBuf";
import { FLAudio } from "./Utils/FLAudio";

/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 风领框架主文件
 * zengbinsi
 * 2017-12-01
 */


cc.info('=========加载FL框架 V' + fl.version + '=========');



/*=========监听游戏事件========='*/

// 游戏显示，使用这个事件我们可以监听游戏在Native平台上从后台被唤醒的事件，从而对游戏进行一些必要的处理。
cc.game.on(cc.game.EVENT_SHOW, (event: cc.Event.EventCustom)=>{
    cc.systemEvent.emit(cc.game.EVENT_SHOW, event.getUserData());
});

// 当游戏被挂起到后台时，Creator会分发游戏隐藏事件
cc.game.on(cc.game.EVENT_HIDE, (event: cc.Event.EventCustom)=>{
    cc.systemEvent.emit(cc.game.EVENT_HIDE, event.getUserData());
});

// 游戏初始化完成
cc.game.on(cc.game.EVENT_GAME_INITED, (event: cc.Event.EventCustom)=>{
    cc.systemEvent.emit(cc.game.EVENT_GAME_INITED, event.getUserData());

    FLAudio.initAudioEngine();
});

// 如果需要在渲染初始化完成时实现逻辑，可以通过EVENT_RENDERER_INITED事件来实现。
cc.game.on(cc.game.EVENT_RENDERER_INITED, (event: cc.Event.EventCustom)=>{
    cc.systemEvent.emit(cc.game.EVENT_RENDERER_INITED, event.getUserData());
});


