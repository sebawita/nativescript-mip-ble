export class SoundInstruction {
    public soundFileIndex: number;
    public delay: number;

    constructor(soundFileIndex: number, delay: number) {
        this.soundFileIndex = soundFileIndex;
        this.delay = delay;
    }
}

export enum Position {
    OnBack = 0,
    FaceDown = 1
}

export enum Direction {
    Forward = 0,
    Backward = 1
}

export enum TurnDirection {
    Left = 0,
    Right = 1
}

export enum GameMode {
    App = 1,
    Cage = 2,	
    Tracking = 3,
    Dance= 4,	
    Default = 5,
    Stack = 6,
    TrickProgramming = 7,	
    RoamMode = 8
}



export class SoftwareVersion {
    year: number;
    month: number;
    day: number;
    version: number;

    constructor(year: number, month: number, day: number, version: number) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.version = version;
    }
}

export enum PositionStatus {
    OnBack = 0,
    FaceDown = 1,
    Upright = 2,
    PickedUp = 3,
    Handstand = 4,
    FaceDownOnTray = 5,
    OnBackWithKickstand = 6
}

export class Status {
    //Battery Level :0x4D(4.0V)-0x7C(6.4V)
    private _batteryLevel: number;

    /**
     * The battery level in Volt, with the precision of one digit after comma
     */
    public get batteryLevel(): number {
        // value is recorded in steps of 0.052 Volt
        return Math.round(this._batteryLevel * 0.52) / 10;
    }

    position: PositionStatus;


    constructor(batteryLevel: number, position: PositionStatus) {
        this._batteryLevel = batteryLevel;
        this.position = position;
    }

    toString() {
        return "Position:" + PositionStatus[this.position] + "\nBattery level:" + this.batteryLevel + "V";
    }
}

export class WeightStatus {
    degree: number;

    constructor(code: number) {
        // BYTE 1 : 0xD3(-45 degree) - 0x2D(+45 degree)	

        // 0x00(min)~0x2D(max) is holding the weight on the back
        if(code < 0x2e) {
            this.degree = code;
        }
        // 0xD3 (211) (max)~0xFF(min) (255) is holding the weight on the front	
        else if(code > 0xd2){
            this.degree = code - 0xff;
        }
        else {
            this.degree = 0;
        }
    }
}

export class ChestLedInfo {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

export enum HeadLightState {
    Off = 0,
    On = 1,
    SlowBlink = 2,
    FastBlink = 3
}



export class HeadLedInfo {
    light1: HeadLightState;
    light2: HeadLightState;
    light3: HeadLightState;
    light4: HeadLightState;

    constructor(light1: number, light2: number, light3: number, light4: number) {
        this.light1 = light1;
        this.light2 = light2;
        this.light3 = light3;
        this.light4 = light4;
    }
}