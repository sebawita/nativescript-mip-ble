import {Observable} from "data/observable";
import {AllMips} from "../../all-mips";
import {Sound} from "nativescript-mip-ble/mip-types";

export class SoundViewModel extends Observable {
    public title = "Sound";

    private _volume = 3;
    public get volume(): number {
        return this._volume;
    }
    public set volume(val: number) {
        val = Math.round(val);
        this._volume = val;

        AllMips.setVolume(val);
    }

    private _soundIndex: number = 1;
    public get soundIndex(): number {
        return this._soundIndex;
    }
    public set soundIndex(val: number) {
        this._soundIndex = Math.round(val);
    }

    public get soundName(): string {
        return Sound[this.get("soundIndex")];
    }

    // public soundDelay: number = 10;
    // public soundRepeat: number = 0;

    playSound() {
        // AllMips.playOneSound(this.soundIndex, this.soundDelay, this.soundRepeat);
        AllMips.playOneSound(this.soundIndex);
    }

    mute() {
        this.set("volume", 0);
    }

    setMaxVolume() {
        this.set("volume", 7);
    }

    playSoundBye() {
        AllMips.playOneSound(Sound.MIP_BYE);
    }
    playSoundConversation() {
        AllMips.playOneSound(Sound.MIP_CONVERSE_1);
    }
    playSoundHello() {
        AllMips.playOneSound(Sound.MIP_HI_CONFIDENT);
    }

    playSoundSing() {
        AllMips.playOneSound(Sound.MIP_SINGING);
    }
    playSoundSong1() {
        AllMips.playOneSound(Sound.MIP_LOOP_1);
    }
    playSoundSong2() {
        AllMips.playOneSound(Sound.MIP_LOOP_2);
    }

    playSoundDrink() {
        AllMips.playOneSound(Sound.ACTION_DRINKING);
    }
    playSoundEat() {
        AllMips.playOneSound(Sound.ACTION_EATING);
    }
    playSoundBurp() {
        AllMips.playOneSound(Sound.ACTION_BURPING);
    }

    playSoundSad() {
        AllMips.playOneSound(Sound.MOOD_SAD);
    }
    playSoundHappy() {
        AllMips.playOneSound(Sound.MOOD_HAPPY);
    }
    playSoundExcited() {
        AllMips.playOneSound(Sound.MOOD_EXCITED);
    }

    playSoundPunch1() {
        AllMips.playOneSound(Sound.BOXING_PUNCHCONNECT_1);
    }
    playSoundPunch2() {
        AllMips.playOneSound(Sound.BOXING_PUNCHCONNECT_2);
    }
    playSoundPunch3() {
        AllMips.playOneSound(Sound.BOXING_PUNCHCONNECT_3);
    }
}

export var soundViewModel = new SoundViewModel();
