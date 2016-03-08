import {Component, SimpleChange} from 'angular2/core'
import 'rxjs/Rx' //operators for es6 ... wtf
import {TodoFormComponent} from './todo.form.component'
import {authService} from './service/auth.service'
import {userService} from './service/user.service'
import {Auth} from './service/models/auth'

@Component({
    selector: 'profile',
    directives: [TodoFormComponent],
    providers: [authService, userService],
    template: `
		<div class="container">
			<h1>Profile</h1>
			{{isAuth}}
			<span *ngIf="profileName">{{profileName}}</span>
			<p>Active since: {{activeDateFormatted}}</p>
		</div> 
	`
})

export class ProfileComponent{
	isAuth: boolean;
	authName: string;
	profileName: string;
	errMsg: string;
	activeDate: string;
	activeDateFormatted: string;
	month: number;


	constructor(public _authService: authService, public _userService: userService){
		this._authService.auth$.subscribe(observer => { this.isAuth = observer });
		this._authService.authName$.subscribe(observer => { this.authName = observer });
		this._userService.profileName$.subscribe(observer => { this.profileName = observer });
		this._userService.activeDate$.subscribe(observer => { this.activeDate = observer });
	}

	ngOnInit(){
		this._authService.getAuth().then(() => {
			this.getProfile();
		}).catch((err) => {
			this.errMsg = err;
		});
	}

	getProfile(){
		this._userService.getProfile(this.authName).then(() => {
			this.getUser();
		}).catch((err) => {
			console.log(err);
		});
	}

	getUser(){
		this._userService.getUser(this.authName).then(() => {
			let newDate = this.activeDate.toString();
			let d = new Date(newDate);
			this.month = d.getMonth() + 1;
			this.activeDateFormatted = this.month + '/' + d.getDate() + '/' + d.getFullYear();
		}).catch((err) => {
			console.log(err);
		});
	}
};
