import {Observable} from "data/observable";
import {AllMips} from "../../all-mips";

export class ArrowsViewModel extends Observable {
    private _speed: number = 24;
    get speed() {
        return this._speed;
    }
    set speed(val: number) {
        this._speed = Math.round(val);
    }

    private _turnSpeed: number = 16;
    get turnSpeed() {
        return this._turnSpeed;
    }
    set turnSpeed(val: number) {
        this._turnSpeed = Math.round(val);
    }

    public moveForward() {
        AllMips.moveForward(this.speed);
    }

    public moveBack() {
        AllMips.moveBack(this.speed);
    }

    public turnLeft() {
        AllMips.turnLeft(this.speed, this.turnSpeed);
    }

    public turnRight() {
        AllMips.turnRight(this.speed, this.turnSpeed);
    }
}