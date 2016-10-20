import {Observable} from "data/observable";

import {AllMips} from "../../all-mips";

import { ColorPicker } from "nativescript-color-picker";
import { Color } from "color";

import {HeadLightState} from "nativescript-mip-ble/mip-types";

export class LightsViewModel extends Observable {

    private picker = new ColorPicker();
    private selectedColor: Color = new Color("Gray");

    _left: HeadLightState = HeadLightState.On;
    _right: HeadLightState = HeadLightState.On;

    get leftLED() : HeadLightState {
        return this._left;
    }
    set leftLED(val: HeadLightState) {
        this._left = val;
        this.updateEyes();
    }

    get rightLED() : HeadLightState {
        return this._right;
    }
    set rightLED(val: HeadLightState) {
        this._right = val;
        this.updateEyes();
    }

    ledOptions: Array<any> = [
        { id: HeadLightState.Off, toString: () => { return HeadLightState[HeadLightState.Off]; } },
        { id: HeadLightState.On, toString: () => { return HeadLightState[HeadLightState.On]; } },
        { id: HeadLightState.SlowBlink, toString: () => { return HeadLightState[HeadLightState.SlowBlink]; } },
        { id: HeadLightState.FastBlink, toString: () => { return HeadLightState[HeadLightState.FastBlink]; } }
    ];

    constructor() {
        super();
    }

    public changeColor() {
        this.picker.show('#ff0000', 'ARGB')
            .then( (result: number) => {
                var color = new Color(result);
                AllMips.setChestLED(color.r, color.g, color.b);
            });
    }

    updateEyes() {
        AllMips.setHeadLED(this.rightLED, this.rightLED, this.leftLED, this.leftLED);
    }
}