import {Injectable, EventEmitter}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class claimService {

  title$: Observable<string>;
  _titleObserver: any;

  tags$: Observable<Array<string>>;
  _tagsObserver: any;

  description$: Observable<string>;
  _descriptionObserver: any;

  constructor(private http: Http) {
    this.title$ = new Observable(observer => this._titleObserver = observer).share();
    this.tags$ = new Observable(observer => this._tagsObserver = observer).share();
    this.description$ = new Observable(observer => this._descriptionObserver = observer).share();
  }

  private _claimUrl = 'api/claim/';

  getClaim(claim) {
    return new Promise((resolve, reject) => {
      this.http.get(this._claimUrl + claim)
        .map(res => res.json())
        .subscribe(data => {
          this.hasOwnProperty('_titleObserver') ? this._titleObserver.next(data.title) : null;
          this.hasOwnProperty('_tagsObserver') ? this._tagsObserver.next(data.tags) : null;
          this.hasOwnProperty('_descriptionObserver') ? this._descriptionObserver.next(data.description) : null;
          resolve();
        }, error => reject(this.handleError(error) ));
    });
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}