import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ModalBoardComponent} from "../modal-board/modal-board.component";

@Component({
	selector: 'app-modal-board-item',
	templateUrl: './modal-board-item.component.html',
	styleUrls: ['./modal-board-item.component.css']
})
export class ModalBoardItemComponent {
	
	constructor(public dialogRef: MatDialogRef<ModalBoardComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {
	}
	
	
	modalForm: FormGroup = new FormGroup({
		"name": new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(256)])
	});
	
	getErrorMessageName() {
		return this.modalForm.controls['name'].hasError('required') ? 'You must enter a value' :
			this.modalForm.controls['name'].hasError('minlength') ? 'The minimum name length is 1 characters' : '';
	}
	
	onNoClick(): void {
		this.dialogRef.close();
	}
	
}
