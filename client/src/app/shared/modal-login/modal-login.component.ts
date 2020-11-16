import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {trigger, transition, useAnimation} from '@angular/animations';
import {fadeInDown} from 'ng-animate';


@Component ({
	selector: 'app-modal-login',
	templateUrl: './modal-login.component.html',
	styleUrls: ['./modal-login.component.css'],
	animations: [
		trigger ('fadeInDown',
			[transition ('* => *', useAnimation (fadeInDown))])
	],
})

export class ModalLoginComponent {
	fadeInDown: any;
	
	hide = true;
	regCheck = false;
	
	constructor (public dialogRef: MatDialogRef<ModalLoginComponent>,
				 @Inject (MAT_DIALOG_DATA) public data: any) {
	}
	
	
	modalForm: FormGroup = new FormGroup ({
		'email': new FormControl ('', [Validators.required, Validators.email]),
		'password': new FormControl ('', [Validators.required, Validators.minLength (4)])
	});
	
	modalFormReg: FormGroup = new FormGroup ({
		'name': new FormControl ('', [Validators.required, Validators.minLength (4)]),
		'email': new FormControl ('', [Validators.required, Validators.email]),
		'password': new FormControl ('', [Validators.required, Validators.minLength (4)])
	});
	
	
	getErrorMessageName () {
		if (this.regCheck === false) {
			return this.modalForm.controls['name'].hasError ('required') ? 'You must enter a value' :
				this.modalForm.controls['name'].hasError ('minlength') ? 'The minimum name length is 4 characters' : '';
		} else {
			return this.modalFormReg.controls['name'].hasError ('required') ? 'You must enter a value' :
				this.modalFormReg.controls['name'].hasError ('minlength') ? 'The minimum name length is 4 characters' : '';
		}
	}
	
	getErrorMessageEmail () {
		if (this.regCheck === false) {
			return this.modalForm.controls['email'].hasError ('required') ? 'You must enter a value' :
				this.modalForm.controls['email'].hasError ('email') ? 'Not a valid email' : '';
		} else {
			return this.modalForm.controls['email'].hasError ('required') ? 'You must enter a value' :
				this.modalForm.controls['email'].hasError ('email') ? 'Not a valid email' : '';
		}
	}
	
	getErrorMessagePassword () {
		if (this.regCheck === false) {
			return this.modalForm.controls['password'].hasError ('required') ? 'You must enter a value' :
				this.modalForm.controls['password'].hasError ('minlength') ? 'The minimum password length is 4 characters' : '';
		} else {
			return this.modalForm.controls['password'].hasError ('required') ? 'You must enter a value' :
				this.modalForm.controls['password'].hasError ('minlength') ? 'The minimum password length is 4 characters' : '';
		}
	}
	
	onNoClick (): void {
		this.dialogRef.close ();
	}
	
	registration () {
		this.regCheck = true;
	}
	
	signIn () {
		this.regCheck = false;
	}
	
}
