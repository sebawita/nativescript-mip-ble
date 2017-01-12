import {topmost} from "ui/frame";

function sideDrawer(): any {
    return topmost().currentPage.getViewById("side-drawer");
}
function closeDrawer() {
    var instance = sideDrawer();
    if (instance) {
        // console.log("closing drawer");
        instance.closeDrawer();
    }
}

var navigationEntry = {
    moduleName: "pages/controller/controller-page",
    animated: false,
    clearHistory: true
};

export function navigateToScanner() {
    closeDrawer();

    navigationEntry.moduleName = "pages/scan/scan-page";
    topmost().navigate(navigationEntry);
}

export function navigateToArrows() {
    closeDrawer();

    navigationEntry.moduleName = "pages/arrows/arrows-page";
    topmost().navigate(navigationEntry);
}

export function navigateToAccelerometer() {
    closeDrawer();
    
    navigationEntry.moduleName = "pages/accelerometer/accelerometer-page";
    topmost().navigate(navigationEntry);
}

export function navigateToJoystick() {
    closeDrawer();
    
    navigationEntry.moduleName = "pages/joystick/joystick-page";
    topmost().navigate(navigationEntry);
}

export function navigateToSound() {
    closeDrawer();
    
    navigationEntry.moduleName = "pages/sound/sound-page";
    topmost().navigate(navigationEntry);
}

export function navigateToLights() {
    closeDrawer();
    
    navigationEntry.moduleName = "pages/lights/lights-page";
    topmost().navigate(navigationEntry);
}



