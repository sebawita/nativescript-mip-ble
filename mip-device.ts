import {Observable} from "data/observable";
var bluetooth = require("nativescript-bluetooth");

import {codes} from "./codes";
import {MipController} from "./mip-controller";

export class MipDevice extends Observable {
    public UUID: string;
    public name: string;
    public state: string; 

    public mipController: MipController;

    constructor(UUID, name, state) {
        super();
        this.UUID = UUID;
        this.name = name;
        this.state = state;
    }

    public connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            bluetooth.connect({
                UUID: this.UUID,
                onConnected: ((peripheral) => {
                    //this.connectedDevice = device;
                    console.log("Periperhal connected with UUID: " + peripheral.UUID);

                    this.mipController = new MipController(this.UUID);
                    resolve(this.UUID);
                }),
                onDisconnected: function (peripheral) {
                    alert("Device disconnected");
                }
            });
        } )
    }

    public disconnect(): Promise<any> {
        return bluetooth.disconnect(this.UUID);
    }

    
    private executeInstruction(instructionCode: string, params: Array<number>) {
        //Parse instruction parameters -> convert each value into a hex string and then concatenate them to a comma separated string
        var instructionParams = params.map(param => {
            return convertToHexString(param);
        }).join(",");

        //Prepare a bluetooth message using the connected device UUID, instruction code and instruction parameters
        var bluetoothMessage: any = {
            peripheralUUID: this.UUID,
            serviceUUID: 'ffe5',
            characteristicUUID: 'ffe9',
            value: instructionCode + "," + instructionParams
        }

        //Send the call via bluetooth
        bluetooth.writeWithoutResponse(bluetoothMessage);
    }

    //speed     [-1]-[0] Back speed / [0]-[1] Forward
    //turnspeed [-1]-[0] Left : [0]-[1] Right
    public moveAcc(speed, turnSpeed) {
        speed = this.convertSpeed(speed);
        turnSpeed = this.convertTurnSpeed(turnSpeed);

        this.executeInstruction(codes.ContinousDrive, [speed, turnSpeed]);
    }

    private convertSpeed(speed) {
        if(speed > 1)
            return 0x20;
        else if(speed < -1)
            return 0x40;

        // going backwards
        if(speed < 0)
            return Math.round(-speed * 0x20 + 0x20);

        return Math.round(speed * 0x20);
    }
    

    private convertTurnSpeed(turnSpeed) {
        if(turnSpeed > 1)
            return 0x60;
        else if(turnSpeed < -1)
            return 0x80;

        if(turnSpeed < 0)
            return Math.round(-turnSpeed * 0x20 + 0x60);
            
        return Math.round(turnSpeed * 0x20 + 0x40);
        
    }

    //Speed fwd 0x01 (slow) - 0x20 (fast) / bwd 0x21 (slow) - 0x40 (fast)
    //Turn Right 0x41 (slow) - 0x60 (fast) / Left 0x61 (slow) - 0x80 (fast)
    move(speed, turn) {
        var repeat = 5;

        var loop = setInterval( () => {
            this.executeInstruction(codes.ContinousDrive, [speed, turn]);

            if(repeat-- < 0)
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

}


function convertToHexString(code: number): string {
    return "0x" + code.toString(16);
}