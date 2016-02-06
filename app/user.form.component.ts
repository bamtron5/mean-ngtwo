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
  constructor (public _userService: userService) {
    this._userService.user$.subscribe(updatedUser => { this.model = updatedUser });
  }

  model = new User("");
  submitted = false;
  active = true;

  onSubmit() { 
    return Promise.all([this._userService.postUser(this.model)])
      .then(() => this.submitted = true)
      .catch(function(err){
        console.log(err);
      });
  }

  newUser() {
    this.model = new User("");
    this.active = false;
    this.submitted = false;
    setTimeout(() => this.active = true, 0);
  }
}