import {Observable} from "data/observable";
import {ObservableArray} from "data/observable-array";
var bluetooth = require("nativescript-bluetooth");

import {MipDevice} from "./mip-device";

export class BluetoothScanner extends Observable {
    public devicesAround: ObservableArray<MipDevice>;

    constructor() {
        super();

        this.initialisePermissionsIfRequired();

        this.devicesAround = new ObservableArray<MipDevice>();
        this.devicesAround.push(new MipDevice("B4:99:4C:48:14:24", "Test", "who knows?"));
    }

    scan(): Promise<any> {
        this.devicesAround.splice(0);

        return bluetooth.startScanning({
                serviceUUIDs: [],
                seconds: 3,
            onDiscovered: peripheral => {
                if(peripheral.UUID === null)
                    peripheral.UUID = "no UUID";

                if(peripheral.name === null)
                    peripheral.name = "no name";

                if(peripheral.state === null)
                    peripheral.state = "no state";

                console.log("");
                console.log("Periperhal found with UUID: " + peripheral.UUID);
                console.log("Periperhal found with name: " + peripheral.name);
                console.log("Periperhal found with state: " + peripheral.state);

                this.devicesAround.push( new MipDevice(peripheral.UUID, peripheral.name, peripheral.state));
            }
        });
    }


    initialisePermissionsIfRequired() {
        this.hasPermissions()
            .then( granted => {
                if(granted == false) {
                    console.log("Requesting permissions");
                    this.requestPermissions();
                }
            })
    }

    hasPermissions(): Promise<boolean> {
        return bluetooth.hasCoarseLocationPermission();
    }

    requestPermissions() {
        bluetooth.requestCoarseLocationPermission().then(
            function() {
                console.log("Location permission requested");
            }
        );
    }
}