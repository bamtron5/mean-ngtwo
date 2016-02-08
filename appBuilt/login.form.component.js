System.register(['angular2/platform/browser', 'angular2/core', './service/models/user', './service/user.service', './service/auth.service', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, user_1, user_service_1, auth_service_1, http_1;
    var LoginFormComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            LoginFormComponent = (function () {
                function LoginFormComponent(_userService, _authService) {
                    var _this = this;
                    this._userService = _userService;
                    this._authService = _authService;
                    this.model = new user_1.User();
                    this._authService.auth$.subscribe(function (updatedAuth) { _this.isAuth = updatedAuth; });
                }
                LoginFormComponent.prototype.ngOnInit = function () {
                    this._authService.getAuth();
                };
                LoginFormComponent.prototype.onSubmit = function () {
                    var method = this._userService.login(this.model);
                    return Promise.all([method]);
                };
                LoginFormComponent = __decorate([
                    //operators for es6 ... wtf
                    core_1.Component({
                        selector: 'login-form',
                        templateUrl: 'templates/login-form.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            user_service_1.userService,
                            auth_service_1.authService
                        ]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.userService, auth_service_1.authService])
                ], LoginFormComponent);
                return LoginFormComponent;
            })();
            exports_1("LoginFormComponent", LoginFormComponent);
            browser_1.bootstrap(LoginFormComponent, [user_service_1.userService])
                .catch(function (err) { return console.log(err); });
        }
    }
});
//# sourceMappingURL=login.form.component.js.map