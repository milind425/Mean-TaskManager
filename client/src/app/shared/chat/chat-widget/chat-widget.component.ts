import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../_services/chat/chat.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatWebsocketService} from "../../../_services/chat/chat-websocket.service";

import {ModalLoginService} from "../../../_services/modal-login/modal-login.service";

@Component ({
	selector: 'app-chat-widget',
	templateUrl: './chat-widget.component.html',
	styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit {
	login: boolean;
	active = false;
	messages = [];
	
	messageForm: FormGroup = new FormGroup ({
		"message": new FormControl ('', [Validators.required, Validators.minLength (1), Validators.nullValidator])
	});
	
	constructor (private chat: ChatService,
				 private wsChatService: ChatWebsocketService,
				 public modalLogin: ModalLoginService,) {
		this.modalLogin.subject.subscribe ({
			next: (value) => {
				this.login = value;
			},
			error: (e) => {
				console.log (e);
			},
			complete: () => {
				console.log ('complete!');
			}
		});
		
		this.wsChatService.history
			.subscribe ({
				next: (res) => {
					res.map (item => {
						this.messages.push (item);
					});
					this.scrollHistory ();
				}, error: (e) => {
					console.log (e);
				}, complete: () => {
					console.log ('complete!');
				}
			});
	}
	
	ngOnInit () {
		this.chat.messages.subscribe ({
			next: (res) => {
				this.messages.push (res);
				this.scrollMessage ();
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	activeWidget () {
		this.active = !this.active;
	}
	
	
	scrollHistory () {
		let x = document.querySelectorAll ('#content');
		setTimeout (() => {
			let y = document.querySelectorAll ('#content > div.message');
			for (let i = 0; i < this.messages.length; i++) {
				x[0].scrollTop = x[0].scrollTop + y[i].clientHeight + 20;
			}
		}, 0);
	}
	
	
	scrollMessage () {
		setTimeout (() => {
			let x = document.querySelectorAll ('#content');
			let y = document.querySelectorAll ('#content > .message:last-child');
			x[0].scrollTop = x[0].scrollTop + y[0].clientHeight + 20;
		}, 0);
	}
	
	
	sendMessage (val) {
		if (val.status !== 'VALID') return;
		this.chat.sendMsg (val.value.message);
		this.messageForm.reset ();
	}
	
}
