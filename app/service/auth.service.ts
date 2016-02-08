import {Injectable}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class authService {
  auth$: Observable<Boolean>;
  _authObserver: any;

  constructor(private http: Http) {
    this.auth$ = new Observable(observer => this._authObserver = observer).share();
  }

  private _authUrl = 'api/auth/';

  getAuth() {
    this.http.get(this._authUrl)
      .map(res => res.json())
      .subscribe(data => {
        this._authObserver.next(data.auth);
      }, error => this.handleError(error));
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}