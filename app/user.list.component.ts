import {Component} from 'angular2/core';
import {userService} from './service/user.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {User} from './service/models/user';

@Component({
    selector: 'user-list',
    template: `
	<ul>
	    <li *ngFor="#user of users">
	      {{ user.name }}
	    </li>
    </ul>
	`,
	providers: [
		HTTP_PROVIDERS,
		userService
	]
})

export class UserListComponent{ 
	constructor (private _userService: userService) {
		this._userService.users$.subscribe(updatedUsers => { this.users = updatedUsers });
	}

	users: Array<User>;

	ngOnInit() {
		this._userService.getUsers();
	}
};