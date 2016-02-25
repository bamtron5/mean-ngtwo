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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var authService = (function () {
    function authService(http) {
        var _this = this;
        this.http = http;
        this._authUrl = 'api/auth/';
        this.auth$ = new Observable_1.Observable(function (observer) { return _this._authObserver = observer; }).share();
        this.userName$ = new Observable_1.Observable(function (observer) { return _this._userNameObserver = observer; }).share();
    }
    authService.prototype.getAuth = function () {
        var _this = this;
        this.http.get(this._authUrl)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._authObserver.next(data.auth);
            _this._userNameObserver.next(data.name);
        }, function (error) { return _this.handleError(error); });
    };
    authService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error || 'Server error');
    };
    authService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], authService);
    return authService;
})();
exports.authService = authService;
//# sourceMappingURL=auth.service.js.map