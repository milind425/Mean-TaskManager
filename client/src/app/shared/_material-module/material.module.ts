import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatInputModule, MatMenuModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalLoginComponent} from '../modal-login/modal-login.component';


@NgModule ({
	imports: [
		CommonModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule
	],
	exports: [
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule
	],
	declarations: [ModalLoginComponent],
	entryComponents: [ModalLoginComponent]
})
export class MaterialModule {
}
