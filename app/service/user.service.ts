import {Injectable}     from 'angular2/core'
import {Http, Response, Headers} from 'angular2/http'
import {User}           from './models/user'
import {Captcha}        from './models/captcha'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/add/operator/share'

@Injectable()
export class userService {
  users$: Observable<Array<User>>;
  _usersObserver: any;

  private _dataStore: {
    users: Array<User>
  }

  private _acceptStore:{
    accept:Array<Boolean>
  }

  user$: Observable<User>;
  _userObserver: any;

  editForm$: Observable<Boolean>;
  _editObserver: any;

  submitted$: Observable<Boolean>;
  _submittedObserver: any;

  acceptedLogin$: Observable<Boolean>;
  _acceptedObserver: any;

  signUpMessage$: Observable<String>;
  _signUpMessageObserver: any;

  loginMessage$: Observable<String>;
  _loginMessageObserver: any;

  verification$: Observable<Boolean>;
  _verificationObserver: any;

  captchaResponse$: Observable<Captcha>;
  _captchaResponseObserver: any;

  profileName$: Observable<string>;
  _profileNameObserver: any;

  activeDate$: Observable<string>;
  _activeDateObserver: any;

  constructor(private http: Http) { 
    this.users$ = new Observable(observer => this._usersObserver = observer).share();
    this.user$ = new Observable(observer => this._userObserver = observer).share();
    this.editForm$ = new Observable(observer => this._editObserver = observer).share();
    this.submitted$ = new Observable(observer => this._submittedObserver = observer).share();
    this.acceptedLogin$ = new Observable(observer => this._acceptedObserver = observer).share();
    this.signUpMessage$ = new Observable(observer => this._signUpMessageObserver = observer).share();
    this.loginMessage$ = new Observable(observer => this._loginMessageObserver = observer).share();;
    this.verification$ = new Observable(observer => this._verificationObserver = observer).share();
    this.captchaResponse$ = new Observable(observer => this._captchaResponseObserver = observer).share();
    this.profileName$ = new Observable(observer => this._profileNameObserver = observer).share();
    this.activeDate$ = new Observable(observer => this._activeDateObserver = observer).share();
    this._dataStore = { users: [] };
    this._acceptStore = { accept: [] };
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

  getUser(user:string){
      return new Promise((resolve, reject) => {

        this.http.get(this._usersUrl + user)
          .map(res => res.json())
          .subscribe(data => {
            data.hasOwnProperty('activeDate') ? this._activeDateObserver.next(data.activeDate) : console.log('whyyyy');
            resolve();
          }, error => reject(error));
      })
  }

  getProfile(user: string){
    return new Promise((resolve, reject) => {
    this.http.get('/api/profile/' + user)
      .map(res => res.json())
      .subscribe(data => {
        this.hasOwnProperty('_profileNameObserver') ? this._profileNameObserver.next(data.name) : null;
        resolve();
      }, error => reject(error))
    })
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

  login(user, redirect){
    var redirect = redirect ? redirect : '/profile';
    var strUser = JSON.stringify(user);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/login', strUser, { headers: headers })
    .map(res => res.json())
    .subscribe(
        data => { 
          this._acceptedObserver.next(data.login);
          this._loginMessageObserver.next(data.message);
          data.login === true ? location.href = redirect : null;
        },
        error => { this._acceptedObserver.next(false);}
    )
  }

  verifyCaptcha(captcha: Object, cb: Function) {
    console.log(captcha);
    var captchaJson = JSON.stringify(captcha);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/signup/captcha', captchaJson, { headers: headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this._captchaResponseObserver.next(data);
          cb();
        }, error => this.handleError(error)
      )
  }

  signup(user, redirect) {
    var redirect = redirect ? redirect : '/profile';
    var strUser = JSON.stringify(user);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/signup', strUser, { headers: headers })
    .map(res => res.json())
    .subscribe(
       data => { 
          this._acceptedObserver.next(data.signup);
          this._signUpMessageObserver.next(data.message);
          if(data.signup){
            location.href = redirect;
          }
       },
       error => this._acceptedObserver.next(false)
    );
  }

  verify(token){
    return this.http.get('/api/verify/' +  token)
      .map(res => res.json())
      .subscribe(
      data => {
        this._verificationObserver.next(data.verify);
        console.log(data.verify);
      },
      error => this.handleError(error)
    );
  }

  logout(){
     return this.http.post('/api/logout', JSON.stringify({logout:true}))
      .map(res => res.json())
      .subscribe(
       data => { 
         location.href = '/'; 
       }
      )
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
    return Observable.throw(error || 'Server error');
  }
}