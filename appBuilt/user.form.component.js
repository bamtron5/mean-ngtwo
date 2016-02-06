System.register(['angular2/core', './service/models/user', './service/user.service', './user.list.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_1, user_service_1, user_list_component_1;
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
            function (user_list_component_1_1) {
                user_list_component_1 = user_list_component_1_1;
            }],
        execute: function() {
            UserFormComponent = (function () {
                function UserFormComponent(_userService) {
                    var _this = this;
                    this._userService = _userService;
                    this.model = new user_1.User("");
                    this.active = true;
                    this._userService.user$.subscribe(function (updatedUser) { _this.model = updatedUser; });
                    this._userService.editForm$.subscribe(function (updatedEdit) { _this.editForm = updatedEdit; });
                    this._userService.submitted$.subscribe(function (updatedSubmission) { _this.submitted = updatedSubmission; });
                }
                UserFormComponent.prototype.ngOnInit = function () {
                    this._userService._submittedObserver.next(false);
                };
                UserFormComponent.prototype.onSubmit = function () {
                    var _this = this;
                    var userMethod;
                    if (!this.editForm) {
                        userMethod = this._userService.postUser(this.model);
                    }
                    else {
                        userMethod = this._userService.editUser(this.model);
                    }
                    return Promise.all([userMethod])
                        .then(function () { return _this._userService._submittedObserver.next(true); })
                        .catch(function (err) {
                        console.log(err);
                    });
                };
                UserFormComponent.prototype.newUser = function () {
                    var _this = this;
                    this.model = new user_1.User("");
                    this.active = false;
                    this._userService._submittedObserver.next(false);
                    this._userService._editObserver.next(false);
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                UserFormComponent.prototype.editUser = function () {
                    this._userService._editObserver.next(true);
                    this._userService._submittedObserver.next(false);
                };
                UserFormComponent = __decorate([
                    core_1.Component({
                        selector: 'user-form',
                        directives: [user_list_component_1.UserListComponent],
                        templateUrl: 'templates/user-form.component.html'
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