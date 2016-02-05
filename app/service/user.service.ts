import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User}           from './models/user';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class userService {
  constructor(private http: Http) { 
    
  }

  private _usersUrl = 'api/users';
  private fetch = new XMLHttpRequest();

  getUsers() {
    return this.http.get(this._usersUrl)
                   .map(res => res.json())
                   .catch(this.handleError);
  }

  postUser(user) {
    var params = "name=" + user.name;
    this.fetch.open("POST", this._usersUrl, true);
    this.fetch.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.fetch.setRequestHeader("Connection", "close");
    this.fetch.send(params);

    // return this.http.post('/api/users/', JSON.stringify(id))
    // .map(res => res.json())
    // .catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}