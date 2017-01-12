import { EventData } from "data/observable";
import { Page } from "ui/page";

import { scanViewModel } from "./scan-view-model";

export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = scanViewModel;
}
