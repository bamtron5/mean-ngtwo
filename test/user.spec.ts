///<reference path="../typings/browser/ambient/jasmine/jasmine.d.ts" />
import {User} from '../app/service/models/user';

describe('User Model', () => {
	/***
	** Setters
	***/
	it('has a setter property for name', () => {
		let user = new User();
		user.name = "NewUser1";
		expect(user.name).toEqual('NewUser1');
	})

	it('has a setter property for password', () => {
		let user = new User();
		user.password = "NewUserPassword"
		expect(user.password).toEqual('NewUserPassword');
	})

	it('has a setter property for email', () => {
		let user = new User();
		user.email = "email@domain.com"
		expect(user.email).toEqual('email@domain.com');
	})

	/***
	** Validators
	***/
	//https://developers.livechatinc.com/blog/testing-angular-2-apps-dependency-injection-and-components/

	/***
	** ACL Status
	***/
}); 