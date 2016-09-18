import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { MipDevice } from "./mip-device";
export declare class BluetoothScanner extends Observable {
    devicesAround: ObservableArray<MipDevice>;
    constructor();
    scan(): Promise<any>;
    initialisePermissionsIfRequired(): void;
    hasPermissions(): Promise<boolean>;
    requestPermissions(): void;
}
