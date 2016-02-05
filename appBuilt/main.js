System.register(['angular2/platform/browser', './app.component', './hero-form.component', 'rxjs/Rx'], function(exports_1) {
    var browser_1, app_component_1, hero_form_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (hero_form_component_1_1) {
                hero_form_component_1 = hero_form_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent);
            browser_1.bootstrap(hero_form_component_1.HeroFormComponent);
        }
    }
});
//# sourceMappingURL=main.js.map