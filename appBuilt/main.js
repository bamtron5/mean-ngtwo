System.register(['angular2/platform/browser', './app.component', './user.form.component', 'rxjs/Rx'], function(exports_1) {
    var browser_1, app_component_1, user_form_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (user_form_component_1_1) {
                user_form_component_1 = user_form_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
            // bootstrap(HeroFormComponent);
            browser_1.bootstrap(user_form_component_1.UserFormComponent);
        }
    }
});
//# sourceMappingURL=main.js.map