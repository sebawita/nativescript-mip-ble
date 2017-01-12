import { EventData } from "data/observable";
import { Page } from "ui/page";
import { View } from "ui/core/view";

import { accelerometerViewModel } from "./accelerometer-view-model";

export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = accelerometerViewModel;
}
