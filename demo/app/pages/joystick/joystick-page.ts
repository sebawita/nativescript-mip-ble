import { EventData } from "data/observable";
import { Page } from "ui/page";
import { JoyStick } from "./joystick-view-model";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = JoyStick;
}