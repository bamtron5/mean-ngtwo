import {Component} from 'angular2/core'
import {userService} from './service/user.service'
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'verify',
    directives: [ROUTER_DIRECTIVES],
    template: `
		verification page
	`,
    providers: [
        HTTP_PROVIDERS,
        userService
    ]
})

export class VerificationComponent {
    constructor(public _userService: userService, params: RouteParams){
        this.token = params.get("token")
    }

    token: string;

    ngOnInit() {
        this._userService.verify(this.token);
    }
}
