import {Component, OnInit} from "@angular/core";

import {ModalLoginService} from "../../_services/modal-login/modal-login.service";
import {AuthenticationService} from "../../_services/authentication.service";


@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	logo: string = '../assets/menu/logo.svg';
	login: boolean;
	
	
	constructor (public modalLogin: ModalLoginService,
				 private authService: AuthenticationService) {
		this.modalLogin.subject.subscribe({
			next: (value) => {
				this.login = value;
			},
			error: (e) => {
				console.log(e);
			},
			complete: () => {
				console.log('complete!');
			}
		});
	}
	
	ngOnInit () {
	}
	
	openDialog (): void {
		this.modalLogin.openModal();
	}
	
	logoutAuth (): void {
		this.authService.logout();
		this.modalLogin.subject.next(false);
	}
	
}
