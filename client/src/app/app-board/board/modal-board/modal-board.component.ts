import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component ({
	selector: 'app-modal-create-board',
	templateUrl: './modal-board.component.html',
	styleUrls: ['./modal-board.component.css'],
})
export class ModalBoardComponent {
	
	constructor(public dialogRef: MatDialogRef<ModalBoardComponent>,
				@Inject (MAT_DIALOG_DATA) public data: any) {
	}
	
	
	modalForm: FormGroup = new FormGroup ({
		"name": new FormControl ('', [Validators.required, Validators.minLength (1), Validators.maxLength (256)])
	});
	
	getErrorMessageName() {
		return this.modalForm.controls['name'].hasError ('required') ? 'You must enter a value' :
			this.modalForm.controls['name'].hasError ('minlength') ? 'The minimum name length is 1 characters' : '';
	}
	
	onNoClick(): void {
		this.dialogRef.close ();
	}
	
	
}
