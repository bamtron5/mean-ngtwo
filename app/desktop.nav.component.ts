import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {NgForm}    from 'angular2/common'
// import { User }    from './service/models/user'
import {userService} from './service/user.service'
import {authService} from './service/auth.service'
import {HTTP_PROVIDERS} from 'angular2/http'
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
		this._authService.userName$.subscribe(updatedUser => { this.curUser = updatedUser });
	}

	isAuth:Boolean;
	curUser: String;
	fake: Object;

	ngOnInit(){
		this._authService.getAuth();
	}

	logout(){
		if(confirm("Do you want to logout?")){
			this._userService.logout();
		}
	}
}

bootstrap(DesktopNavComponent, [authService, userService])
	.catch(err => console.log(err));