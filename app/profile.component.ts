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
			<span *ngIf="authName">{{authName}}</span>
		</div> 
	`
})

export class ProfileComponent{
	isAuth: boolean;
	authName: string;
	errMsg: string;


	constructor(public _authService: authService, public _userService: userService){
		this._authService.auth$.subscribe(updatedAuth => { this.isAuth = updatedAuth });
		this._authService.authName$.subscribe(updatedAuthName => { this.authName = updatedAuthName });
	}

	ngOnInit(){
		this._authService.getAuth().then(() => {
			this._userService.getUser(this.authName);
		}).catch((err) => {
			this.errMsg = err;
		});
	}
};
