import { HeadLightState } from "./mip-types";
import { MipController } from "./mip-controller";
import { MipStatusReader } from "./mip-status-reader";
export declare class MipDevice {
    UUID: string;
    name: string;
    state: string;
    mipController: MipController;
    mipStatusReader: MipStatusReader;
    constructor(UUID: any, name: any, state: any);
    /**
     * Connects to the given MipDevice
     * @param disconnectFn callback function for when mip gets disconnected
     */
    connect(disconnectFn: (MipDevice) => any): Promise<any>;
    /**
     * Disconnects from the MipDevice
     */
    disconnect(): Promise<any>;
    /**
     * Issues a command to the robot to move for 50ms in given direction
     * @param speed [-1]-[0] Back speed / [0]-[1] Forward
     * @param turnspeed [-1]-[0] Left : [0]-[1] Right
     * @param goCrazy [true] - make the robot move in the crazy fast mode, [false] - normal speed
     */
    drive(speed: number, turnSpeed: number, goCrazy: boolean): void;
    private convertSpeed(speed, crazySpeed);
    private convertTurnSpeed(turnSpeed, crazySpeed);
    move(speed: any, turn: any): void;
    moveForward(speed: any): void;
    moveBack(speed: any): void;
    turnLeft(forwardSpeed: any, turnSpeed: any): void;
    turnRight(forwardSpeed: any, turnSpeed: any): void;
    getOdometer(): void;
    getStatus(): void;
    setHeadLED(light1: HeadLightState, light2: HeadLightState, light3: HeadLightState, light4: HeadLightState): void;
}
