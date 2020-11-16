import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from "./landing/landing.component";
import {AppLandingRoutingModule} from "./app-landing-routing.module";

import {SharedModule} from "../shared/shared.module";


@NgModule ({
	imports: [
		CommonModule,
		AppLandingRoutingModule,
		SharedModule,
		
	],
	declarations: [
		LandingComponent
	],
	providers: [
	],
})
export class AppLandingModule {
}
