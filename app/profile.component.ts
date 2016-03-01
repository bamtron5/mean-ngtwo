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
		</div> 
	`
})

export class ProfileComponent{
	isAuth: boolean;
	authName: string;
	profileName: string;
	errMsg: string;


	constructor(public _authService: authService, public _userService: userService){
		this._authService.auth$.subscribe(observer => { this.isAuth = observer });
		this._authService.authName$.subscribe(observer => { this.authName = observer });
		this._userService.profileName$.subscribe(observer => { this.profileName = observer });
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
			
		}).catch((err) => {
			console.log(err);
		});
	}
};
