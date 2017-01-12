import { EventData } from "data/observable";
import { Page } from "ui/page";

import { joyStickViewModel } from "./joystick-view-model";

export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = joyStickViewModel;
}
