import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}           from './models/user';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class userService {
  constructor(private http: Http) { 
    
  }

  private _usersUrl = 'api/users/';

  getUsers() {
    return this.http.get(this._usersUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  postUser(user) {
    var query = "?name=" + user.name;
    return this.http.post(this._usersUrl + query, JSON.stringify(user))
      .map(res => res.json())
      .subscribe(
        err => this.handleError(err),
        () => this.getUsers()
      );
      
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}