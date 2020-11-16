import {Component, OnInit} from '@angular/core';

import {
	animate, animateChild, animation, keyframes, query, stagger, style, transition, trigger, useAnimation
} from "@angular/animations";

import {MatDialog} from "@angular/material";
import {ModalBoardComponent} from "./modal-board/modal-board.component";
import {ModalBoardItemComponent} from "./modal-board-item/modal-board-item.component";
import {ModalBoardItemPutComponent} from "./modal-board-item-put/modal-board-item-put.component";

import {BoardService} from "../../_services/board/board.service";
import {BoardWebsocketService} from "../../_services/board/board-websocket.service";
import {BoardItemService} from "../../_services/board-item/board-item.service";
import {BoardItemWebsocketService} from "../../_services/board-item/board-item-websocket.service";
import {ModalBoardPutComponent} from "./modal-board-put/modal-board-put.component";

import {ModalLoginService} from "../../_services/modal-login/modal-login.service";



@Component ({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css'],
	animations: [
		trigger('routerTransition', [
			transition(':enter', [
				animate(
					'1s 0s',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(100%, 0, 0) skewX(-15deg)',
							offset: 0,
							position:'fixed', width:'100%', height:'100%'
						}),
						style({
							opacity: 1,
							transform: 'translate3d(0, 0, 0) skewX(0)',
							offset: 1
						}),
					])
				),
				query('@fadeInDown', stagger(400,[
					animateChild()
				]), {optional: true})
			]),
			transition(':leave', [
				animate(
					'1s 0s ease-out',
					keyframes([
						style({
							opacity: 1,
							offset: 0,
							position:'fixed', width:'100%', height:'100%'
						}),
						style({
							opacity: 0,
							transform: 'translate3d(100%, 0, 0) skewX(15deg)',
							offset: 1
						}),
					])
				)
			])
		]),
		trigger('fadeInDown', [transition(':enter', useAnimation(
			animation(
				animate(
					'1s 0s',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(0, -100%, 0)',
							offset: 0,
						}),
						style({
							opacity: 1,
							transform: 'translate3d(0, 0, 0)',
							offset: 1,
						}),
					])
				),
			)
		))]),
		trigger('fadeInUp', [transition(':enter', useAnimation(
			animation(
				animate(
					'0.6s 0s',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(0, 100%, 0)',
							offset: 0,
						}),
						style({
							opacity: 1,
							transform: 'translate3d(0, 0, 0)',
							offset: 1,
						}),
					])
				),
			)
		))]),
	],
	host: {
		'[@routerTransition]': ''
	}
})
export class BoardComponent implements OnInit {
	loading = false;
	
	login: boolean;
	
	boards = [];
	items = [];
	
	constructor(public modalLogin: ModalLoginService,
				public dialog: MatDialog,
				private boardService: BoardService,
				private wsBoardService: BoardWebsocketService,
				private boardItemService: BoardItemService,
				private wsBoardItemService: BoardItemWebsocketService) {
		this.modalLogin.subject.subscribe ({
			next: (value) => {
				this.login = value;
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	ngOnInit() {
		setTimeout (() => {
			this.loading = true;
		}, 900);
		
		
		this.wsBoardService.board.subscribe ({
			next: (res) => {
				this.boards = res;
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});

		
		
		this.boardService.postBoards.subscribe ({
			next: (res) => {
				this.boards.push (res);
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		this.boardService.deleteBoards.subscribe ({
			next: (res) => {
				this.boards = this.boards.filter (req => req._id !== res._id);
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		this.boardService.putBoards.subscribe ({
			next: (res) => {
				this.boards.forEach ((board) => {
					if (board._id === res._id) {
						board.name = res.name;
					}
				});
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		////////////<---BOARD-ITEMS--->/////////////
		this.wsBoardItemService.items.subscribe ({
			next: (res) => {
				this.items = res;
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				this.filterBoards ();
				console.log ('complete!');
			}
		});
		
		
		this.boardItemService.postItems.subscribe ({
			next: (res) => {
				this.boards.forEach ((board) => {
					if (board._id === res.boardId) {
						board.items.push (res);
					}
				});
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		this.boardItemService.deleteItems.subscribe ({
			next: (res) => {
				this.boards.forEach ((board) => {
					if (board._id === res.boardId) {
						board.items = board.items.filter (req => req._id !== res._id);
					}
				});
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		this.boardItemService.putItemPosition.subscribe ({
			next: (res) => {
				this.boards = this.boards.map ((board) => {
					board.items = board.items.filter ((item) => item._id !== res._id);
					if (board._id === res.boardId) {
						board.items.push (res);
					}
					return board;
				});
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		
		
		this.boardItemService.putItem.subscribe ({
			next: (res) => {
				this.boards.forEach ((board) => {
					if (board._id === res.boardId) {
						board.items.forEach ((item) => {
							if (item._id === res._id) {
								item.name = res.name;
							}
						})
					}
				});
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
		////////////<---BOARD-ITEMS--->/////////////
	}
	
	
	filterBoards() {
		this.boards.forEach ((board) => {
			this.items.forEach ((item) => {
				if (board._id === item.boardId) {
					board.items.push (item);
				}
			})
		});
	}
	
	
	postBoard(): void {
		let dialogRef = this.dialog.open (ModalBoardComponent, {
			minHeight: '375px', width: '300px'
		});
		
		dialogRef.afterClosed ().subscribe ({
			next: (res) => {
				if (res !== undefined && res.status === 'VALID' && res.value.name !== undefined) {
					this.boardService.addBoard (res.value.name);
				}
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	deleteBoard(id) {
		this.boardService.delBoard (id);
	}
	
	
	putBoard(id) {
		let dialogRef = this.dialog.open (ModalBoardPutComponent, {
			minHeight: '375px', width: '300px'
		});
		
		dialogRef.afterClosed ().subscribe ({
			next: (res) => {
				if (res !== undefined && res.status === 'VALID' && res.value.name !== undefined) {
					this.boardService.changeBoard (id, res.value.name);
				}
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	////////////<---BOARD-ITEMS--->/////////////
	postBoardItem(idBoard): void {
		let dialogRef = this.dialog.open (ModalBoardItemComponent, {
			minHeight: '375px', width: '300px'
		});
		
		dialogRef.afterClosed ().subscribe ({
			next: (res) => {
				if (res !== undefined && res.status === 'VALID' && res.value.name !== undefined) {
					this.boardItemService.addItem (idBoard, res.value.name);
				}
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	deleteItem(id) {
		this.boardItemService.delItem (id);
	}
	
	
	putItem(id): void {
		let dialogRef = this.dialog.open (ModalBoardItemPutComponent, {
			minHeight: '375px', width: '300px'
		});
		
		dialogRef.afterClosed ().subscribe ({
			next: (res) => {
				if (res !== undefined && res.status === 'VALID' && res.value.name !== undefined) {
					this.boardItemService.changeItem (id, res.value.name);
				}
			}, error: (e) => {
				console.log (e);
			}, complete: () => {
				console.log ('complete!');
			}
		});
	}
	
	
	onItemDrop(e: any, newBoardId: string) {
		if (e.dragData.boardId !== newBoardId) {
			this.boardItemService.changeItemPosition (e.dragData._id, newBoardId);
		}
	}
	////////////<---BOARD-ITEMS--->/////////////
	
	
	checkAuth(e) {
		if (this.login === false) {
			this.modalLogin.openModal ();
			e.stopPropagation ();
			e.preventDefault ();
		}
	}
	
	
}
