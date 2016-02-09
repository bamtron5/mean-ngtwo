import {bootstrap} from 'angular2/platform/browser'
import {Component, OnChanges, SimpleChange } from 'angular2/core'
import {NgForm}    from 'angular2/common'
import { User }    from './service/models/user'
import {userService} from './service/user.service'
import {HTTP_PROVIDERS} from 'angular2/http'
import {authService} from './service/auth.service';
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'login-form',
    templateUrl: 'templates/login-form.html',
	providers: [
		HTTP_PROVIDERS,
		authService,
		userService
	]
})

export class LoginFormComponent {
	constructor(public _userService: userService, public _authService: authService) {
		(this._userService.acceptedLogin$.subscribe(updatedAccept => { this.isAccepted = updatedAccept})) ? undefined : false;
	}

	model = new User();
	isAccepted: Boolean;

	onSubmit() {
		var method = this._userService.login(this.model, false);
	}
}



bootstrap(LoginFormComponent, [userService, authService])
	.catch(err => console.log(err));