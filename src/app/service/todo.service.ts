import {Injectable}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Todo}           from './models/todo'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class todoService {
  todos$: Observable<Array<Todo>>;
  _todosObserver: any;

  private _dataStore: {
    todos: Array<Todo>
  }

  todo$: Observable<Todo>;
  _todoObserver: any;

  editForm$: Observable<Boolean>;
  _editObserver: any;

  submitted$: Observable<Boolean>;
  _submittedObserver: any;

  constructor(private http: Http) {
    this.todos$ = new Observable(observer => this._todosObserver = observer).share();
    this.todo$ = new Observable(observer => this._todoObserver = observer).share();
    this.editForm$ = new Observable(observer => this._editObserver = observer).share();
    this.submitted$ = new Observable(observer => this._submittedObserver = observer).share();
    this._dataStore = { todos: [] };
  }

  private _todosUrl = 'api/todos/';

  getTodos() {
    this.http.get(this._todosUrl)
      .map(res => res.json())
      .subscribe(data => {
        this._dataStore.todos = data;
        this._todosObserver.next(this._dataStore.todos);
      }, error => this.handleError(error));
  }

  getTodo(todo) {
    var query = todo._id;
    this.http.get(this._todosUrl + query)
      .map(res => res.json())
      .subscribe(data => {
        this._todoObserver.next(data);
      }, error => this.handleError(error));
  }

  postTodo(todo) {
    var strTodo = JSON.stringify(todo);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this._todosUrl, strTodo, {headers:headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this._dataStore.todos.unshift(data);
          this._todoObserver.next(data);
          this._todosObserver.next(this._dataStore.todos);
        }, error => this.handleError(error)
      );
  }

  editTodo(todo) {
    var query = todo._id + "?name=" + todo.name;
    this.http.put(this._todosUrl + query, JSON.stringify(todo))
      .map(res => res.json())
      .subscribe(
      data => {
        this._todoObserver.next(data);
        this.getTodos();
      }, error => this.handleError(error)
      );
  }

  deleteTodo(todo) {
    var query = todo._id;
    this.http.delete(this._todosUrl + query, {})
      .map(res => res.json())
      .subscribe(
      data => {
        this.getTodos();
      }, error => this.handleError(error)
      );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}