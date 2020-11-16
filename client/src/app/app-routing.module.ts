import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
	{
		path: '',
		loadChildren: 'app/app-landing/app-landing.module#AppLandingModule'
	},
	{
		path: 'board',
		loadChildren: 'app/app-board/app-board.module#AppBoardModule',
	},
	{
		path: '**',
		redirectTo: ''
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
