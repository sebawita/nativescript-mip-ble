import { Routes } from "@angular/router";

import { ScanComponent } from "./scan/scan.component";
import { ArrowsComponent } from "./arrows/arrows.component";

export const appRoutes: Routes = [
  { path: "", component: ScanComponent },
  { path: "arrows", component: ArrowsComponent },
];