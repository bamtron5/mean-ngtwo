import {bootstrap} from 'angular2/platform/browser'
import { Component } from 'angular2/core'
import {NgForm}    from 'angular2/common'
import { User }    from './service/models/user'
import {userService} from './service/user.service'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS, Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'login-form',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'templates/login-form.html',
	providers: [
		HTTP_PROVIDERS,
		userService
	]
})

export class LoginFormComponent {
	constructor(public _userService: userService, params: RouteParams) {
		if (params.get('loginForm') === "true" || params.get('loginForm') === null){
			this.isLogin = true;
		} else {
			this.isLogin = false
		}
		(this._userService.acceptedLogin$.subscribe(updatedAccept => { this.isAccepted = updatedAccept})) ? undefined : false;
	}

	model = new User();
	isLogin: Boolean;
	isAccepted: Boolean;

	changeForm(_bool){
		this.isLogin = _bool;
	}

	onSubmit(form) {
		if(form === "login"){
			this._userService.login(this.model, false);
		} else {
			this._userService.signup(this.model, false);
		}
	}
}