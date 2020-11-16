import {Injectable} from '@angular/core';
import {ChatWebsocketService} from './chat-websocket.service';
import {Subject} from 'rxjs/Rx';


@Injectable ()
export class ChatService {
	
	messages: Subject<any>;
	
	constructor(private wsService: ChatWebsocketService) {
		this.messages = <Subject<any>>wsService.connect ();
	}
	
	sendMsg(msg) {
		this.messages.next (msg);
	}
	
}