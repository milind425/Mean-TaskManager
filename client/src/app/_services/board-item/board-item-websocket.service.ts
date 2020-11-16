import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {BoardItemModel} from "../../_models/board-item.model";

@Injectable ()
export class BoardItemWebsocketService {
	private socket = io (environment.ws_url);
	items;
	
	
	constructor () {
		//GET ALL
		this.items = new Observable (obs => {
			const socket = io (environment.ws_url);
			
			socket.emit ('itemsList');
			
			socket.on ('items', (data) => {
				let boardsItems = data.map( req => {
					return new BoardItemModel(req);
				});
				obs.next (boardsItems);
				obs.complete ();
			});
			
			return () => {
				socket.disconnect ();
			};
		});
	}
	
	
	postItem (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('item', (data) => {
				let boardItem = new BoardItemModel(data);
				observer.next (boardItem);
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
				this.socket.emit ('createItems', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
	deleteItem (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('deleteItem', (data) => {
				let boardItem = new BoardItemModel(data);
				observer.next (boardItem);
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
				this.socket.emit ('deleteItemById', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
	changeItemPosition (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('changeItem', (data) => {
				let boardItem = new BoardItemModel(data);
				observer.next (boardItem);
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
				this.socket.emit ('changeItemById', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
	putItem (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('putItemName', (data) => {
				let boardItem = new BoardItemModel(data);
				observer.next (boardItem);
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
				this.socket.emit ('putItemById', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
}
