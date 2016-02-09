System.register(['angular2/platform/browser', 'angular2/core', './service/auth.service', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, auth_service_1, http_1;
    var DesktopNavComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            DesktopNavComponent = (function () {
                function DesktopNavComponent(_authService) {
                    var _this = this;
                    this._authService = _authService;
                    this._authService.auth$.subscribe(function (updatedAuth) { _this.isAuth = updatedAuth; });
                    this._authService.userName$.subscribe(function (updatedUser) { _this.curUser = updatedUser; });
                }
                DesktopNavComponent.prototype.ngOnInit = function () {
                    this._authService.getAuth();
                };
                DesktopNavComponent = __decorate([
                    //operators for es6 ... wtf
                    core_1.Component({
                        selector: 'desktop-navigation',
                        templateUrl: 'templates/desktop-nav.html',
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            // userService,
                            auth_service_1.authService
                        ]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.authService])
                ], DesktopNavComponent);
                return DesktopNavComponent;
            })();
            exports_1("DesktopNavComponent", DesktopNavComponent);
            browser_1.bootstrap(DesktopNavComponent, [auth_service_1.authService])
                .catch(function (err) { return console.log(err); });
        }
    }
});
//# sourceMappingURL=desktop.nav.component.js.map