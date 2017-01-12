//import observable = require("data/observable");
import { ObservableArray } from "data/observable-array";
import frameModule = require("ui/frame");
import { BluetoothScanner } from "nativescript-mip-ble/bluetooth.scanner";
import { MipDevice } from "nativescript-mip-ble/mip-device";
//import {MipDevice} from "../../services/mip-device";

import { RadListView, ListViewEventData } from "nativescript-telerik-ui/listview";
import { AllMips } from "../../all-mips";

export class ScanViewModel {// extends observable.Observable {
    public title = "Scanner";

    public scanner: BluetoothScanner;
    public devicesAround: ObservableArray<MipDevice>;

    constructor() {
        //super();

        this.scanner = new BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();

        this.devicesAround = new ObservableArray<MipDevice>();
        this.devicesAround.push(new MipDevice("B4:99:4C:48:14:24", "Test", "who knows?"));
    }


    public getPermissions() {
        this.scanner.initialisePermissionsIfRequired();
    }

    public connect(args) {
        var mipDevice: MipDevice = this.devicesAround.getItem(args.itemIndex);
        mipDevice.connect(this.onDisconnected)
            .then((UUID) => {
                AllMips.addMipDevice(mipDevice);
                alert("Device Connected");
            })
    }

    public scan(eventData: ListViewEventData) {
        var listView: RadListView = eventData.object;

        this.devicesAround.splice(0);

        this.scanner.scan(this.onRobotFound)
            .then(
            () => {
                listView.notifyPullToRefreshFinished();
            },
            (err) => {
                listView.notifyPullToRefreshFinished();
                alert("error while scanning: " + err);
            });
    }

    private onRobotFound(mip: MipDevice) {
        scanViewModel.devicesAround.push(mip);
    }

    private onDisconnected(mip: MipDevice) {
        AllMips.removeMip(mip);
    }
}

export var scanViewModel = new ScanViewModel();