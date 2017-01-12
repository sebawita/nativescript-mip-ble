
import { Page } from "ui/page";
import { RadSideDrawer, PushTransition } from "nativescript-telerik-ui/sidedrawer";

const drawerTransition = new PushTransition();;
let x = 0;

export function showSlideout(args) {
    const page = <Page> args.object.page;

    const sidedrawer: RadSideDrawer =  page.getViewById<RadSideDrawer>("side-drawer");
    sidedrawer.drawerTransition = drawerTransition;

    console.log("showSlideout message: " + x++);

    sidedrawer.showDrawer();
}
