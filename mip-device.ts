declare var require: any;
var bluetooth = require("nativescript-bluetooth");

import { HeadLightState } from "./mip-types";
import { MipController } from "./mip-controller";
import { MipStatusReader } from "./mip-status-reader";

export class MipDevice {
    public UUID: string;
    public name: string;
    public state: string;

    public mipController: MipController;
    public mipStatusReader: MipStatusReader;


    constructor(UUID, name, state) {
        this.UUID = UUID;
        this.name = name;
        this.state = state;
    }

    /**
     * Connects to the given MipDevice
     * @param disconnectFn callback function for when mip gets disconnected
     */
    public connect(disconnectFn: (MipDevice) => any): Promise<any> {
        return new Promise((resolve, reject) => {
            bluetooth.connect({
                UUID: this.UUID,
                onConnected: ((peripheral) => {
                    //this.connectedDevice = device;
                    console.log("Periperhal connected with UUID: " + peripheral.UUID);

                    this.mipController = new MipController(this.UUID);
                    this.mipStatusReader = new MipStatusReader(this.UUID);

                    resolve(this.UUID);
                }),
                onDisconnected: function (peripheral) {
                    if (disconnectFn)
                        disconnectFn(this);

                    alert("Device disconnected");
                }
            });
        })
    }

    /**
     * Disconnects from the MipDevice
     */
    public disconnect(): Promise<any> {
        return bluetooth.disconnect(this);
    }

    /**
     * Issues a command to the robot to move for 50ms in given direction
     * @param speed [-1]-[0] Back speed / [0]-[1] Forward
     * @param turnspeed [-1]-[0] Left : [0]-[1] Right
     * @param goCrazy [true] - make the robot move in the crazy fast mode, [false] - normal speed 
     */
    public drive(speed: number, turnSpeed: number, goCrazy: boolean): void {
        speed = this.convertSpeed(speed, goCrazy);
        turnSpeed = this.convertTurnSpeed(turnSpeed, goCrazy);

        if (goCrazy) {
            speed = (speed > 0) ? speed + 0x80 : speed;
            turnSpeed = (turnSpeed > 0) ? turnSpeed + 0x80 : turnSpeed;
        }

        this.mipController.continousDrive(speed, turnSpeed);
    }

    private convertSpeed(speed, crazySpeed) {
        if (speed === 0)
            return 0;

        if (crazySpeed) {
            if (speed > 1)
                return 0xA0;
            else if (speed < -1)
                return 0xC0;

            if (speed > 0) {
                // Crazy Forward : 0x81(slow)~0xA0(fast)
                speed = speed * 0x20 + 0x80;
                return ensureBoundaries(speed, 0x81, 0xA0)
            }

            // Crazy Backwards : 0xA1(slow)~0xC0(fast)
            speed = -speed * 0x20 + 0xA0;
            return ensureBoundaries(speed, 0xA1, 0xC0);
        }
        else {
            if (speed > 1)
                return 0x20;
            else if (speed < -1)
                return 0x40;

            if (speed > 0) {
                // Forward : 0x0 (no move) 0x01(slow)~0x20(fast)
                speed = speed * 0x20;
                return ensureBoundaries(speed, 0, 0x20);
            }

            // Backwards : 0x21(slow)~0x40(fast)
            speed = -speed * 0x20 + 0x20;
            return ensureBoundaries(speed, 0x21, 0x40);
        }
    }

    private convertTurnSpeed(turnSpeed, crazySpeed) {
        if (turnSpeed === 0)
            return 0x40;

        if (crazySpeed) {
            if (turnSpeed > 1)
                return 0xE0;
            else if (turnSpeed < -1)
                return 0xFF;

            if (turnSpeed > 0) {
                // Crazy Right spin:0xC1(slow)~0xE0(fast)
                turnSpeed = turnSpeed * 0x20 + 0xC0;
                return ensureBoundaries(turnSpeed, 0xC1, 0xE0);
            }

            // Crazy Left spin:0xE1(slow)~0xFF(fast)
            turnSpeed = -turnSpeed * 0x20 + 0xE0;
            return ensureBoundaries(turnSpeed, 0xE1, 0xFF);
        }
        else {
            if (turnSpeed > 1)
                return 0x60;
            else if (turnSpeed < -1)
                return 0x80;

            if (turnSpeed > 0) {
                // Right spin: 0x40 (no turn) 0x41(slow)~0x60(fast)
                turnSpeed = turnSpeed * 0x20 + 0x40;

                return ensureBoundaries(turnSpeed, 0x40, 0x60);
            }

            // Left spin:0x61(slow)~0x80(fast)
            turnSpeed = -turnSpeed * 0x20 + 0x60;
            return ensureBoundaries(turnSpeed, 0x61, 0x80);
        }
    }

    //Speed fwd 0x01 (slow) - 0x20 (fast) / bwd 0x21 (slow) - 0x40 (fast)
    //Turn Right 0x41 (slow) - 0x60 (fast) / Left 0x61 (slow) - 0x80 (fast)
    move(speed, turn) {
        var repeat = 5;

        var loop = setInterval(() => {
            this.mipController.continousDrive(speed, turn);

            if (repeat-- < 0)
                clearInterval(loop);
        }, 50);
    }

    moveForward(speed) {
        this.move(speed, 0);
    }

    moveBack(speed) {
        this.move(speed + 0x20, 0);
    }

    turnLeft(forwardSpeed, turnSpeed) {
        this.move(forwardSpeed, turnSpeed + 0x60);
    }

    turnRight(forwardSpeed, turnSpeed) {
        this.move(forwardSpeed, turnSpeed + 0x40);
    }

    getOdometer() {
        this.mipStatusReader.getOdometer()
            .then((res) => {
                alert("getOdometer:" + JSON.stringify(res));
            });
    }

    getStatus() {
        this.mipStatusReader.getMipStatus()
            .then((res) => {
                alert("getMipStatus res:" + JSON.stringify(res));
            });
    }

    setHeadLED(light1: HeadLightState, light2: HeadLightState, light3: HeadLightState, light4: HeadLightState) {
        this.mipController.setHeadLED(light1, light2, light3, light4);
    }
}


function convertToHexString(code: number): string {
    return "0x" + code.toString(16);
}

function ensureBoundaries(val: number, min: number, max: number) {
    if (val < min)
        return min;

    if (val > max)
        return max;

    //return Math.round(val);
    return val;
}