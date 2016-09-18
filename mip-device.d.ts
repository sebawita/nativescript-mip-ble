import { Observable } from "data/observable";
import { MipController } from "./mip-controller";
export declare class MipDevice extends Observable {
    UUID: string;
    name: string;
    state: string;
    mipController: MipController;
    constructor(UUID: any, name: any, state: any);
    connect(): Promise<any>;
    disconnect(): Promise<any>;
    private executeInstruction(instructionCode, params);
    moveAcc(speed: any, turnSpeed: any): void;
    private convertSpeed(speed);
    private convertTurnSpeed(turnSpeed);
    move(speed: any, turn: any): void;
    moveForward(speed: any): void;
    moveBack(speed: any): void;
    turnLeft(forwardSpeed: any, turnSpeed: any): void;
    turnRight(forwardSpeed: any, turnSpeed: any): void;
}
