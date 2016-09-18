import { SoundInstruction, Position, Direction, TurnDirection, GameMode, HeadLightState } from "./mip-types";
export declare class MipController {
    UUID: string;
    constructor(UUID: string);
    /**
     * Takes the instruction code and required parameters and issues a bluetooth command.
     * This version waits for the response, therefore it might not be eqiuiped to handle too many commands per second
     * @param instructionCode Instruction code from the list of codes. See codes.ts
     * @param params a collection of parameters required for the given function
     */
    private executeInstruction(instructionCode, params?);
    /**
     * Takes the instruction code and required parameters and issues a bluetooth command.
     * This version doesn't wait for the response, therefore is eqiuiped to handle more commands per second
     * @param instructionCode Instruction code from the list of codes. See codes.ts
     * @param params a collection of parameters required for the given function
     */
    private executeInstructionFast(instructionCode, params?);
    /**
     * Tells Mip to play a sound from the built in list
     * @param soundFileIndex Sound file index (1~106) or send 0xF7-0xFE for volume
     * @param delay Delay in intervals of 30ms (0~255)
     * @param repeat Repeat (0-255) defines how many times the sound should be repeated
     */
    playOneSound(soundFileIndex: number, delay: number, repeat?: number): void;
    /**
     * Tells Mip to play a sequence of sounds from the built in list
     * @param soundInstructions Sound instructions - not more than 8 chained sounds
     * @param repeat (0-255) defines how many times the sequence should be repeated
     */
    playSoundSequence(soundInstructions: Array<SoundInstruction>, repeat?: number): void;
    /**
     * Sets Mips volume
     * @param volume accepts values (0-7)
     */
    setVolume(volume: number): void;
    /**
     * Instructs Mip to fall down
     * @param fallDirection tells Mip whether it should fall forward or backwards
     */
    dropDead(fallDirection: Position): void;
    /**
     * Issues a single command to drive a certain distance whilst turning at a given angle.
     * Mip can only process one distanceDrive command at once, it cannot be chained.
     * @param direction Direction.Forward or Direction.Backward
     * @param distance distance in cm (0-255)
     * @param turnDirection TurnDirection.Left or TurnDirection.Right
     * @param angle accepts values (0-360)
     */
    distanceDrive(direction: Direction, distance: number, turnDirection: TurnDirection, angle: number): void;
    driveForwardWithTime(speed: number, time: number): void;
    /**
     * Tells Mip to drive backward for a specified time
     * @param speed (0-30)
     * @param time in 7ms intervals (0~255) -> Time = Value * 7ms
     */
    driveBackwardWithTime(speed: number, time: number): void;
    /**
     * Tells Mip to turn left
     * @param angle Angle in intervals of 5 degrees (0~255) -> Angle = Value * 5
     * @param speed (0-24)
     */
    turnLeftByAngle(angle: number, speed: number): void;
    /**
     * Tells Mip to turn right
     * @param angle Angle in intervals of 5 degrees (0~255) -> Angle = Value * 5
     * @param speed (0-24)
     */
    turnRightByAngle(angle: number, speed: number): void;
    /**
     * Tells Mip to move a little bit. In order to use properly this function should be called at an interval of 50ms
     * @param speed FWD 0x01 (slow) - 0x20 (fast) / BWD 0x21 (slow) - 0x40 (fast)
     * @param turn Right 0x41 (slow) - 0x60 (fast) / Left 0x61 (slow) - 0x80 (fast)
     */
    continousDrive(speed: any, turn: any): void;
    /**
     * Set Mip into one of his eight modes
     * @param gameMode see GameMode enum for the list of values
     */
    setGameMode(gameMode: GameMode): void;
    /**
     *
     */
    stop(): void;
    /**
     * Requests Mip to try to get up.
     * Mip has to be positioned at an angle
     */
    getUp(): void;
    /**
     * Sets the color of the LED light in the chest
     * @param red (0-255)
     * @param green (0-255)
     * @param blue (0-255)
     */
    setChestLED(red: number, green: number, blue: number): void;
    /**
     * Flashes the chest LED light with at a specified interval
     * @param red (0-255)
     * @param green (0-255)
     * @param blue (0-255)
     * @param timeOn in 20ms intervals -> Value * 20ms
     * @param timeOff in 20ms intervals -> Value * 20ms
     */
    flashChestLED(red: number, green: number, blue: number, timeOn: number, timeOff: number): void;
    /**
     * Sets the 4 head LED lights. Each can be set to either On, Off, SlowBling and FastBlink
     */
    setHeadLED(light1: HeadLightState, light2: HeadLightState, light3: HeadLightState, light4: HeadLightState): void;
    /**
     * Resets the info on total distance travelled in the current power cycle
     */
    resetOdometer(): void;
    /**
     *
     */
    setGestureOrRadarMode(): void;
    /**
     *
     */
    setMipDetectionMode(): void;
    /**
     *
     */
    setUserData(): void;
    /**
     *
     */
    clapTimes(): void;
    /**
     *
     */
    enableClapMode(): void;
    /**
     *
     */
    setDelayBetweenTwoClaps(): void;
}
