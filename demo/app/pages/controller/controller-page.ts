import { EventData } from "data/observable";
import { Page } from "ui/page";
import { ControllerViewModel } from "./controller-view-model";


export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    var mip = page.navigationContext.mipDevice;

    page.bindingContext = new ControllerViewModel(mip);
}