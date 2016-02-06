import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import { User }    from './service/models/user';
import {userService} from './service/user.service';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
  selector: 'user-form',
  templateUrl: 'templates/user-form.component.html',
  providers: [
    HTTP_PROVIDERS,
    userService
  ]
})

export class UserFormComponent {
  constructor (private _userService: userService) {
    this._userService.users$.subscribe(updatedUsers => { this.users = updatedUsers });
  }

  users: Array<User>;
  
  model = new User("");

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this._userService.postUser(this.model);
  }

  ngOnInit() {
    this._userService.getUsers();
  }

  active = true;

  newUser() {
    this.model = new User("");
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}