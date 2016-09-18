import { GameMode, SoftwareVersion, Status, WeightStatus, ChestLedInfo, HeadLedInfo } from "./mip-types";
export declare class MipStatusReader {
    private listeners;
    UUID: string;
    constructor(UUID: string);
    /**
     * Takes the instruction code and required parameters and issues a bluetooth command.
     * This version doesn't wait for the response, therefore is eqiuiped to handle more commands per second
     * @param instructionCode Instruction code from the list of codes. See codes.ts
     * @param params a collection of parameters required for the given function
     */
    private executeInstructionFast(instructionCode, params?);
    notify(): Promise<any>;
    private requestData(instructionCode);
    getGameMode(): Promise<GameMode>;
    getMipStatus(): Promise<Status>;
    requestWeightUpdate(): Promise<WeightStatus>;
    requestChestLEDInfo(): Promise<ChestLedInfo>;
    /**
     * Gets the current status of the head LEDs
     */
    requestHeadLEDInfo(): Promise<HeadLedInfo>;
    /**
     * Gets the total distance travelled (in cm) in the current power cycle
     */
    getOdometer(): Promise<number>;
    getMipSoftware(): Promise<SoftwareVersion>;
}
