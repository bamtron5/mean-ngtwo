var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var todo_1 = require('./service/models/todo');
var todo_service_1 = require('./service/todo.service');
var auth_service_1 = require('./service/auth.service');
var todo_list_component_1 = require('./todo.list.component');
var TodoFormComponent = (function () {
    function TodoFormComponent(_todoService, _authService) {
        var _this = this;
        this._todoService = _todoService;
        this._authService = _authService;
        this.model = new todo_1.Todo();
        this.active = true;
        this._todoService.todo$.subscribe(function (updatedtodo) { _this.model = updatedtodo; });
        this._todoService.editForm$.subscribe(function (updatedEdit) { _this.editForm = updatedEdit; });
        this._todoService.submitted$.subscribe(function (updatedSubmission) { _this.submitted = updatedSubmission; });
        this._authService.auth$.subscribe(function (updatedAuth) { _this.auth = updatedAuth; });
    }
    TodoFormComponent.prototype.ngOnInit = function () {
        this._todoService._submittedObserver.next(false);
    };
    TodoFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var todoMethod;
        if (!this.editForm) {
            todoMethod = this._todoService.postTodo(this.model);
        }
        else {
            todoMethod = this._todoService.editTodo(this.model);
        }
        return Promise.all([todoMethod])
            .then(function () { return _this._todoService._submittedObserver.next(true); })
            .catch(function (err) {
            console.log(err);
        });
    };
    TodoFormComponent.prototype.newTodo = function () {
        var _this = this;
        this.model = new todo_1.Todo();
        this.active = false;
        this._todoService._submittedObserver.next(false);
        this._todoService._editObserver.next(false);
        setTimeout(function () { return _this.active = true; }, 0);
    };
    TodoFormComponent.prototype.editTodo = function () {
        this._todoService._editObserver.next(true);
        this._todoService._submittedObserver.next(false);
    };
    TodoFormComponent = __decorate([
        core_1.Component({
            selector: 'todo-form',
            directives: [todo_list_component_1.TodoListComponent],
            templateUrl: 'templates/todo-form.component.html'
        }), 
        __metadata('design:paramtypes', [todo_service_1.todoService, auth_service_1.authService])
    ], TodoFormComponent);
    return TodoFormComponent;
})();
exports.TodoFormComponent = TodoFormComponent;
//# sourceMappingURL=todo.form.component.js.map