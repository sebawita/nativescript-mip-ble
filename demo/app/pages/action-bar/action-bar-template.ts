import { Page } from "ui/page";
import { RadSideDrawer } from "nativescript-telerik-ui/sidedrawer";

export function showSlideout(args) {
    const page = <Page> args.object.page;

    const sidedrawer: RadSideDrawer =  page.getViewById<RadSideDrawer>("side-drawer");
    sidedrawer.showDrawer();
}
