import {Component, OnInit} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";


@Component ({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css'],
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
				)
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
	],
	host: {'[@routerTransition]': ''}
})
export class LandingComponent implements OnInit {
	
	
	constructor () {
	}
	
	ngOnInit () {
	}
	
	
}
