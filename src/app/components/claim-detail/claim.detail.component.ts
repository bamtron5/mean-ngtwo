import {Component} from 'angular2/core'
import 'rxjs/Rx' //operators for es6 ... wtf
import {claimService} from '../../service/claim.service'
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'claim-detail',
    templateUrl: 'templates/claim-detail.html',
	providers: [
		claimService
	]
})

export class ClaimDetailComponent {

	_id: string;
	title: string;

	constructor(public _claimService: claimService, private _router: Router, routeParams: RouteParams) {
		this._claimService.title$.subscribe(updatedTitle => { this.title = updatedTitle });
		this._id = routeParams.get('id');
		this._claimService.getClaim(this._id).then(() => {
			console.log('service call to get claim');
		}).catch((err) => {
			console.log(err);
		});
	}

	ngOnInit(){
		 
	}
};
