import { Routes } from "@angular/router";

import { ScanComponent } from "./scan/scan.component";
import { ArrowsComponent } from "./arrows/arrows.component";
import { AccelerometerComponent } from "./accelerometer/accelerometer.component";

export const appRoutes: Routes = [
  { path: "", redirectTo: "/scan", pathMatch: "full", },
  { path: "scan", component: ScanComponent },
  { path: "arrows", component: ArrowsComponent },
  { path: "accelerometer", component: AccelerometerComponent },
];