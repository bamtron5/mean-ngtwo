import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}           from './models/user';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class userService {
  users$: Observable<Array<User>>;
  _userObserver: any;
  private _dataStore: {
    users: Array<User>
  } 

  constructor(private http: Http) { 
    this.users$ = new Observable(observer => this._userObserver = observer).share();
    this._dataStore = { users: [] };
  }

  private _usersUrl = 'api/users/';

  getUsers() {
     return this.http.get(this._usersUrl)
      .map(res => res.json())
      .subscribe(data => {
        this._dataStore.users = data;
        this._userObserver.next(this._dataStore.users);
      }, error => this.handleError(error));
  }

  postUser(user) {
    var query = "?name=" + user.name;
    return this.http.post(this._usersUrl + query, JSON.stringify(user))
      .map(res => res.json())
      .subscribe(
        data => {
          this._dataStore.users.push(data);
          this._userObserver.next(this._dataStore.users);
        }, error => this.handleError(error)
      );
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}