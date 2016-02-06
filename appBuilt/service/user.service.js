System.register(['angular2/core', 'angular2/http', './models/user', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, user_1, Observable_1;
    var userService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            userService = (function () {
                function userService(http) {
                    this.http = http;
                    this._usersUrl = 'api/users/';
                }
                userService.prototype.getUsers = function () {
                    return this.http.get(this._usersUrl)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                userService.prototype.postUser = function (user) {
                    var _this = this;
                    var query = "?name=" + user.name;
                    return this.http.post(this._usersUrl + query, JSON.stringify(user))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return new user_1.User(data.name); }, function (err) { return _this.handleError(err); }, function () { return _this.getUsers(); });
                };
                userService.prototype.handleError = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
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