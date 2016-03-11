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
	tags: Array<string>;
	description: string;

	constructor(public _claimService: claimService, private _router: Router, routeParams: RouteParams) {
		this._claimService.title$.subscribe(updatedTitle => { this.title = updatedTitle });
		this._claimService.tags$.subscribe(updatedTags => { this.tags = updatedTags });
		this._claimService.description$.subscribe(updatedDescription => { this.description = updatedDescription });
		this._id = routeParams.get('id');
		this._claimService.getClaim(this._id).then(() => {
			
		}).catch((err) => {
			console.log(err);
		});
	}

	ngOnInit(){
		
	}
};
