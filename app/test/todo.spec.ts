import {Todo} from '../service/models/todo';

describe('Todo', () => {
	it('has a setter property for name', () => {
		let todo = new Todo();
		todo.name = "NewTodo1";
		expect(todo.name).toEqual('NewTodo1');
	})
}); 