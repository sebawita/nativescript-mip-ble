export declare class SoundInstruction {
    soundFileIndex: number;
    delay: number;
    constructor(soundFileIndex: number, delay: number);
}
export declare enum Position {
    OnBack = 0,
    FaceDown = 1,
}
export declare enum Direction {
    Forward = 0,
    Backward = 1,
}
export declare enum TurnDirection {
    Left = 0,
    Right = 1,
}
export declare enum GameMode {
    App = 1,
    Cage = 2,
    Tracking = 3,
    Dance = 4,
    Default = 5,
    Stack = 6,
    TrickProgramming = 7,
    RoamMode = 8,
}
export declare class SoftwareVersion {
    year: number;
    month: number;
    day: number;
    version: number;
    constructor(year: number, month: number, day: number, version: number);
}
export declare enum PositionStatus {
    OnBack = 0,
    FaceDown = 1,
    Upright = 2,
    PickedUp = 3,
    Handstand = 4,
    FaceDownOnTray = 5,
    OnBackWithKickstand = 6,
}
export declare class Status {
    private _batteryLevel;
    /**
     * The battery level in Volt, with the precision of one digit after comma
     */
    batteryLevel: number;
    position: PositionStatus;
    constructor(batteryLevel: number, position: PositionStatus);
    toString(): string;
}
export declare class WeightStatus {
    degree: number;
    constructor(code: number);
}
export declare class ChestLedInfo {
    red: number;
    green: number;
    blue: number;
    constructor(red: number, green: number, blue: number);
}
export declare enum HeadLightState {
    Off = 0,
    On = 1,
    SlowBlink = 2,
    FastBlink = 3,
}
export declare class HeadLedInfo {
    light1: HeadLightState;
    light2: HeadLightState;
    light3: HeadLightState;
    light4: HeadLightState;
    constructor(light1: number, light2: number, light3: number, light4: number);
}
