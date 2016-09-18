import {Observable} from "data/observable";
import frameModule = require("ui/frame");
import {MipDevice} from "nativescript-mip-ble/mip-device";

import {startAccelerometerUpdates, stopAccelerometerUpdates} from "nativescript-accelerometer"
import {TouchGestureEventData} from "ui/gestures";

import {MipController} from "nativescript-mip-ble/mip-controller";
import {Position, Direction, TurnDirection, GameMode, HeadLightState} from "nativescript-mip-ble/mip-types";
import {MipStatusReader} from "nativescript-mip-ble/mip-status-reader";

export class ControllerViewModel extends Observable {

    private _speed: number;
    get speed() {
        return this._speed;
    }
    set speed(val: number) {
        this._speed = Math.round(val);
    }

    private _turnSpeed: number;
    get turnSpeed() {
        return this._turnSpeed;
    }
    set turnSpeed(val: number) {
        this._turnSpeed = Math.round(val);
    }
    // public speed: number = 0x20;
    // public turnSpeed: number = 0x10;

    public x:number = 0;
    public y:number = 0;
    public z:number = 0;

    public gear: number = 2;
    public accSpeed: number = 0;
    public accTurnSpeed: number = 0;

    private loop: number = null;
    private accelerometerActive: boolean = false;

    public mip: MipDevice;
    public mipController: MipController;
    public mipStatusReader: MipStatusReader;

    get name(): string {
        return this.mip.name;
    }

    private _volume = 0;
    public get volume(): number {
        return this._volume;
    }

    public set volume(val: number) {
        this._volume = val;

        this.mip.mipController.setVolume(val);
    }

    public soundIndex: number;
    public soundDelay: number;
    public soundRepeat: number;

    playSound() {
        this.mipController.playOneSound(this.soundIndex, this.soundDelay, this.soundRepeat);
    }

    test1() {
        this.mipStatusReader.notify().then( () => {
            console.log("subscribed for notifications");
        }, (err) => {
            console.log("failed to subscribe for notifications");
        } )
    }

    test2() {
        this.mipStatusReader.getOdometer()
        .then( (res) => {
            alert("getOdometer:" + JSON.stringify(res));
        } );
    }

    test3() {
        this.mipStatusReader.getMipStatus()
        .then( (res) => {
            alert("getMipStatus res:" + JSON.stringify(res));
        } );
    }

    test4() {
        this.mipController.setHeadLED(HeadLightState.On, HeadLightState.Off, HeadLightState.FastBlink, HeadLightState.SlowBlink);
    }
    
    constructor(mip: MipDevice) {
        super();

        this._speed = 0x20;
        this._turnSpeed = 0x10;

        this.mip = mip;
        this.mipController = new MipController(mip.UUID);
        this.mipStatusReader = new MipStatusReader(mip.UUID);
    }

    public moveForward() {
        this.mip.moveForward(this.speed);
    }

    public moveBack() {
        this.mip.moveBack(this.speed);
    }

    public turnLeft() {
        this.mip.turnLeft(this.speed, this.turnSpeed);
    }

    public turnRight() {
        this.mip.turnRight(this.speed, this.turnSpeed);
    }


    public startAccelerometer() {
        if(this.accelerometerActive)
            return;

        this.accelerometerActive = true;

        startAccelerometerUpdates( data => {
            this.x = data.x*2; // left (0 to -1) / right (0 to 1)
            this.y = data.y*2; // lean forward (0 to -1) / back (0 to 1)
        } )

        this.startContinousMove();
    }

    public stopAccelerometer() {
        if(this.accelerometerActive) {
            stopAccelerometerUpdates();
            this.accelerometerActive = false;

            this.stopContinousMove();
        }
    }

    public startJoystick() {
        this.stopAccelerometer();

        this.startContinousMove();
    }

    public stopJoystick() {
        this.set("x", 0);
        this.set("y", 0);
        this.stopContinousMove();
    }

    public startContinousMove() {
        if(this.loop)
            return;

        this.loop = setInterval( () => {
            console.log(this.x + ":" + this.y);
            this.mip.moveAcc(this.y, this.x);
        }, 100);
    }

    public stopContinousMove() {
        clearInterval(this.loop);
        this.loop = null;
    }

    public slow(args: TouchGestureEventData) {
        if(args.action === 'down')
            this.set("gear", 0.5);

        if(args.action === "up" || args.action === "cancel")
            this.set("gear", 2);
    }
}