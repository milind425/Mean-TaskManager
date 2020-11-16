import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu/menu.component";
import {MaterialModule} from "./_material-module/material.module";
import {AuthenticationService} from "../_services/authentication.service";
import {ModalLoginService} from "../_services/modal-login/modal-login.service";
import {RouterModule} from "@angular/router";

@NgModule ({
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule
	],
	declarations: [
		MenuComponent
	],
	exports: [
		MenuComponent,
		MaterialModule
	],
	providers: [
		AuthenticationService,
		ModalLoginService
	]
})
export class SharedModule {
}
