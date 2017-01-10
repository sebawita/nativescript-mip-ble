export class SoundInstruction {
    public soundFileIndex: number;
    public delay: number;

    constructor(soundFileIndex: number, delay: number) {
        this.soundFileIndex = soundFileIndex;
        this.delay = delay;
    }
}

export enum Sound {
    ONEKHZ_500MS_8K16BIT = 1,
    ACTION_BURPING,
    ACTION_DRINKING,
    ACTION_EATING,
    ACTION_FARTING_SHORT,
    ACTION_OUT_OF_BREATH,
    BOXING_PUNCHCONNECT_1,
    BOXING_PUNCHCONNECT_2,
    BOXING_PUNCHCONNECT_3,
    FREESTYLE_TRACKING_1,
    LET_1,
    LET_2,
    LET_3,
    MIP_APP,
    MIP_AWWW,
    MIP_BIG_SHOT,
    MIP_BLEH,
    MIP_BOOM,
    MIP_BYE,
    MIP_CONVERSE_1,
    MIP_CONVERSE_2,
    MIP_DROP,
    MIP_DUNNO,
    MIP_FALL_OVER_1,
    MIP_FALL_OVER_2,
    MIP_FIGHT,
    MIP_GAME,
    MIP_GLOAT,
    MIP_GO,
    MIP_GOGOGO,
    MIP_GRUNT_1,
    MIP_GRUNT_2,
    MIP_GRUNT_3,
    MIP_HAHA_GOT_IT,
    MIP_HI_CONFIDENT,
    MIP_HI_NOT_SURE,
    MIP_HI_SCARED,
    MIP_HUH,
    MIP_HUMMING_1,
    MIP_HUMMING_2,
    MIP_HURT,
    MIP_HUUURGH,
    MIP_IN_LOVE,
    MIP_IT,
    MIP_JOKE,
    MIP_K,
    MIP_LOOP_1,
    MIP_LOOP_2,
    MIP_LOW_BATTERY,
    MIP_MIPPEE,
    MIP_MORE,
    MIP_MUAH_HA,
    MIP_MUSIC,
    MIP_OBSTACLE,
    MIP_OHOH,
    MIP_OH_YEAH,
    MIP_OOPSIE,
    MIP_OUCH_1,
    MIP_OUCH_2,
    MIP_PLAY,
    MIP_PUSH,
    MIP_RUN,
    MIP_SHAKE,
    MIP_SIGH,
    MIP_SINGING,
    MIP_SNEEZE,
    MIP_SNORE,
    MIP_STACK,
    MIP_SWIPE_1,
    MIP_SWIPE_2,
    MIP_TRICKS,
    MIP_TRIIICK,
    MIP_TRUMPET,
    MIP_WAAAAA,
    MIP_WAKEY,
    MIP_WHEEE,
    MIP_WHISTLING,
    MIP_WHOAH,
    MIP_WOO,
    MIP_YEAH,
    MIP_YEEESSS,
    MIP_YO,
    MIP_YUMMY,
    MOOD_ACTIVATED,
    MOOD_ANGRY,
    MOOD_ANXIOUS,
    MOOD_BORING,
    MOOD_CRANKY,
    MOOD_ENERGETIC,
    MOOD_EXCITED,
    MOOD_GIDDY,
    MOOD_GRUMPY,
    MOOD_HAPPY,
    MOOD_IDEA,
    MOOD_IMPATIENT,
    MOOD_NICE,
    MOOD_SAD,
    MOOD_SHORT,
    MOOD_SLEEPY,
    MOOD_TIRED,
    SOUND_BOOST,
    SOUND_CAGE,
    SOUND_GUNS,
    SOUND_ZINGS,
    SHORT_MUTE_FOR_STOP,
    FREESTYLE_TRACKING_2,
    VOLUME_OFF,
    VOLUME_1,
    VOLUME_2,
    VOLUME_3,
    VOLUME_4,
    VOLUME_5,
    VOLUME_6,
    VOLUME_7
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