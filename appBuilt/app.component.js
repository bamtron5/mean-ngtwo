System.register(['angular2/platform/browser', 'angular2/core', './service/todo.service', './todo.form.component', 'angular2/http', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, todo_service_1, todo_form_component_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_service_1_1) {
                todo_service_1 = todo_service_1_1;
            },
            function (todo_form_component_1_1) {
                todo_form_component_1 = todo_form_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    //operators for es6 ... wtf
                    core_1.Component({
                        selector: 'app',
                        directives: [todo_form_component_1.TodoFormComponent],
                        template: "\n\t\t<todo-form></todo-form>\n\t",
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            todo_service_1.todoService
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            ;
            browser_1.bootstrap(AppComponent, [todo_service_1.todoService])
                .catch(function (err) { return console.log(err); });
        }
    }
});
//# sourceMappingURL=app.component.js.map