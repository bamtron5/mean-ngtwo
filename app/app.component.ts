//Core include
import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

//Service
import {todoService} from './service/todo.service';
import {authService} from './service/auth.service'

//Components
import {TodoFormComponent} from './todo.form.component'
import {ProfileComponent} from './profile.component'
import {LoginFormComponent} from './login.form.component'


@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `
		<router-outlet></router-outlet>
	`,
	providers: [
		HTTP_PROVIDERS,
		authService,
		todoService,
		ROUTER_PROVIDERS
	]
})

@RouteConfig([
	{path: '/', name: 'TodoFormComponent', component: TodoFormComponent},
	{path: '/login', name:'LoginFormComponent', component: LoginFormComponent},
	{path: '/profile', name:'ProfileComponent', component: ProfileComponent}
])

export class AppComponent{};

bootstrap(AppComponent, [todoService, authService, ROUTER_PROVIDERS])
	.catch(err => console.log(err));