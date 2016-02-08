import {Injectable}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {User}           from './models/user'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class userService {
  users$: Observable<Array<User>>;
  _usersObserver: any;

  private _dataStore: {
    users: Array<User>
  }

  user$: Observable<User>;
  _userObserver: any;

  editForm$: Observable<Boolean>;
  _editObserver: any;

  submitted$: Observable<Boolean>;
  _submittedObserver: any;

  constructor(private http: Http) { 
    this.users$ = new Observable(observer => this._usersObserver = observer).share();
    this.user$ = new Observable(observer => this._userObserver = observer).share();
    this.editForm$ = new Observable(observer => this._editObserver = observer).share();
    this.submitted$ = new Observable(observer => this._submittedObserver = observer).share();
    this._dataStore = { users: [] };
  }

  private _usersUrl = 'api/users/';

  getUsers() {
     this.http.get(this._usersUrl)
      .map(res => res.json())
      .subscribe(data => {
        this._dataStore.users = data;
        this._usersObserver.next(this._dataStore.users);
      }, error => this.handleError(error));
  }

  getUser(user){
      var query = user._id;
      this.http.get(this._usersUrl + query)
        .map(res => res.json())
        .subscribe(data => {
          this._userObserver.next(data);
        }, error => this.handleError(error));
  }

  postUser(user) {
    this.http.post(this._usersUrl, JSON.stringify(user))
      .map(res => res.json())
      .subscribe(
          data => {
        this._dataStore.users.unshift(data);
        this._userObserver.next(data);
        this._usersObserver.next(this._dataStore.users);
          }, error => this.handleError(error)
      );
  }

  editUser(user){
    var query = user._id + "?name=" + user.name;
    this.http.put(this._usersUrl + query, JSON.stringify(user))
      .map(res => res.json())
      .subscribe(
        data => {
          this._userObserver.next(data);
          this.getUsers();
        }, error => this.handleError(error)
      );
  }

  login(user){
    var strUser = JSON.stringify(user);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/login', strUser, {headers: headers})
      .map(res => res.json())
      .subscribe(
        error => this.handleError(error)
      );
  }

  deleteUser(user){
    var query = user._id;
    this.http.delete(this._usersUrl + query, {})
      .map(res => res.json())
      .subscribe(
        data => {
          this.getUsers();
        }, error => this.handleError(error)
      );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}