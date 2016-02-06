System.register(['angular2/platform/browser', './app.component', './service/user.service', 'rxjs/Rx'], function(exports_1) {
    var browser_1, app_component_1, user_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [user_service_1.userService]);
        }
    }
});
//# sourceMappingURL=main.js.map