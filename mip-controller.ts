declare var require: any;
var bluetooth = require("nativescript-bluetooth");

import {codes} from "./codes";

import {SoundInstruction, Position, Direction, TurnDirection, GameMode, SoftwareVersion, Status, WeightStatus, ChestLedInfo, HeadLightState} from "./mip-types";

export class MipController  {

    public UUID: string = "B4:99:4C:48:14:24";

    constructor(UUID: string) {
        this.UUID = UUID;
    }
    /**
     * Takes the instruction code and required parameters and issues a bluetooth command.
     * This version waits for the response, therefore it might not be eqiuiped to handle too many commands per second
     * @param instructionCode Instruction code from the list of codes. See codes.ts
     * @param params a collection of parameters required for the given function
     */
    private executeInstruction(instructionCode: string, params: Array<number>): Promise<any> {
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
        return bluetooth.write(bluetoothMessage);
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

    /**
     * Tells Mip to play a sound from the built in list
     * @param soundFileIndex Sound file index (1~106) or send 0xF7-0xFE for volume
     * @param delay Delay in intervals of 30ms (0~255)
     * @param repeat Repeat (0-255) defines how many times the sound should be repeated
     */
    playOneSound(soundFileIndex: number, delay: number, repeat: number) {
        var soundInstruction = new SoundInstruction(soundFileIndex, delay);
        this.playSoundSequence([soundInstruction], repeat);
    }

    /**
     * Tells Mip to play a sequence of sounds from the built in list
     * @param soundInstructions Sound instructions - not more than 8 chained sounds
     * @param repeat (0-255) defines how many times the sequence should be repeated
     */
    playSoundSequence(soundInstructions: Array<SoundInstruction>, repeat: number) {
        //The instructions should be constructed so that soundFileIndex and Delay are provided in pairs, and the last param is repeat.
        //The shouldn't be more than 8 sounds provided.
        //i.e. [index1, delay1, index2, delay2... index8, delay8, repeat]
        var instructions = [];

        // there shouldn't be more than 8 sounds chained. Remove the excess.
        soundInstructions = soundInstructions.slice(0,8);

        // go through each sound instruction and append them to the instructions collection
        soundInstructions.forEach(si => {
            instructions.push(
                ensureBoundaries(si.soundFileIndex, 1, 106), 
                ensureBoundaries(si.delay, 0, 255)
            );
        });

        // the first 16 bits of the instructions are assigned for sounds, so if not enough provided then just pad them with zeros
        for(let i=instructions.length; i<16; i++)
            instructions.push(0);

        // finally add the repeat param at the 17th byte
        instructions.push(ensureBoundaries(repeat, 0, 255));

        this.executeInstructionFast(codes.PlaySound, instructions);
    }

    /**
     * Sets Mips volume
     * @param volume accepts values (0-7)
     */ 
    setVolume(volume: number) {
        volume = ensureBoundaries(volume, 0, 7);
            
        this.executeInstructionFast(codes.SetVolume, [volume]);
    }

    /**
     * Instructs Mip to fall down
     * @param fallDirection tells Mip whether it should fall forward or backwards
     */
    dropDead(fallDirection: Position) {
        this.executeInstructionFast(codes.SetPosition, [fallDirection]);
    }
    /**
     * Issues a single command to drive a certain distance whilst turning at a given angle.
     * Mip can only process one distanceDrive command at once, it cannot be chained.
     * @param direction Direction.Forward or Direction.Backward
     * @param distance distance in cm (0-255)
     * @param turnDirection TurnDirection.Left or TurnDirection.Right
     * @param angle accepts values (0-360)
     */
    distanceDrive(direction: Direction, distance: number, turnDirection: TurnDirection, angle: number) {
        distance = ensureBoundaries(distance, 0, 0xff);
        angle = ensureBoundaries(angle, 0, 360);

        // Split angle into 2 bytes, as 0xff can only contain numbers from 0-255.
        // -> Byte 1: (0-1) 1 -> for angles more than 255
        // -> Byte 2: (0-255)
        var angleByte1 = (angle > 255) ? 1 : 0;
        var angleByte2 = angle % 256;

        this.executeInstructionFast(codes.DistanceDrive, [direction, distance, turnDirection, angleByte1, angleByte2]);
    }

    /**
     * Tells Mip to drive forward for a specified time
     * @param speed (0-30)
     * @param time in 7ms intervals (0~255) -> Time = Value * 7ms
     */
    driveForwardWithTime(speed: number, time: number) {
        speed = ensureBoundaries(speed, 0, 30);
        time = ensureBoundaries(time, 0, 255);

        this.executeInstructionFast(codes.DriveForwardTime, [speed, time]);
    }

    /**
     * Tells Mip to drive backward for a specified time
     * @param speed (0-30)
     * @param time in 7ms intervals (0~255) -> Time = Value * 7ms
     */
    driveBackwardWithTime(speed: number, time: number) {
        speed = ensureBoundaries(speed, 0, 30);
        time = ensureBoundaries(time, 0, 255);

        this.executeInstructionFast(codes.DriveBackwardTime, [speed, time]);
    }

    /**
     * Tells Mip to turn left
     * @param angle Angle in intervals of 5 degrees (0~255) -> Angle = Value * 5
     * @param speed (0-24)
     */
    turnLeftByAngle(angle: number, speed: number) {
        angle = ensureBoundaries(angle, 0, 255);
        speed = ensureBoundaries(speed, 0, 24);
    
        this.executeInstructionFast(codes.TurnLeftAngle, [angle, speed]);
    }

    /**
     * Tells Mip to turn right
     * @param angle Angle in intervals of 5 degrees (0~255) -> Angle = Value * 5
     * @param speed (0-24)
     */
    turnRightByAngle(angle: number, speed: number) {
        angle = ensureBoundaries(angle, 0, 255);
        speed = ensureBoundaries(speed, 0, 24);
    
        this.executeInstructionFast(codes.TurnRightAngle, [angle, speed]);
    }

    /**
     * Tells Mip to move a little bit. In order to use properly this function should be called at an interval of 50ms
     * @param speed FWD 0x01 (slow) - 0x20 (fast) / BWD 0x21 (slow) - 0x40 (fast)
     * @param turn Right 0x41 (slow) - 0x60 (fast) / Left 0x61 (slow) - 0x80 (fast)
     */
    continousDrive(speed, turn) {
        if(speed < 0x81)
            speed = ensureBoundaries(speed, 0, 0x40);
        else
            speed = ensureBoundaries(speed, 0x81, 0xC0);
        
        if(turn < 0xC1)
            turn = ensureBoundaries(turn, 0x40, 0x80);
        else
            turn = ensureBoundaries(turn, 0xC1, 0xFF);

        this.executeInstructionFast(codes.ContinousDrive, [speed, turn]);
    }

    /**
     * Set Mip into one of his eight modes
     * @param gameMode see GameMode enum for the list of values
     */
    setGameMode(gameMode: GameMode) {
        gameMode = ensureBoundaries(gameMode, 1, 8);

        this.executeInstructionFast(codes.SetGameMode, [gameMode]);
    }
    
    /**
     * 
     */
    stop() {
        this.executeInstructionFast(codes.Stop, []);
    }

    /**
     * Requests Mip to try to get up.
     * Mip has to be positioned at an angle
     */
    getUp() {
        this.executeInstructionFast(codes.GetUp, [2]);
    }

    /**
     * Sets the color of the LED light in the chest
     * @param red (0-255)
     * @param green (0-255)
     * @param blue (0-255)
     */
    setChestLED(red: number, green: number, blue: number) {
        this.executeInstructionFast(codes.SetChestLED, [red, green, blue]);
    }

    /**
     * Flashes the chest LED light with at a specified interval
     * @param red (0-255)
     * @param green (0-255)
     * @param blue (0-255)
     * @param timeOn in 20ms intervals -> Value * 20ms
     * @param timeOff in 20ms intervals -> Value * 20ms
     */
    flashChestLED(red: number, green: number, blue: number, timeOn: number, timeOff: number) {
        red = ensureBoundaries(red, 0, 255);
        green = ensureBoundaries(green, 0, 255);
        blue = ensureBoundaries(blue, 0, 255);
        timeOn = ensureBoundaries(timeOn, 0, 255);
        timeOff = ensureBoundaries(timeOff, 0, 255);

        this.executeInstructionFast(codes.FlashChestLED, [red, green, blue, timeOn, timeOff]);
    }

    /**
     * Sets the 4 head LED lights. Each can be set to either On, Off, SlowBling and FastBlink
     */
    setHeadLED(light1: HeadLightState, light2: HeadLightState, light3: HeadLightState, light4: HeadLightState) {
        light1 = ensureBoundaries(light1, 0, 3);
        light2 = ensureBoundaries(light2, 0, 3);
        light3 = ensureBoundaries(light3, 0, 3);
        light4 = ensureBoundaries(light4, 0, 3);

        this.executeInstructionFast(codes.SetHeadLED, [light1, light2, light3, light4]);
    }

    /**
     * Resets the info on total distance travelled in the current power cycle
     */
    resetOdometer() {
        this.executeInstructionFast(codes.ResetOdometer, []);
    }

    /**
     * 
     */
    setGestureOrRadarMode() {

    }

    /**
     * 
     */
    setMipDetectionMode() {

    }

    /**
     * 
     */
    setUserData() {

    }

    /**
     * 
     */
    clapTimes() {

    }

    /**
     * 
     */
    enableClapMode() {

    }

    /**
     * 
     */
    setDelayBetweenTwoClaps() {

    }
}

function ensureBoundaries(val: number, min: number, max: number) {
    if(val < min)
        return min;

    if(val > max)
        return max;

    return Math.round(val);
}

function convertToHexString(code: number): string {
    return "0x" + code.toString(16);
}