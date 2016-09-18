import {Observable} from "data/observable";
import {AllMips} from "../../all-mips";

export class SoundViewModel extends Observable {
    private _volume = 0;
    public get volume(): number {
        return this._volume;
    }
    public set volume(val: number) {
        this._volume = val;

        AllMips.setVolume(val);
    }

    public soundIndex: number;
    public soundDelay: number;
    public soundRepeat: number;

    playSound() {
        AllMips.playOneSound(this.soundIndex, this.soundDelay, this.soundRepeat);
    }
}