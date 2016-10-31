import { ObservableArray } from "data/observable-array";
import { BluetoothScanner } from "nativescript-mip-ble/bluetooth.scanner";
import { MipDevice } from "nativescript-mip-ble/mip-device";
import { AllMips } from "../all-mips";

import { Component } from '@angular/core';

@Component({
    selector: 'mip-scan',
    templateUrl: 'scan/scan.component.html'
})
export class ScanComponent {
    public scanner: BluetoothScanner;
    public devicesAround: ObservableArray<MipDevice>;

    constructor() {
        this.scanner = new BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();

        this.devicesAround = new ObservableArray<MipDevice>();
    }

    public getPermissions() {
        this.scanner.initialisePermissionsIfRequired();
    }

    public connect(args) {
        console.log("args: " + args.index);
        var mipDevice: MipDevice = this.devicesAround.getItem(args.index);
        // mipDevice.connect(this.onDisconnected)
        mipDevice.connect(() => { })
            .then((UUID) => {
                AllMips.addMipDevice(mipDevice);
                alert("Device Connected");
            })
    }

    public scan() {
        // var listView: RadListView = eventData.object;

        this.devicesAround.splice(0);

        this.scanner.scan((mip: MipDevice) => this.devicesAround.push(mip))
            .then(
            () => {
                // listView.notifyPullToRefreshFinished();
            },
            (err) => {
                // listView.notifyPullToRefreshFinished();
                alert("error while scanning: " + err);
            });
    }

    private onDisconnected(mip: MipDevice) {
        AllMips.removeMip(mip);
    }
}