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
    connect(disconnectFn: (MipDevice) => any): Promise<any>;
    disconnect(): Promise<any>;
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
