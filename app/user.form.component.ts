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
    this._userService.editForm$.subscribe(updatedEdit => { this.editForm = updatedEdit });
    this._userService.submitted$.subscribe(updatedSubmission => { this.submitted = updatedSubmission });
  }

  model = new User("");
  submitted: Boolean;
  active = true;
  editForm: Boolean;

  ngOnInit(){
    this._userService._submittedObserver.next(false);
  }

  onSubmit() { 
    var userMethod;
    if(!this.editForm){
      userMethod = this._userService.postUser(this.model);
    } else {
      userMethod = this._userService.editUser(this.model);
    }

    return Promise.all([userMethod])
      .then(() => this._userService._submittedObserver.next(true))
      .catch(function(err){
          console.log(err);
        });
  }

  newUser() {
    this.model = new User("");
    this.active = false;
    this._userService._submittedObserver.next(false);
    this._userService._editObserver.next(false);
    setTimeout(() => this.active = true, 0);
  }

  editUser(){
    this._userService._editObserver.next(true);
    this._userService._submittedObserver.next(false);
  }
}
