import {Board} from "../_interfaces/board";


export class BoardModel implements Board {
	_id: string;
	name: string;
	items: Array<any>;
	
	constructor(
		obj
	) {
		this._id = typeof obj._id === 'string' ? obj._id : undefined;
		this.name = typeof obj.name === 'string' ? obj.name : undefined;
		this.items = typeof obj.items === 'object' ? obj.items : undefined;
	}
}

