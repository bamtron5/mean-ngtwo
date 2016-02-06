System.register(['angular2/core', './service/user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1;
    var UserListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UserListComponent = (function () {
                function UserListComponent(_userService) {
                    var _this = this;
                    this._userService = _userService;
                    this._userService.users$.subscribe(function (updatedUsers) { _this.users = updatedUsers; });
                    this._userService.editForm$.subscribe(function (updatedEdit) { _this.editForm = updatedEdit; });
                }
                UserListComponent.prototype.ngOnInit = function () {
                    this._userService.getUsers();
                };
                UserListComponent.prototype.deleteUser = function (user) {
                    if (confirm('Are you sure you want to delete ' + user.name)) {
                        this._userService.deleteUser(user[0]);
                    }
                };
                UserListComponent.prototype.editUserForm = function (user) {
                    this._userService._userObserver.next(user[0]);
                    this._userService._editObserver.next(true);
                    this._userService._submittedObserver.next(false);
                };
                UserListComponent = __decorate([
                    core_1.Component({
                        selector: 'user-list',
                        template: "\n\t<ul>\n\t\t<li *ngFor=\"#user of users\">\n\t\t{{ user.name }} \n\t\t<button (click)=\"editUserForm([(user)])\">Edit</button>\n\t\t<button (click)=\"deleteUser([(user)])\">Delete</button>\n\t\t</li>\n\t</ul>\n\t"
                    }), 
                    __metadata('design:paramtypes', [user_service_1.userService])
                ], UserListComponent);
                return UserListComponent;
            })();
            exports_1("UserListComponent", UserListComponent);
            ;
        }
    }
});
//# sourceMappingURL=user.list.component.js.map