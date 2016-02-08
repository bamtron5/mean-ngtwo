import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {NgForm}    from 'angular2/common'
import { User }    from './service/models/user'
import {userService} from './service/user.service'
import {authService} from './service/auth.service'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'login-form',
    templateUrl: 'templates/login-form.html',
	providers: [
		HTTP_PROVIDERS,
		userService,
		authService
	]
})

export class LoginFormComponent{
	constructor(public _userService: userService, public _authService: authService){
		this._authService.auth$.subscribe(updatedAuth => { this.isAuth = updatedAuth });
	}

	model = new User();
	isAuth:Boolean;

	ngOnInit(){
		this._authService.getAuth();
	}

	onSubmit(){
		var method = this._userService.login(this.model);
		return Promise.all([method]);
	}
}

bootstrap(LoginFormComponent, [userService])
	.catch(err => console.log(err));