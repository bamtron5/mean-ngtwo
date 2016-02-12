import {User} from '../../service/models/user';

describe('User', () => {
	it('has a setter property for name', () => {
		let user = new User();
		user.name = "NewUser1";
		expect(user.name).toEqual('NewUser1');
	})

	//lol would break tsc linting anyway... pointless.  just an example
	it('has a password property for name', () => {
		let user = new User();
		user.password = "NewUserPassword"
		expect(user.password).toEqual('NewUserPassword');
	})
});