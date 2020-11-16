import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppBoardRoutingModule} from './app-board-routing.module';
import {BoardComponent} from './board/board.component';

import {NgDragDropModule} from "ng-drag-drop";

import {ChatWebsocketService} from "../_services/chat/chat-websocket.service";
import {ChatService} from "../_services/chat/chat.service";

import {ChatWidgetComponent} from "../shared/chat/chat-widget/chat-widget.component";

import {BoardService} from "../_services/board/board.service";
import {BoardWebsocketService} from "../_services/board/board-websocket.service";
import {ModalBoardComponent} from './board/modal-board/modal-board.component';
import {ModalBoardItemComponent} from './board/modal-board-item/modal-board-item.component';
import {BoardItemService} from "../_services/board-item/board-item.service";
import {BoardItemWebsocketService} from "../_services/board-item/board-item-websocket.service";
import {ModalBoardItemPutComponent} from './board/modal-board-item-put/modal-board-item-put.component';
import {ModalBoardPutComponent} from './board/modal-board-put/modal-board-put.component';

import {ModalLoginService} from "../_services/modal-login/modal-login.service";
import {SharedModule} from "../shared/shared.module";


@NgModule ({
	imports: [
		CommonModule,
		AppBoardRoutingModule,
		NgDragDropModule.forRoot (),
		SharedModule
	],
	declarations: [
		BoardComponent,
		ChatWidgetComponent,
		ModalBoardComponent,
		ModalBoardItemComponent,
		ModalBoardItemPutComponent,
		ModalBoardPutComponent
	],
	providers: [
		ModalLoginService,
		ChatWebsocketService,
		ChatService,
		BoardWebsocketService,
		BoardService,
		BoardItemWebsocketService,
		BoardItemService
	],
	entryComponents: [
		ModalBoardComponent,
		ModalBoardItemComponent,
		ModalBoardItemPutComponent,
		ModalBoardPutComponent
	]
})
export class AppBoardModule {
}
