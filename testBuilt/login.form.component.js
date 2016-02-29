var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var user_1 = require('./service/models/user');
var user_service_1 = require('./service/user.service');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var user_validators_1 = require('./validators/user.validators');
require('rxjs/Rx'); //operators for es6 ... wtf
var LoginFormComponent = (function () {
    function LoginFormComponent(_userService, params, fb) {
        var _this = this;
        this._userService = _userService;
        this.model = new user_1.User();
        if (params.get('loginForm') === "true" || params.get('loginForm') === null) {
            this.isLogin = true;
        }
        else {
            this.isLogin = false;
        }
        (this._userService.acceptedLogin$.subscribe(function (updatedAccept) { _this.isAccepted = updatedAccept; })) ? undefined : false;
        this._userService.signUpMessage$.subscribe(function (updatedSignUpMessage) { _this.signUpMessage = updatedSignUpMessage; });
        this._userService.captchaResponse$.subscribe(function (updatedCaptchaResponse) { _this.captchaResponse = updatedCaptchaResponse; });
        this._userService.loginMessage$.subscribe(function (updatedLoginMessage) { _this.loginMessage = updatedLoginMessage; });
        //control instances and validators
        this.name = new common_1.Control('', common_1.Validators.compose([
            common_1.Validators.required,
            common_1.Validators.minLength(4),
            common_1.Validators.maxLength(35)
        ]));
        this.emailCtrl = new common_1.Control('', common_1.Validators.compose([
            common_1.Validators.required,
            user_validators_1.UserValidators.emailValidator
        ]));
        this.confirmEmail = new common_1.Control('', common_1.Validators.compose([
            common_1.Validators.required,
            user_validators_1.UserValidators.emailValidator
        ]));
        this.password = new common_1.Control('', common_1.Validators.compose([
            common_1.Validators.required,
            common_1.Validators.minLength(8),
            common_1.Validators.maxLength(35)
        ]));
        this.confirmPassword = new common_1.Control('', common_1.Validators.compose([
            common_1.Validators.required,
            common_1.Validators.minLength(8),
            common_1.Validators.maxLength(35)
        ]));
        this.signUpFormGroup = fb.group({
            name: this.name,
            emailCtrl: this.emailCtrl,
            confirmEmail: this.confirmEmail,
            matchingPassword: fb.group({
                confirmPassword: this.confirmPassword,
                password: this.password,
            }, { validator: user_validators_1.UserValidators.passwordMatch }),
        }, { validator: user_validators_1.UserValidators.emailMatch });
    }
    LoginFormComponent.prototype.ngAfterViewInit = function () {
        var c = document.getElementById('recaptcha_widget_div');
        var newC = document.getElementById('captcha_div');
        newC.appendChild(c);
    };
    LoginFormComponent.prototype.changeForm = function (_bool) {
        this.isLogin = _bool;
    };
    LoginFormComponent.prototype.onSubmit = function (form) {
        if (form === "login") {
            this._userService.login(this.model, false);
            console.log(this.loginMessage);
        }
        else {
            this.submitSignup();
        }
    };
    LoginFormComponent.prototype.submitSignup = function () {
        var _this = this;
        var captchaInput = document.getElementById('recaptcha_response_field');
        var str = captchaInput.value;
        var obj = { captcha: str, challenge: window['RecaptchaState'].challenge };
        this._userService.verifyCaptcha(obj, function () {
            if (_this.captchaResponse.captcha) {
                _this._userService.signup(_this.model, false);
            }
            else {
                window['Recaptcha'].reload();
            }
        });
    };
    LoginFormComponent = __decorate([
        //operators for es6 ... wtf
        core_1.Component({
            selector: 'login-form',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
            templateUrl: 'templates/login-form.html',
            providers: [
                http_1.HTTP_PROVIDERS,
                user_service_1.userService
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.userService, router_1.RouteParams, common_1.FormBuilder])
    ], LoginFormComponent);
    return LoginFormComponent;
})();
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login.form.component.js.map