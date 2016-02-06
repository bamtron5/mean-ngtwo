import {Component} from 'angular2/core'
import {userService} from './service/user.service'
import {User} from './service/models/user'
import {UserFormComponent} from './user.form.component'

@Component({
	selector: 'user-list',
	template: `
	<ul>
		<li *ngFor="#user of users">
		{{ user.name }} <button (click)="editUserForm([(user)])">Edit</button>
		</li>
	</ul>
	`
})

export class UserListComponent{ 
	constructor (private _userService: userService) {
		this._userService.users$.subscribe(updatedUsers => { this.users = updatedUsers });
		this._userService.editForm$.subscribe(updatedEdit => { this.editForm = updatedEdit });
	}

	ngOnInit() {
		this._userService.getUsers();
	}

	editUserForm(user){
		this._userService._userObserver.next(user[0]);
		this._userService._editObserver.next(true);
		this._userService._submittedObserver.next(false);
	}

	users: Array<User>;
	editForm: Boolean;
};