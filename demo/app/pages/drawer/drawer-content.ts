import {topmost} from "ui/frame";

var navigationEntry = {
    moduleName: "pages/controller/controller-page",
//    context: {mipDevice: mipDevice},
    animated: false,
    backstackVisible: false
};

export function navigateToScanner() {
    navigationEntry.moduleName = "pages/scan/scan-page";
    topmost().navigate(navigationEntry);
}

export function navigateToArrows() {
    navigationEntry.moduleName = "pages/arrows/arrows-page";
    topmost().navigate(navigationEntry);
}

export function navigateToAccelerometer() {
    navigationEntry.moduleName = "pages/accelerometer/accelerometer-page";
    topmost().navigate(navigationEntry);
}

export function navigateToJoystick() {
    navigationEntry.moduleName = "pages/joystick/joystick-page";
    topmost().navigate(navigationEntry);
}

export function navigateToSound() {
    navigationEntry.moduleName = "pages/sound/sound-page";
    topmost().navigate(navigationEntry);
}


