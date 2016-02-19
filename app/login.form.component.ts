import {bootstrap} from 'angular2/platform/browser'
import { Component } from 'angular2/core'
import {NgForm, Control, Validators, ControlGroup, FormBuilder, FORM_DIRECTIVES}    from 'angular2/common'
import { User }    from './service/models/user'
import { Captcha } from './service/models/captcha'
import {userService} from './service/user.service'
import {authService} from './service/auth.service'
import {HTTP_PROVIDERS} from 'angular2/http'
import {ROUTER_PROVIDERS, Router, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'
import {UserValidators} from './validators/user.validators'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'login-form',
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'templates/login-form.html',
	providers: [
		HTTP_PROVIDERS,
		userService
	]
})

export class LoginFormComponent {

	model: User;
	isLogin: Boolean;
	isAccepted: Boolean;
	signUpMessage: String;
	captchaResponse: Captcha;

	//controls
	name: Control;
	emailCtrl: Control;
	confirmEmail: Control;
	password: Control;
	confirmPassword: Control;

	//form control group
	signUpFormGroup: ControlGroup;

	constructor(public _userService: userService, params: RouteParams, fb: FormBuilder) {
		this.model = new User();

		if (params.get('loginForm') === "true" || params.get('loginForm') === null){
			this.isLogin = true;
		} else {
			this.isLogin = false
		}

		(this._userService.acceptedLogin$.subscribe(updatedAccept => { this.isAccepted = updatedAccept})) ? undefined : false;

		this._userService.signUpMessage$.subscribe(updatedSignUpMessage => { this.signUpMessage = updatedSignUpMessage });

		this._userService.captchaResponse$.subscribe(updatedCaptchaResponse => { this.captchaResponse = updatedCaptchaResponse });
		
		//control instances and validators
		this.name = new Control('', Validators.compose([
			Validators.required,
			Validators.minLength(4),
			Validators.maxLength(35)
		]));

		this.emailCtrl = new Control('', Validators.compose([
			Validators.required,
			UserValidators.emailValidator
		]));

		this.confirmEmail = new Control('', Validators.compose([
			Validators.required,
			UserValidators.emailValidator
		]));

		this.password = new Control('', Validators.compose([
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(35)
		]));

		this.confirmPassword = new Control('', Validators.compose([
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(35)
		]));

		this.signUpFormGroup = fb.group({
			name: this.name,
			emailCtrl: this.emailCtrl,
			confirmEmail: this.confirmEmail,
			matchingPassword: fb.group({
				confirmPassword: this.confirmPassword,
				password: this.password,
			}, { validator: UserValidators.passwordMatch }),
		}, { validator: UserValidators.emailMatch });
	}

	ngAfterViewInit(){
		var c = <HTMLDivElement>document.getElementById('recaptcha_widget_div');
		var newC = <HTMLDivElement>document.getElementById('captcha_div');
		newC.appendChild(c);
	}

	changeForm(_bool: boolean) {
		this.isLogin = _bool;
	}

	onSubmit(form: string) {
		var captchaInput = <HTMLInputElement>document.getElementById('recaptcha_response_field');
		var str = captchaInput.value;
		var obj = { captcha: str, challenge: window['RecaptchaState'].challenge };

		this._userService.verifyCaptcha(obj, () => {
			if(this.captchaResponse.captcha){
				this.submitForm(form);
			} else {
				window['Recaptcha'].reload();
			}
		});
	}

	submitForm(form:string){
		if (form === "login"){
			this._userService.login(this.model, false);
		} else {
			this._userService.signup(this.model, false);
		}
	}
}