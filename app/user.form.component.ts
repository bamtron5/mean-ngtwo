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
  constructor (private _userService: userService) {}
  
  model = new User("");

  submitted = false;

  onSubmit() { 
    this.submitted = true;
    this._userService.postUser(this.model);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  active = true;

  newUser() {
    this.model = new User("");
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
 

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: NgForm) {

    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }
}