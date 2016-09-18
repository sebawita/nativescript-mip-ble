import observable = require("data/observable");
import frameModule = require("ui/frame");
import {BluetoothScanner} from "nativescript-mip-ble/bluetooth.scanner";
import {MipDevice} from "nativescript-mip-ble/mip-device";
//import {MipDevice} from "../../services/mip-device";

import {RadListView, ListViewEventData} from "nativescript-telerik-ui/listview";

export class ScanViewModel extends observable.Observable {

    public scanner: BluetoothScanner;

    constructor() {
        super();

        this.scanner = new BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();
    }


    public getPermissions() {
        this.scanner.initialisePermissionsIfRequired();
    }

    public connect(args) {
        var mipDevice: MipDevice = this.scanner.devicesAround.getItem(args.itemIndex);
        mipDevice.connect().then((UUID) => {
            //alert("Connected to " + UUID);

            var navigationEntry = {
                moduleName: "pages/controller/controller-page",
                context: {mipDevice: mipDevice},
                animated: false,
                backstackVisible: false
            };

            frameModule.topmost().navigate(navigationEntry);
        })
    }

    public scan(eventData: ListViewEventData) {
        var listView: RadListView = eventData.object;
        
        this.scanner.scan()
        .then(
            () => {
                listView.notifyPullToRefreshFinished();
            },
            (err) => {
                listView.notifyPullToRefreshFinished();
                alert("error while scanning: " + err);
            });
    }
}