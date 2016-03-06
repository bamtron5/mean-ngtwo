import {Component} from 'angular2/core'
import 'rxjs/Rx' //operators for es6 ... wtf

@Component({
    selector: 'homepage',
    template: `
		<div class="container">
			<h1>Homepage</h1>
		</div>
	`
})

export class HomePageComponent {
	viewInit: boolean;

	constructor() {
		this.viewInit = false;
	}

	ngAfterContentInit() {
		this.viewInit = true;
	}
};
