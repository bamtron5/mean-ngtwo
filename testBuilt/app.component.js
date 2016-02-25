var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Core include
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/Rx'); //operators for es6 ... wtf
var router_1 = require('angular2/router');
//Service
var todo_service_1 = require('./service/todo.service');
var auth_service_1 = require('./service/auth.service');
var profile_component_1 = require('./profile.component');
var login_form_component_1 = require('./login.form.component');
var verify_component_1 = require('./verify.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "\n\t\t<router-outlet></router-outlet>\n\t",
            providers: [
                http_1.HTTP_PROVIDERS,
                auth_service_1.authService,
                todo_service_1.todoService,
                router_1.ROUTER_PROVIDERS
            ]
        }),
        router_1.RouteConfig([
            { path: '/login', name: 'LoginFormComponent', component: login_form_component_1.LoginFormComponent },
            { path: '/profile', name: 'ProfileComponent', component: profile_component_1.ProfileComponent },
            { path: '/verify', name: 'VerificationComponent', component: verify_component_1.VerificationComponent }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
;
browser_1.bootstrap(AppComponent, [todo_service_1.todoService, auth_service_1.authService, router_1.ROUTER_PROVIDERS])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=app.component.js.map