import {Component} from 'angular2/core'
import {todoService} from './service/todo.service'
import {Todo} from './service/models/todo'

@Component({
	selector: 'todo-list',
	template: `
	<ul>
		<li *ngFor="#todo of todos">
		{{ todo.name }} 
		<button (click)="editTodoForm([(todo)])">Edit</button>
		<button (click)="deleteTodo([(todo)])">Delete</button>
		</li>
	</ul>
	`
})

export class TodoListComponent{ 
	constructor (private _todoService: todoService) {
		this._todoService.todos$.subscribe(updatedTodos => { this.todos = updatedTodos });
		this._todoService.editForm$.subscribe(updatedEdit => { this.editForm = updatedEdit });
	}

	todos: Array<Todo>;
	editForm: Boolean;

	ngOnInit() {
		this._todoService.getTodos();
	}

	deleteTodo(todo){
		if(confirm('Are you sure you want to delete ' + todo.name)){
			this._todoService.deleteTodo(todo[0]);
		}
	}

	editTodoForm(todo){
		this._todoService._todoObserver.next(todo[0]);
		this._todoService._editObserver.next(true);
		this._todoService._submittedObserver.next(false);
	}
};