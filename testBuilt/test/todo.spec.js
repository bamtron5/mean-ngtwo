var todo_1 = require('../service/models/todo');
describe('Todo Model', function () {
    it('has a setter property for name', function () {
        var todo = new todo_1.Todo();
        todo.name = "NewTodo1";
        expect(todo.name).toEqual('NewTodo1');
    });
});
//# sourceMappingURL=todo.spec.js.map