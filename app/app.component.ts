import {bootstrap}    from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {userService} from './service/user.service';
import {UserListComponent} from './user.list.component'
import {UserFormComponent} from './user.form.component'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'app',
    directives: [UserListComponent, UserFormComponent],
    template: `
		<user-list></user-list>
		<user-form></user-form>
	`,
})

export class AppComponent{};

bootstrap(AppComponent, [userService])
	.catch(err => console.log(err));

