import {Component} from 'angular2/core'
import {userService} from './service/user.service'
import {User} from './service/models/user'

@Component({
	selector: 'user-list',
	template: `
	<ul>
		<li *ngFor="#user of users">
		{{ user.name }} 
		<button (click)="editUserForm([(user)])">Edit</button>
		<button (click)="deleteUser([(user)])">Delete</button>
		</li>
	</ul>
	`
})

export class UserListComponent{ 
	constructor (private _userService: userService) {
		this._userService.users$.subscribe(updatedUsers => { this.users = updatedUsers });
		this._userService.editForm$.subscribe(updatedEdit => { this.editForm = updatedEdit });
	}

	users: Array<User>;
	editForm: Boolean;

	ngOnInit() {
		this._userService.getUsers();
	}

	deleteUser(user){
		if(confirm('Are you sure you want to delete ' + user.name)){
			this._userService.deleteUser(user[0]);
		}
	}

	editUserForm(user){
		this._userService._userObserver.next(user[0]);
		this._userService._editObserver.next(true);
		this._userService._submittedObserver.next(false);
	}
};