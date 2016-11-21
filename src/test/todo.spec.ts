///<reference path="../../typings/browser/ambient/jasmine/jasmine.d.ts" />
import {Todo} from '../app/service/models/todo';

describe('Todo Model', () => {
  it('has a setter property for name', () => {
  let todo = new Todo();
  todo.name = "NewTodo1";
  expect(todo.name).toEqual('NewTodo1');
  })
});
