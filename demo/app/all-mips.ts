import {Observable} from 'data/observable';

import {MipDevice} from "nativescript-mip-ble/mip-device";
import {MipController} from "nativescript-mip-ble/mip-controller";
import {HeadLightState} from "nativescript-mip-ble/mip-types";

export class AllMipsModel extends Observable {
    private mips: Array<MipDevice> = [];

    constructor() {
    super();
    }

    addMipDevice(mip: MipDevice) {
        this.mips.push(mip);
    }

    removeMip(mip: MipDevice) {
        var index = this.mips.indexOf(mip);

        if (index > -1)
        this.mips.splice(index, 1);
    }

    public drive(speed: number, turnSpeed: number) {
        this.mips.forEach( (mip) => {
            mip.drive(speed, turnSpeed, false);
        })
    }

    public moveForward(speed: number) {
        this.mips.forEach( (mip) => {
            mip.moveForward(speed);
        })
    }

    public moveBack(speed: number) {
        this.mips.forEach( (mip) => {
            mip.moveBack(speed);
        })
    }

    public turnLeft(speed: number, turnSpeed: number) {
        this.mips.forEach( (mip) => {
            mip.turnLeft(speed, turnSpeed);
        })
    }

    public turnRight(speed: number, turnSpeed: number) {
        this.mips.forEach( (mip) => {
            mip.turnRight(speed, turnSpeed);
        })
    }

    public setVolume(val: number) {
        this.mips.forEach( (mip) => {
            mip.mipController.setVolume(val);
        })
    }

    public playOneSound(soundIndex: number, soundDelay: number, soundRepeat: number) {
        this.mips.forEach( (mip) => {
            mip.mipController.playOneSound(soundIndex, soundDelay, soundRepeat);
        })
    }

    // call like this AllMips.setHeadLED(HeadLightState.On, HeadLightState.Off, HeadLightState.FastBlink, HeadLightState.SlowBlink);
    public setHeadLED(light1: HeadLightState, light2: HeadLightState, light3: HeadLightState, light4: HeadLightState) {
        this.mips.forEach( (mip) => {
            mip.mipController.setHeadLED(light1, light2, light3, light4);
        })
    }
    public setChestLED(red: number, green: number, blue: number) {
        this.mips.forEach( (mip) => {
            mip.mipController.setChestLED(red, green, blue);
        })
    }
}

export var AllMips = new AllMipsModel();