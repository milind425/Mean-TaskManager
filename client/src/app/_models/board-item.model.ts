import {BoardItem} from "../_interfaces/board-item";


export class BoardItemModel implements BoardItem {
	_id: string;
	name: string;
	boardId: string;
	
	constructor(
		obj
	) {
		this._id = typeof obj._id === 'string' ? obj._id : undefined;
		this.name = typeof obj.name === 'string' ? obj.name : undefined;
		this.boardId = typeof obj.boardId === 'string' ? obj.boardId : undefined;
	}
}

