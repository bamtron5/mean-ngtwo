//Core include
import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'
import 'rxjs/Rx' //operators for es6 ... wtf
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';


//Service
import {todoService} from '../service/todo.service';
import {authService} from '../service/auth.service'

//Components
import {HomePageComponent} from './homepage/homepage.component'
import {TodoFormComponent} from './todo-form/todo.form.component'
import {ProfileComponent} from './profile/profile.component'
import {LoginFormComponent} from './login-form/login.form.component'
import {VerificationComponent} from './verify/verify.component'
import {DesktopNavComponent} from './desktop-nav/desktop.nav.component'
import {ClaimDetailComponent} from './claim-detail/claim.detail.component'


@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, DesktopNavComponent],
    template: `
    	
    	<section [class.fadeIn]="viewInit" class="animated main-section">
    		<desktop-navigation></desktop-navigation>
    		<router-outlet></router-outlet>
    	</section>
		
	`,
	providers: [
		HTTP_PROVIDERS,
		authService,
		todoService,
		ROUTER_PROVIDERS
	]
})

@RouteConfig([
	{path: '/', name:'HomePageComponent', component: HomePageComponent},
	{path: '/claim/:id', name: 'ClaimDetailComponent', component: ClaimDetailComponent},
	{path: '/login', name:'LoginFormComponent', component: LoginFormComponent},
	{path: '/profile', name:'ProfileComponent', component: ProfileComponent},
	{path: '/todo', name: 'TodoFormComponent', component: TodoFormComponent},
	{path: '/verify', name:'VerificationComponent', component: VerificationComponent}
])

export class AppComponent{  
	viewInit: boolean;

	constructor() {
		this.viewInit = false;
	}

	ngAfterContentInit() {
		this.viewInit = true;
	}
};

bootstrap(AppComponent, [todoService, authService, ROUTER_PROVIDERS])
	.catch(err => console.log(err));