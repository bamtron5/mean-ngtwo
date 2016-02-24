import {Component} from 'angular2/core'
import 'rxjs/Rx' //operators for es6 ... wtf
import {TodoFormComponent} from './todo.form.component'

@Component({
    selector: 'profile',
    directives: [TodoFormComponent],
    template: `
		<todo-form></todo-form>
	`
})

export class ProfileComponent{};
