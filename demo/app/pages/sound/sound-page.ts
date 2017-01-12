import { EventData } from "data/observable";
import { Page } from "ui/page";

import { soundViewModel } from "./sound-view-model";

export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = soundViewModel;
}
