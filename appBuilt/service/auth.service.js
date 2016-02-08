System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/share'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var authService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            authService = (function () {
                function authService(http) {
                    var _this = this;
                    this.http = http;
                    this._authUrl = 'api/auth/';
                    this.auth$ = new Observable_1.Observable(function (observer) { return _this._authObserver = observer; }).share();
                }
                authService.prototype.getAuth = function () {
                    var _this = this;
                    this.http.get(this._authUrl)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this._authObserver.next(data.auth);
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
            exports_1("authService", authService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map