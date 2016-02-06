import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {userService} from './service/user.service';
import {UserFormComponent} from './user.form.component'
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'app',
    directives: [UserFormComponent],
    template: `
		<user-form></user-form>
	`,
	providers: [
		HTTP_PROVIDERS,
		userService
	]
})

export class AppComponent{};

bootstrap(AppComponent, [userService])
	.catch(err => console.log(err));

