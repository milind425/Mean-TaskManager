import {Injectable} from '@angular/core';
import {ModalLoginComponent} from "../../shared/modal-login/modal-login.component";
import {MatDialog} from "@angular/material";
import {AuthenticationService} from "../authentication.service";
import * as Rx from "rxjs/Rx";


@Injectable ()
export class ModalLoginService {
	public subject = new Rx.BehaviorSubject (false);
	
	
	constructor(public modal: MatDialog, private auth: AuthenticationService) {
		if (localStorage.getItem ('token')) {
			this.subject.next (true);
		} else {
			this.subject.next (false);
		}
	}
	
	

	openModal(): void {
		let dialogRef = this.modal.open (ModalLoginComponent, {
			minHeight: '375px', width: '300px'
		});

		dialogRef.afterClosed ().subscribe (res => {
			if (res !== undefined && res.status === 'VALID' && res.value.name === undefined) {
				//auth
				this.auth.login (res.value.email, res.value.password).subscribe ({
					next: (result) => {
						this.subject.next (result);
					}, error: (e) => {
						console.log (e);
					}, complete: () => {
						console.log ('complete!');
					}
				});
			} else if (res !== undefined && res.status === 'VALID' && res.value.name !== undefined) {
				//registration
				this.auth.registration (res.value.name, res.value.email, res.value.password).subscribe ({
					next: (result) => {
						this.subject.next (result);
					}, error: (e) => {
						console.log (e);
					}, complete: () => {
						console.log ('complete!');
					}
				});
			}
		});
	}
	
	
}
