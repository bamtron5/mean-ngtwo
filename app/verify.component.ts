import {Component} from 'angular2/core'
import {userService} from './service/user.service'
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'verify',
    directives: [ROUTER_DIRECTIVES],
    template: `
		<h3>Your Verification</h3>
        <div *ngIf="signup">
            <p>Your account is now active.  Please login.</p>
            <button><a href="/login">Login</a></button>
        </div>
	`,
    providers: [
        HTTP_PROVIDERS,
        userService
    ]
})

export class VerificationComponent {
    constructor(public _userService: userService, params: RouteParams){
        this.token = params.get("token");
        this._userService.verification$.subscribe(updatedVerification => { this.signup = updatedVerification});
    }

    token: string;
    signup: Boolean = false;

    ngOnInit() {
        this._userService.verify(this.token);
    }
}
