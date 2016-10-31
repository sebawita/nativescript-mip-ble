var bluetooth = require("nativescript-bluetooth");

import { MipDevice } from "./mip-device";

export class BluetoothScanner {

    constructor() {
        this.initialisePermissionsIfRequired();
    }

    scan(deviceFound: (MipDevice) => any): Promise<any> {
        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 3,
            onDiscovered: peripheral => {
                if (peripheral.name === null) {
                    console.log("Skipping a periperhal without a name with UUID:" + peripheral.UUID);
                    return;
                }
                // Should I check the advertisement to verify if this is a MipDevice
                //peripheral.advertisement ???===??? "AgEGBQLw/7D/E/8ABQUAAAAAAAAAAAAAAAAAAAANCVdvd1dlZS1NaXB1cwUSCAAQAAIKAAIKAAAAAAAAAAA="

                console.log("");
                console.log("----New Device Found----");
                console.log("Periperhal found with UUID: " + peripheral.UUID);
                console.log("Periperhal found with name: " + peripheral.name);

                var newDevice = new MipDevice(peripheral.UUID, peripheral.name, peripheral.state);

                deviceFound(newDevice);
            }
        });
    }


    initialisePermissionsIfRequired() {
        this.hasPermissions()
            .then(granted => {
                if (granted == false) {
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
            function () {
                console.log("Location permission requested");
            }
        );
    }
}