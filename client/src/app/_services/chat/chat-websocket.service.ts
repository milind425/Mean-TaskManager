import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {MessagesModel} from "../../_models/messages.model";

@Injectable ()
export class ChatWebsocketService {
	private socket = io (environment.ws_url);
	history;
	
	
	constructor () {
		//GET ALL
		this.history = new Observable (obs => {
			const socket = io (environment.ws_url);
			
			socket.emit ('receiveHistory');
			
			socket.on ('history', (data) => {
				let messages = data.map( req => {
					return new MessagesModel(req);
				});
				obs.next (messages);
				obs.complete ();
			});
			
			
			return () => {
				socket.disconnect ();
			};
		});
	}
	
	
	connect (): Rx.Subject<MessageEvent> {
		const observable = new Observable (observer => {
			this.socket.on ('message', (data) => {
				let messages = new MessagesModel(data);
				observer.next (messages);
			});
			
			return () => {
				this.socket.disconnect ();
			};
		});
		
		
		const observer = {
			next: (data: Object) => {
				const obj = {
					'token': localStorage.getItem ('token'), 'data': data
				};
				this.socket.emit ('chat', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
}
