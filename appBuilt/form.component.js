System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var DemoFormSku;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DemoFormSku = (function () {
                function DemoFormSku() {
                }
                DemoFormSku.prototype.onSubmit = function (data) {
                    this.data = JSON.stringify(data, null, 2);
                };
                DemoFormSku = __decorate([
                    core_1.Component({
                        selector: 'demo'
                    }),
                    core_1.View({
                        template: "\n    <div>\n      <h2>NgForm demo</h2>\n      <p>Submit the form to see the data object Angular builds</p>\n      <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.value)\">\n        <h3>Control group: credentials</h3>\n        <div ng-control-group=\"credentials\">\n          <p>Login: <input type=\"text\" ng-control=\"login\"></p>\n          <p>Password: <input type=\"password\" ng-control=\"password\"></p>\n        </div>\n        <h3>Control group: person</h3>\n        <div ng-control-group=\"person\">\n          <p>First name: <input type=\"text\" ng-control=\"firstName\"></p>\n          <p>Last name: <input type=\"text\" ng-control=\"lastName\"></p>\n        </div>\n        <button type=\"submit\">Submit Form</button>\n      </form>\n      <p>Form data submitted:</p>\n      <pre>{{data}}</pre>\n    </div>\n  ",
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DemoFormSku);
                return DemoFormSku;
            })();
            exports_1("DemoFormSku", DemoFormSku);
        }
    }
});
//# sourceMappingURL=form.component.js.map