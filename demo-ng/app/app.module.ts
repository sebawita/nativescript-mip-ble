// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule  } from "nativescript-angular/forms";
import { NativeScriptRouterModule} from "nativescript-angular/router";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ScanComponent } from "./scan/scan.component";
import { ArrowsComponent } from "./arrows/arrows.component";
import { AccelerometerComponent } from "./accelerometer/accelerometer.component";


import { appRoutes } from "./app.routing";
@NgModule({
  declarations: [
    AppComponent,
    ArrowsComponent,
    AccelerometerComponent,
    ScanComponent],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes)]
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);