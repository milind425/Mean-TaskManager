import {Messages} from "../_interfaces/messages";


export class MessagesModel implements Messages {
	_id: string;
	date: string;
	content: string;
	username: string;

	constructor(
		obj
	) {
		this._id = typeof obj._id === 'string' ? obj._id : undefined;
		this.date = typeof obj.date === 'string' ? obj.date : undefined;
		this.content = typeof obj.content === 'string' ? obj.content : undefined;
		this.username = typeof obj.username === 'string' ? obj.username : undefined;
	}
}

