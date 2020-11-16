import {
	animation,
	style,
	animate,
	keyframes,
} from '@angular/animations';



export function myFadeInDown() {
	return fade();
}


function fade() {
	return animation(
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
	);
}

