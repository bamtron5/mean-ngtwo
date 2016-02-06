System.register(['angular2/core', './service/models/user', './service/user.service', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, user_service_1, http_1;
    var UserFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            UserFormComponent = (function () {
                function UserFormComponent(_userService) {
                    var _this = this;
                    this._userService = _userService;
                    this.model = new user_1.User("");
                    this.submitted = false;
                    this.active = true;
                    this._userService.users$.subscribe(function (updatedUsers) { _this.users = updatedUsers; });
                }
                UserFormComponent.prototype.onSubmit = function () {
                    this.submitted = true;
                    this._userService.postUser(this.model);
                };
                UserFormComponent.prototype.ngOnInit = function () {
                    this._userService.getUsers();
                };
                UserFormComponent.prototype.newUser = function () {
                    var _this = this;
                    this.model = new user_1.User("");
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                UserFormComponent = __decorate([
                    core_1.Component({
                        selector: 'user-form',
                        templateUrl: 'templates/user-form.component.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            user_service_1.userService
                        ]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.userService])
                ], UserFormComponent);
                return UserFormComponent;
            })();
            exports_1("UserFormComponent", UserFormComponent);
        }
    }
});
//# sourceMappingURL=user.form.component.js.map