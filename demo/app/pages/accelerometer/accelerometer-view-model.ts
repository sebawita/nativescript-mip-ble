import { Observable } from "data/observable";
import { startAccelerometerUpdates, stopAccelerometerUpdates } from "nativescript-accelerometer"

import { AllMips } from "../../all-mips";

export class AccelerometerViewModel extends Observable {
    private turnSpeed: number = 0;
    private speed: number = 0;
    private gear = 1.5;

    private accelerometerActive: boolean = false;

    private loop: number = null;

    public startAccelerometer() {
        if (this.accelerometerActive)
            return;

        this.accelerometerActive = true;

        startAccelerometerUpdates(data => {
            this.turnSpeed = data.x * this.gear; // left (0 to -1) / right (0 to 1)
            this.speed = data.y * this.gear; // lean forward (0 to -1) / back (0 to 1)
        })

        this.startContinousMove();
    }

    public stopAccelerometer() {
        if (this.accelerometerActive) {
            stopAccelerometerUpdates();
            this.accelerometerActive = false;

            this.stopContinousMove();
        }
    }

    public startContinousMove() {
        if (this.loop)
            return;

        this.loop = setInterval(() => {
            AllMips.drive(this.speed, this.turnSpeed);
        }, 50);
    }

    public stopContinousMove() {
        clearInterval(this.loop);
        this.loop = null;
    }
}

export var Accelerometer = new AccelerometerViewModel();