var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var user_service_1 = require('./service/user.service');
var auth_service_1 = require('./service/auth.service');
var http_1 = require('angular2/http');
require('rxjs/Rx'); //operators for es6 ... wtf 
var DesktopNavComponent = (function () {
    function DesktopNavComponent(_authService, _userService) {
        var _this = this;
        this._authService = _authService;
        this._userService = _userService;
        this._authService.auth$.subscribe(function (updatedAuth) { _this.isAuth = updatedAuth; });
        this._authService.userName$.subscribe(function (updatedUser) { _this.curUser = updatedUser; });
    }
    DesktopNavComponent.prototype.ngOnInit = function () {
        this._authService.getAuth();
    };
    DesktopNavComponent.prototype.logout = function () {
        if (confirm("Do you want to logout?")) {
            this._userService.logout();
        }
    };
    DesktopNavComponent = __decorate([
        //operators for es6 ... wtf 
        core_1.Component({
            selector: 'desktop-navigation',
            templateUrl: 'templates/desktop-nav.html',
            providers: [
                http_1.HTTP_PROVIDERS,
                user_service_1.userService,
                auth_service_1.authService
            ]
        }), 
        __metadata('design:paramtypes', [auth_service_1.authService, user_service_1.userService])
    ], DesktopNavComponent);
    return DesktopNavComponent;
})();
exports.DesktopNavComponent = DesktopNavComponent;
browser_1.bootstrap(DesktopNavComponent, [auth_service_1.authService, user_service_1.userService])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=desktop.nav.component.js.map