# NativeScript-mip-ble

This plugin is designed to communicate with WowWee MiP robots.
It provides the functionality to scan, connect and issue various commands.


## Install the plugin
Call the following command from the root of your project.
```
tns plugin add nativescript-mip-ble
```

## Getting started
Here is a brief overview of how to use this plugin.
For more advanced examples see:
[Simple ng2 demo](https://github.com/sebawita/mip-demo)
[JS Core example](https://github.com/sebawita/nativescript-mip-ble/tree/master/demo)
[ng2 example](https://github.com/sebawita/nativescript-mip-ble/tree/master/demo-ng)

### Connecting to your MiP
Before you take control of your MiP, you need to find it first.
We will use `BluetoothScanner` for this, which will provide us with all available `MipDevice` objects.

#### Imports
Add the following imports to your TypeScript code:

```
import { BluetoothScanner } from "nativescript-mip-ble/bluetooth.scanner";
import { MipDevice } from "nativescript-mip-ble/mip-device";
```

#### Scanning
The scan function requires a callback, which is triggered for every ble device found and it returns a callback when the scan is finished.

You can call it as follows:

```
var devices: Array<MipDevice> = [];
var scanner = new BluetoothScanner();

scanner.scan( (mip) => devices.push(mip))
    .then(() => {
        console.log("Finished Scanning");
    })
```

This will fill in the `devices` array with all ble devices in the area.

Each `MipDevice` object contains: `name`, `UUID` and `status`, which you could use to display on the screen. 

> Make sure to enable `Bluetooth` on your device before trying to scan for devices.

#### Connecting to a device
All you need to do is to grab the `MipDevice` object you want to connect to and call `connect()`.
This function takes a callback function for when the device gets disconnected and it returns a promise when the connection is established.

You could call it as follows:

```
var selectedIndex = 0;
var selectedDevice: MipDevice = devices[selectedIndex];

selectedDevice.connect( (mip) => {
    console.log("disconnected from: " + mip.name);
})
.then(() => {
    console.log("connected to: " + selectedDevice.name);
})
```

### Sending instructions
Now that you are connected to your MiP, you should be able to call various instructions to make him move, change the color of the chest LED or make him talk.
To do that just use `mipController` from the `MipDevice`.

Here are a few examples:

```
import { Direction, TurnDirection } from "nativescript-mip-ble/mip-types";

// --- MOVE ----
var distance = 10;
//move Fwd 
selectedDevice.mipController.distanceDrive(Direction.Forward, distance, TurnDirection.Left, 0);

// move Bwd
selectedDevice.mipController.distanceDrive(Direction.Backward, distance, TurnDirection.Left, 0);

// --- TURN ----
var turnAngle = 45;
//turn left
selectedDevice.mipController.turnLeftByAngle(angle / 5, 0);

//turn Right
selectedDevice.mipController.turnRightByAngle(angle / 5, 0);

// --- SOUND ---
//mute
selectedDevice.mipController.setVolume(0);

//set max volume
selectedDevice.mipController.setVolume(7);

//make noise
var soundIndex = 10; // value from 1 - 106
selectedDevice.mipController.playOneSound(soundIndex, 0, 0);

// --- LED ---
//set Led to red
selectedDevice.mipController.setChestLED(255, 0, 0);
}
//set Led to green
selectedDevice.mipController.setChestLED(0, 255, 0);
}
//set Led to blue
selectedDevice.mipController.setChestLED(0, 0, 255);
}
```

### Continous move
The best way to control robots movement is to use the `drive` function, which instructs the robot to move in a given direction for a short period of 50ms.
You need to call this function at intervals of 50ms contiously sending new instructions.

A good example is to use the `nativescript-accelerometer` plugin.

Here is the code you need to make it work:


```
import { MipDevice } from "nativescript-mip-ble/mip-device";
import {startAccelerometerUpdates, stopAccelerometerUpdates} from "nativescript-accelerometer"

export class AccelerometerComponent {
    private turnSpeed: number = 0;
    private speed: number = 0;

    private selectedDevice: MipDevice;

    constructor(mip: MipDevice) {
        this.selectedDevice = mip;
    }

    public startAccelerometer() {

        startAccelerometerUpdates( data => {
            this.turnSpeed = data.x; // lean left (0 to -1) / right (0 to 1)
            this.speed = data.y; // lean forward (0 to -1) / back (0 to 1)
        } )

        this.startContinousMove();
    }

    public startContinousMove() {
        setInterval( () => {
            this.selectedDevice.drive(this.speed, this.turnSpeed);
        }, 50);
    }
}
```

## Making changes to the plugin
If you want to make changes to the plugin, you need first set up your environment correctly.
First run at the root first, which will let you then use the demo projects. 
```
tns install
```


### To rebuild the plugin for the JavaScript core `demo` project

```
npm run preparedemo
```

### To rebuild the plugin for the angular `demo-ng` project

```
npm run preparedemo-ng
```

### To run the demo project:

```
cd demo

tns platform add android
tns run android

and/or

tns platform add ios
tns platform run ios
```

### To run the demo-ng project:

```
cd demo-ng

tns platform add android
tns run android

and/or

tns platform add ios
tns platform run ios
```
