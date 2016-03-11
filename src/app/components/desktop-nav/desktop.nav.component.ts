import {bootstrap} from 'angular2/platform/browser'
import {Component, EventEmitter} from 'angular2/core'
import {NgForm}    from 'angular2/common'
import {userService} from '../../service/user.service'
import {authService} from '../../service/auth.service'
import {Auth} from '../../service/models/auth'
import {HTTP_PROVIDERS} from 'angular2/http'
import {Observable}     from 'rxjs/Observable'
import 'rxjs/Rx' //operators for es6 ... wtf 

@Component({
    selector: 'desktop-navigation',
    templateUrl: 'templates/desktop-nav.html',
	providers: [
		HTTP_PROVIDERS,
		userService,
		authService
	]
})

export class DesktopNavComponent{
	constructor(public _authService: authService, public _userService: userService){
		this._authService.auth$.subscribe(updatedAuth => { this.isAuth = updatedAuth });
		this._authService.authName$.subscribe(updatedAuthName => { this.authName = updatedAuthName });
	}

	isAuth: boolean;
	authName: string;
	location: Object;

	ngOnInit(){
		this.location = window['location'];
		this._authService.getAuth();
	}

	logout(){
		if(confirm("Do you want to logout?")){
			this._userService.logout();
		}
	}
}