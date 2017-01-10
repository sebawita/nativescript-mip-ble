export declare class BluetoothScanner {
    constructor();
    scan(deviceFound: (MipDevice) => any): Promise<any>;
    checkIfWowWeeMiP(periperhal: any): boolean;
    initialisePermissionsIfRequired(): void;
    hasPermissions(): Promise<boolean>;
    requestPermissions(): void;
}
