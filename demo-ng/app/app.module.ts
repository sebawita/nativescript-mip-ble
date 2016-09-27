// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ScanComponent } from "./scan/scan.component";

@NgModule({
  declarations: [
    AppComponent,
    ScanComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule],
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);