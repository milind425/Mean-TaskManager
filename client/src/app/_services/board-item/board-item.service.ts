import {Injectable} from '@angular/core';
import {BoardItemWebsocketService} from './board-item-websocket.service';
import {Subject} from 'rxjs/Rx';


@Injectable()
export class BoardItemService {
	
	postItems: Subject<any>;
	deleteItems: Subject<any>;
	putItemPosition: Subject<any>;
	putItem: Subject<any>;
	
	constructor (private wsService: BoardItemWebsocketService) {
		this.postItems = <Subject<any>>wsService.postItem();
		this.deleteItems = <Subject<any>>wsService.deleteItem();
		this.putItemPosition = <Subject<any>>wsService.changeItemPosition();
		this.putItem = <Subject<any>>wsService.putItem();
	}
	
	
	addItem (idBoard, itemName) {
		const obj = {idBoard, itemName};
		this.postItems.next(obj);
	}
	
	delItem (id) {
		this.deleteItems.next(id);
	}
	
	changeItemPosition (id, newBoardId) {
		const obj = {id, newBoardId};
		this.putItemPosition.next(obj);
	}
	
	changeItem (id, newName) {
		const obj = {id, newName};
		this.putItem.next(obj);
	}
	
}
