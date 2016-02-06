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
    var userService;
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
            userService = (function () {
                function userService(http) {
                    var _this = this;
                    this.http = http;
                    this._usersUrl = 'api/users/';
                    this.users$ = new Observable_1.Observable(function (observer) { return _this._usersObserver = observer; }).share();
                    this.user$ = new Observable_1.Observable(function (observer) { return _this._userObserver = observer; }).share();
                    this._dataStore = { users: [] };
                }
                userService.prototype.getUsers = function () {
                    var _this = this;
                    this.http.get(this._usersUrl)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this._dataStore.users = data;
                        _this._usersObserver.next(_this._dataStore.users);
                    }, function (error) { return _this.handleError(error); });
                };
                userService.prototype.postUser = function (user) {
                    var _this = this;
                    var query = "?name=" + user.name;
                    this.http.post(this._usersUrl + query, JSON.stringify(user))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this._dataStore.users.push(data);
                        _this._userObserver.next(data);
                        _this._usersObserver.next(_this._dataStore.users);
                    }, function (error) { return _this.handleError(error); });
                };
                userService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                userService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], userService);
                return userService;
            })();
            exports_1("userService", userService);
        }
    }
});
//# sourceMappingURL=user.service.js.map