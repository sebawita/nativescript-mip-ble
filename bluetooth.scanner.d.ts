export declare class BluetoothScanner {
    constructor();
    scan(deviceFound: (MipDevice) => any): Promise<any>;
    checkIfMiP(periperhal: any): boolean;
    initialisePermissionsIfRequired(): void;
    hasPermissions(): Promise<boolean>;
    requestPermissions(): void;
}
