import {Injectable} from '@angular/core';
import {BoardWebsocketService} from './board-websocket.service';
import {Subject} from 'rxjs/Rx';


@Injectable()
export class BoardService {
	
	postBoards: Subject<any>;
	deleteBoards: Subject<any>;
	putBoards: Subject<any>;
	
	
	constructor (private wsService: BoardWebsocketService) {
		this.postBoards = <Subject<any>>wsService.postBoards();
		this.deleteBoards = <Subject<any>>wsService.deleteBoards();
		this.putBoards = <Subject<any>>wsService.putBoards();
	}
	
	addBoard (board) {
		this.postBoards.next(board);
	}
	
	delBoard (id) {
		this.deleteBoards.next(id);
	}
	
	changeBoard (id, newName) {
		const obj = {id, newName};
		this.putBoards.next(obj);
	}
	
}
