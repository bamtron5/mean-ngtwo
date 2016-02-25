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
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var todoService = (function () {
    function todoService(http) {
        var _this = this;
        this.http = http;
        this._todosUrl = 'api/todos/';
        this.todos$ = new Observable_1.Observable(function (observer) { return _this._todosObserver = observer; }).share();
        this.todo$ = new Observable_1.Observable(function (observer) { return _this._todoObserver = observer; }).share();
        this.editForm$ = new Observable_1.Observable(function (observer) { return _this._editObserver = observer; }).share();
        this.submitted$ = new Observable_1.Observable(function (observer) { return _this._submittedObserver = observer; }).share();
        this._dataStore = { todos: [] };
    }
    todoService.prototype.getTodos = function () {
        var _this = this;
        this.http.get(this._todosUrl)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._dataStore.todos = data;
            _this._todosObserver.next(_this._dataStore.todos);
        }, function (error) { return _this.handleError(error); });
    };
    todoService.prototype.getTodo = function (todo) {
        var _this = this;
        var query = todo._id;
        this.http.get(this._todosUrl + query)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._todoObserver.next(data);
        }, function (error) { return _this.handleError(error); });
    };
    todoService.prototype.postTodo = function (todo) {
        var _this = this;
        var strTodo = JSON.stringify(todo);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(this._todosUrl, strTodo, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._dataStore.todos.unshift(data);
            _this._todoObserver.next(data);
            _this._todosObserver.next(_this._dataStore.todos);
        }, function (error) { return _this.handleError(error); });
    };
    todoService.prototype.editTodo = function (todo) {
        var _this = this;
        var query = todo._id + "?name=" + todo.name;
        this.http.put(this._todosUrl + query, JSON.stringify(todo))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this._todoObserver.next(data);
            _this.getTodos();
        }, function (error) { return _this.handleError(error); });
    };
    todoService.prototype.deleteTodo = function (todo) {
        var _this = this;
        var query = todo._id;
        this.http.delete(this._todosUrl + query, {})
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.getTodos();
        }, function (error) { return _this.handleError(error); });
    };
    todoService.prototype.handleError = function (error) {
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    todoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], todoService);
    return todoService;
})();
exports.todoService = todoService;
//# sourceMappingURL=todo.service.js.map