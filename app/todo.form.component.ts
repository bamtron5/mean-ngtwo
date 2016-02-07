import {Component} from 'angular2/core'
import {NgForm}    from 'angular2/common'
import { Todo }    from './service/models/todo'
import {todoService} from './service/todo.service'
import {TodoListComponent} from './todo.list.component'

@Component({
  selector: 'todo-form',
  directives: [TodoListComponent],
  templateUrl: 'templates/todo-form.component.html'
})

export class TodoFormComponent {
  constructor (public _todoService: todoService) {
    this._todoService.todo$.subscribe(updatedtodo => { this.model = updatedtodo });
    this._todoService.editForm$.subscribe(updatedEdit => { this.editForm = updatedEdit });
    this._todoService.submitted$.subscribe(updatedSubmission => { this.submitted = updatedSubmission });
  }

  model = new Todo();
  submitted: Boolean;
  active = true;
  editForm: Boolean;

  ngOnInit(){
    this._todoService._submittedObserver.next(false);
  }

  onSubmit() { 
    var todoMethod;
    if(!this.editForm){
      todoMethod = this._todoService.postTodo(this.model);
    } else {
      todoMethod = this._todoService.editTodo(this.model);
    }

    return Promise.all([todoMethod])
      .then(() => this._todoService._submittedObserver.next(true))
      .catch(function(err){
          console.log(err);
        });
  }

  newTodo() {
    this.model = new Todo();
    this.active = false;
    this._todoService._submittedObserver.next(false);
    this._todoService._editObserver.next(false);
    setTimeout(() => this.active = true, 0);
  }

  editTodo(){
    this._todoService._editObserver.next(true);
    this._todoService._submittedObserver.next(false);
  }
}
