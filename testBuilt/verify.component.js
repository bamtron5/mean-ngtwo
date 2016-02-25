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
var user_service_1 = require('./service/user.service');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
require('rxjs/Rx'); //operators for es6 ... wtf
var VerificationComponent = (function () {
    function VerificationComponent(_userService, params) {
        var _this = this;
        this._userService = _userService;
        this.signup = false;
        this.token = params.get("token");
        this._userService.verification$.subscribe(function (updatedVerification) { _this.signup = updatedVerification; });
    }
    VerificationComponent.prototype.ngOnInit = function () {
        this._userService.verify(this.token);
    };
    VerificationComponent = __decorate([
        //operators for es6 ... wtf
        core_1.Component({
            selector: 'verify',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "\n        <div ngClass=\"container\">\n    \t\t<h3>Your Verification</h3>\n            <div *ngIf=\"signup\">\n                <p>Your account is now active.  Please login.</p>\n                <button ngClass=\"btn btn-primary\"><a href=\"/login\">Login</a></button>\n            </div>\n        </div>\n\t",
            providers: [
                http_1.HTTP_PROVIDERS,
                user_service_1.userService
            ]
        }), 
        __metadata('design:paramtypes', [user_service_1.userService, router_1.RouteParams])
    ], VerificationComponent);
    return VerificationComponent;
})();
exports.VerificationComponent = VerificationComponent;
//# sourceMappingURL=verify.component.js.map