import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable ()
export class AuthenticationService {
	
	
	constructor (private http: HttpClient) {
	}
	
	login (email: string, password: string): Observable<boolean> {
		const httpOptions = {
			headers: new HttpHeaders ({
				'Content-Type': 'application/json'
			})
		};
		
		return this.http.post (environment.api_url + 'login', JSON.stringify ({
			email: email,
			password: password
		}), httpOptions)
			.map ((res: any) => {
				if (res.token) {
					localStorage.setItem ('token', res.token);
					return true;
				} else {
					return false;
				}
			});
	}
	
	
	registration (username: string, email: string, password: string): Observable<boolean> {
		const httpOptions = {
			headers: new HttpHeaders ({
				'Content-Type': 'application/json'
			})
		};
		
		return this.http.post (environment.api_url + 'register', JSON.stringify ({
			username: username,
			email: email,
			password: password
		}), httpOptions)
			.map ((res: any) => {
				if (res.token) {
					localStorage.setItem ('token', res.token);
					return true;
				} else {
					return false;
				}
			});
	}
	
	
	logout (): void {
		localStorage.removeItem ('token');
	}
	
}
