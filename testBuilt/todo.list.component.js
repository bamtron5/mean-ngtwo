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
var todo_service_1 = require('./service/todo.service');
var TodoListComponent = (function () {
    function TodoListComponent(_todoService) {
        var _this = this;
        this._todoService = _todoService;
        this._todoService.todos$.subscribe(function (updatedTodos) { _this.todos = updatedTodos; });
        this._todoService.editForm$.subscribe(function (updatedEdit) { _this.editForm = updatedEdit; });
    }
    TodoListComponent.prototype.ngOnInit = function () {
        this._todoService.getTodos();
    };
    TodoListComponent.prototype.deleteTodo = function (todo) {
        if (confirm('Are you sure you want to delete ' + todo.name)) {
            this._todoService.deleteTodo(todo[0]);
        }
    };
    TodoListComponent.prototype.editTodoForm = function (todo) {
        this._todoService._todoObserver.next(todo[0]);
        this._todoService._editObserver.next(true);
        this._todoService._submittedObserver.next(false);
    };
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'todo-list',
            template: "\n\t<ul>\n\t\t<li *ngFor=\"#todo of todos\">\n\t\t{{ todo.name }} \n\t\t<button ngClass=\"btn btn-primary btn-xs\" (click)=\"editTodoForm([(todo)])\">Edit</button>\n\t\t<button ngClass=\"btn btn-primary btn-xs\" (click)=\"deleteTodo([(todo)])\">Delete</button>\n\t\t</li>\n\t</ul>\n\t"
        }), 
        __metadata('design:paramtypes', [todo_service_1.todoService])
    ], TodoListComponent);
    return TodoListComponent;
})();
exports.TodoListComponent = TodoListComponent;
;
//# sourceMappingURL=todo.list.component.js.map