declare var require: any;
var bluetooth = require("nativescript-bluetooth");
import {codes} from "./codes";

import {GameMode, SoftwareVersion, Status, WeightStatus, ChestLedInfo, HeadLedInfo} from "./mip-types";

export class MipStatusReader  {

    private listeners: any;

    public UUID: string = "B4:99:4C:48:14:24";

    constructor(UUID: string) {
        this.UUID = UUID;

        this.listeners = {};
    }

    /**
     * Takes the instruction code and required parameters and issues a bluetooth command.
     * This version doesn't wait for the response, therefore is eqiuiped to handle more commands per second
     * @param instructionCode Instruction code from the list of codes. See codes.ts
     * @param params a collection of parameters required for the given function
     */
    private executeInstructionFast(instructionCode: string, params: Array<number>) {
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

    public notify(): Promise<any> {
        return bluetooth.startNotifying({
            peripheralUUID: this.UUID,
            serviceUUID: 'ffe0',
            characteristicUUID: 'ffe4',
            onNotify: (codedMessage) => {
                var data = new Uint8Array(codedMessage.value);

                //The result is made of ASCII codes
                //If we convert all the ASCII codes and turn them into a string, then we will get a string with the values in HEX
                
                // First we need to extract the instruction code that issued this update notification
                // The code is made of the first two characters
                var instructionCalled = convertAsciiToHexNumber(data[0], data[1]);

                // Now convert the rest of the data, again each data value is made of a pair of ASCII characters
                var res = [];
                for(var i=2; i<data.length; i+=2) {
                    var val = convertAsciiToHexNumber(data[i], data[i+1]);

                    res.push(val);
                }

                // Finally trigger promise waiting for the data published in this notification
                // However ignore it there are no listeners waiting for the result
                if(this.listeners[instructionCalled]) {
                    this.listeners[instructionCalled ](res);
                    this.listeners[instructionCalled ] = null;
                }
            }
        })
    }

    private requestData(instructionCode: string): Promise<Array<number>> {
        return new Promise<any>((resolve) => {
            this.listeners[parseInt(instructionCode)] = resolve;

            this.executeInstructionFast(instructionCode, []);
        });
    }


    getGameMode(): Promise<GameMode>  {
        return new Promise<GameMode>((resolve) => {
            this.requestData(codes.GetGameMode)
                .then(res => {
                    resolve(res[0]);
                })
        })
    }


    getMipStatus(): Promise<Status> {
        return new Promise<Status>((resolve) => {
            this.requestData(codes.RequestStatus)
                .then(res => {
                    var status = new Status(res[0], res[1]);
                    resolve(status);
                })
        })
    }

    requestWeightUpdate(): Promise<WeightStatus> {
        return new Promise<WeightStatus>((resolve) => {
            this.requestData(codes.RequestWeightUpdate)
                .then(res => {
                    var status = new WeightStatus(res[0]);
                    resolve(status);
                })
        })
    }

    requestChestLEDInfo(): Promise<ChestLedInfo> {
        return new Promise<ChestLedInfo>((resolve) => {
            this.requestData(codes.RequestChestLED)
                .then(res => {
                    var chestLedInfo = new ChestLedInfo(res[0], res[1], res[2]);
                    resolve(chestLedInfo);
                })
        })
    }


    /**
     * Gets the current status of the head LEDs
     */
    requestHeadLEDInfo() : Promise<HeadLedInfo>{
        return new Promise<HeadLedInfo>((resolve) => {
            this.requestData(codes.RequestChestLED)
                .then(res => {
                    var chestLedInfo = new HeadLedInfo(res[0], res[1], res[2], res[3]);
                    resolve(chestLedInfo);
                })
        })
    }

    /**
     * Gets the total distance travelled (in cm) in the current power cycle
     */
    getOdometer() : Promise<number>{
        return new Promise<number>((resolve) => {
            this.requestData(codes.ReadOdometer)
                .then(res => {
                    //BYTE 1 & 2 & 3 & 4 : Distance ((0~4294967296)/48.5) cm
                    

                    //First merge all 4 bytes
                    // BYTE 1 & 2 & 3 & 4 :Byte1 is highest byte
                    var allBytes = res[0] * Math.pow(0x100, 3)
                               + res[1] * Math.pow(0x100, 2)
                               + res[2] * 0x100
                               + res[3];

                    // Then convert the value to cm
                    // 1cm=48.5, 0xFFFFFFFF=4294967295=88556026.7cm
                    var distance = Math.round(allBytes / 48.5);

                    resolve(distance);
                })
        })
    }




    getMipSoftware(): Promise<SoftwareVersion> {
        return new Promise<SoftwareVersion>((resolve) => {
            this.requestData(codes.GetSoftwareVersion)
                .then(res => {
                    console.log("SoftwareVersion: " + JSON.stringify(res));
                    var softwareVersion = new SoftwareVersion(res[0], res[1], res[2], res[3]);
                    resolve(softwareVersion);
                })
        })
    }

}

/**
 * Converts each ASCII code to a corresponding character and then parses that to a Hex based number
 */
function convertAsciiToHexNumber(char1: number, char2: number) {
    return parseInt(String.fromCharCode(char1) + String.fromCharCode(char2), 16)
}

function convertToHexString(code: number): string {
    return "0x" + code.toString(16);
}