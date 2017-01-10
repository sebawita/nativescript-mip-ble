export declare class SoundInstruction {
    soundFileIndex: number;
    delay: number;
    constructor(soundFileIndex: number, delay: number);
}
export declare enum Sound {
    ONEKHZ_500MS_8K16BIT = 1,
    ACTION_BURPING = 2,
    ACTION_DRINKING = 3,
    ACTION_EATING = 4,
    ACTION_FARTING_SHORT = 5,
    ACTION_OUT_OF_BREATH = 6,
    BOXING_PUNCHCONNECT_1 = 7,
    BOXING_PUNCHCONNECT_2 = 8,
    BOXING_PUNCHCONNECT_3 = 9,
    FREESTYLE_TRACKING_1 = 10,
    LET_1 = 11,
    LET_2 = 12,
    LET_3 = 13,
    MIP_APP = 14,
    MIP_AWWW = 15,
    MIP_BIG_SHOT = 16,
    MIP_BLEH = 17,
    MIP_BOOM = 18,
    MIP_BYE = 19,
    MIP_CONVERSE_1 = 20,
    MIP_CONVERSE_2 = 21,
    MIP_DROP = 22,
    MIP_DUNNO = 23,
    MIP_FALL_OVER_1 = 24,
    MIP_FALL_OVER_2 = 25,
    MIP_FIGHT = 26,
    MIP_GAME = 27,
    MIP_GLOAT = 28,
    MIP_GO = 29,
    MIP_GOGOGO = 30,
    MIP_GRUNT_1 = 31,
    MIP_GRUNT_2 = 32,
    MIP_GRUNT_3 = 33,
    MIP_HAHA_GOT_IT = 34,
    MIP_HI_CONFIDENT = 35,
    MIP_HI_NOT_SURE = 36,
    MIP_HI_SCARED = 37,
    MIP_HUH = 38,
    MIP_HUMMING_1 = 39,
    MIP_HUMMING_2 = 40,
    MIP_HURT = 41,
    MIP_HUUURGH = 42,
    MIP_IN_LOVE = 43,
    MIP_IT = 44,
    MIP_JOKE = 45,
    MIP_K = 46,
    MIP_LOOP_1 = 47,
    MIP_LOOP_2 = 48,
    MIP_LOW_BATTERY = 49,
    MIP_MIPPEE = 50,
    MIP_MORE = 51,
    MIP_MUAH_HA = 52,
    MIP_MUSIC = 53,
    MIP_OBSTACLE = 54,
    MIP_OHOH = 55,
    MIP_OH_YEAH = 56,
    MIP_OOPSIE = 57,
    MIP_OUCH_1 = 58,
    MIP_OUCH_2 = 59,
    MIP_PLAY = 60,
    MIP_PUSH = 61,
    MIP_RUN = 62,
    MIP_SHAKE = 63,
    MIP_SIGH = 64,
    MIP_SINGING = 65,
    MIP_SNEEZE = 66,
    MIP_SNORE = 67,
    MIP_STACK = 68,
    MIP_SWIPE_1 = 69,
    MIP_SWIPE_2 = 70,
    MIP_TRICKS = 71,
    MIP_TRIIICK = 72,
    MIP_TRUMPET = 73,
    MIP_WAAAAA = 74,
    MIP_WAKEY = 75,
    MIP_WHEEE = 76,
    MIP_WHISTLING = 77,
    MIP_WHOAH = 78,
    MIP_WOO = 79,
    MIP_YEAH = 80,
    MIP_YEEESSS = 81,
    MIP_YO = 82,
    MIP_YUMMY = 83,
    MOOD_ACTIVATED = 84,
    MOOD_ANGRY = 85,
    MOOD_ANXIOUS = 86,
    MOOD_BORING = 87,
    MOOD_CRANKY = 88,
    MOOD_ENERGETIC = 89,
    MOOD_EXCITED = 90,
    MOOD_GIDDY = 91,
    MOOD_GRUMPY = 92,
    MOOD_HAPPY = 93,
    MOOD_IDEA = 94,
    MOOD_IMPATIENT = 95,
    MOOD_NICE = 96,
    MOOD_SAD = 97,
    MOOD_SHORT = 98,
    MOOD_SLEEPY = 99,
    MOOD_TIRED = 100,
    SOUND_BOOST = 101,
    SOUND_CAGE = 102,
    SOUND_GUNS = 103,
    SOUND_ZINGS = 104,
    SHORT_MUTE_FOR_STOP = 105,
    FREESTYLE_TRACKING_2 = 106,
    VOLUME_OFF = 107,
    VOLUME_1 = 108,
    VOLUME_2 = 109,
    VOLUME_3 = 110,
    VOLUME_4 = 111,
    VOLUME_5 = 112,
    VOLUME_6 = 113,
    VOLUME_7 = 114,
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
