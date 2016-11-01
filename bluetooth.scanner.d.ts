export declare class BluetoothScanner {
    constructor();
    scan(deviceFound: (MipDevice) => any): Promise<any>;
    initialisePermissionsIfRequired(): void;
    hasPermissions(): Promise<boolean>;
    requestPermissions(): void;
}
