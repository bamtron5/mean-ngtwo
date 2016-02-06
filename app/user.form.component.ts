import {Component} from 'angular2/core'
import {NgForm}    from 'angular2/common'
import { User }    from './service/models/user'
import {userService} from './service/user.service'
import {UserListComponent} from './user.list.component'


@Component({
  selector: 'user-form',
  directives: [UserListComponent],
  templateUrl: 'templates/user-form.component.html'
})

export class UserFormComponent {
  constructor (public _userService: userService) {}

  model = new User("");

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this._userService.postUser(this.model);
  }

  active = true;

  newUser() {
    this.model = new User("");
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}