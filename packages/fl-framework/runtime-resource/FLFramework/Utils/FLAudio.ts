/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 音频控制模块
 * zengbinsi
 * 2017-12-02
 */



const { ccclass } = cc._decorator;
import {FLStore} from "./FLStore";

@ccclass
export class FLAudio {
    /**
     * 当前正在播放的背景音乐剪辑
     */
    private static bgmClip: string = null;
    /**
     * 背景音乐音频id
     */
    private static bgmAudioId: number = null;
    /**
     * 是否启用背景音乐
     */
    public static isEnaledMusic: boolean = true;
    /**
     * 是否启用音效
     */
    public static isEnaledSound: boolean = true;
    /**
     * 音效ID
     */
    private static soundIds: Array<number> = [];

    /**
     * 初始化AudioEngine
     */
    static initAudioEngine (): void {
        FLAudio.enableMusic(FLStore.getBool('enabledMusic', true));
        FLAudio.enableSound(FLStore.getBool('enabledEffect', true));
    }

    /**
     * 播放背景音乐
     * @param audioClip 音频剪辑
     */
    static playMusc (audioClip: any): number {
        if (audioClip === null || audioClip === undefined) {
            return;
        }
    
        if (audioClip === FLAudio.bgmClip) {
            return FLAudio.bgmAudioId;
        }
        if (FLAudio.bgmAudioId !== null && FLAudio.bgmAudioId !== undefined) {
            cc.audioEngine.stop(FLAudio.bgmAudioId);
        }
    
        FLAudio.bgmClip = audioClip;
        FLAudio.bgmAudioId = cc.audioEngine.play(audioClip, true, 1);
        
        if (FLAudio.isEnaledMusic) {
            cc.audioEngine.resume(FLAudio.bgmAudioId);
        } else {
            cc.audioEngine.pause(FLAudio.bgmAudioId);
        }
    
        return FLAudio.bgmAudioId;
    };
    
    /**
     * 播放音效
     * @param audioClip 音频剪辑
     * @param isLoop 是否循环播放
     */
    static playSound (audioClip: any, isLoop: boolean): number {
        if (audioClip === null || audioClip === undefined) {
            return;
        }
        
        if (!FLAudio.isEnaledSound) {
            return;
        }
        let id = cc.audioEngine.play(audioClip, isLoop || false, 1);
        FLAudio.soundIds.push(id);
        return id;
    };
    
    /**
     * 启用/禁用背景音乐
     * @param isEnabled 是否开启背景音乐
     */
    static enableMusic (isEnabled: boolean): void {
        FLAudio.isEnaledMusic = isEnabled;

        try {
            if (!FLAudio.bgmAudioId) {
                return;
            }

            if (FLAudio.isEnaledMusic) {
                cc.audioEngine.resume(FLAudio.bgmAudioId);
            } else {
                cc.audioEngine.pause(FLAudio.bgmAudioId);
            }
        } catch (e) {
            // throw e;
        }
    }
    
    /**
     * 启用/禁用音效
     * @param isEnabled 是否启用音效
     */
    static enableSound (isEnabled: boolean): void {
        FLAudio.isEnaledSound = isEnabled;
    
        for (let i = 0; i < FLAudio.soundIds.length; ++i) {
            cc.audioEngine.stop(FLAudio.soundIds[i]);
        }
        FLAudio.soundIds = [];
    }
    
}

