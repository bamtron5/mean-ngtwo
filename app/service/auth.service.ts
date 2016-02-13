import {Injectable}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class authService {
  auth$: Observable<Boolean>;
  _authObserver: any;

  userName$: Observable<String>;
  _userNameObserver: any;

  constructor(private http: Http) {
    this.auth$ = new Observable(observer => this._authObserver = observer).share();
    this.userName$ = new Observable(observer => this._userNameObserver = observer).share();
  }

  private _authUrl = 'api/auth/';

  getAuth() {
    this.http.get(this._authUrl)
      .map(res => res.json())
      .subscribe(data => {
        this._authObserver.next(data.auth);
        data.name ? this._userNameObserver.next(data.name) : null;
      }, error => this.handleError(error));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}