import {Injectable, EventEmitter}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import {User} from './models/user'
import {Auth} from './models/auth'
import 'rxjs/add/operator/share'

@Injectable()
export class authService {

  auth$: Observable<boolean>;
  _authObserver: any;

  authName$: Observable<string>;
  _authNameObserver: any;

  constructor(private http: Http) {
    this.auth$ = new Observable(observer => this._authObserver = observer).share();
    this.authName$ = new Observable(observer => this._authNameObserver = observer).share();
  }

  private _authUrl = 'api/auth/';

  getAuth() {
    return new Promise((resolve, reject) => {
      this.http.get(this._authUrl)
        .map(res => res.json())
        .subscribe(data => {
          let authCast = new Auth();
          Object.keys(data).map((val) => { authCast[val] = data[val] });
          this.hasOwnProperty('_authNameObserver') ? this._authNameObserver.next(data.name) : null;
          this.hasOwnProperty('_authObserver') ? this._authObserver.next(data.auth) : null;
          resolve();
        }, error => reject(this.handleError(error) ));
    });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}