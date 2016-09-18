import {Observable} from "data/observable";

import {AllMips} from "../../all-mips";

export class JoyStickViewModel extends Observable {
    private turnSpeed: number = 0;
    private speed: number = 0;

    private loop: number = null;

    public startJoystick() {
        if(this.loop)
            return;
            
        this.startContinousMove();
    }

    public stopJoystick() {
        this.set("turnSpeed", 0);
        this.set("speed", 0);
        this.stopContinousMove();
    }

    public startContinousMove() {
        if(this.loop)
            return;

        this.loop = setInterval( () => {
            AllMips.drive(this.speed, this.turnSpeed);
        }, 50);
    }

    public stopContinousMove() {
        clearInterval(this.loop);
        this.loop = null;
    }

}