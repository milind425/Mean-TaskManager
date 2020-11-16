import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import {environment} from '../../../environments/environment';
import {BoardModel} from "../../_models/board.model";

@Injectable ()
export class BoardWebsocketService {
	private socket = io (environment.ws_url);
	board;
	
	
	constructor () {
		//GET ALL
		this.board = new Observable (obs => {
			const socket = io (environment.ws_url);
			
			socket.emit ('boardsList');
			
			socket.on ('boards', (data) => {
				let boards = data.map( req => {
					return new BoardModel(req);
				});
				obs.next (boards);
				obs.complete ();
			});
			
			return () => {
				socket.disconnect ();
			};
		});
	}
	
	
	postBoards (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('board', (data) => {
				let board = new BoardModel(data);
				observer.next (board);
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
				this.socket.emit ('createBoards', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
	deleteBoards (): Rx.Subject<any> {
		const observable = new Observable (observer => {
			this.socket.on ('deleteBoard', (data) => {
				let board = new BoardModel(data);
				observer.next (board);
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
				this.socket.emit ('deleteBoardById', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
	
	putBoards () {
		const observable = new Observable (observer => {
			this.socket.on ('putBoard', (data) => {
				let board = new BoardModel(data);
				observer.next (board);
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
				this.socket.emit ('putBoardById', obj);
			},
		};
		
		
		return Rx.Subject.create (observer, observable);
	}
	
}
