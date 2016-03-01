var user_1 = require('../service/models/user');
describe('User Model', function () {
    it('has a setter property for name', function () {
        var user = new user_1.User();
        user.name = "NewUser1";
        expect(user.name).toEqual('NewUser1');
    });
    //lol would break tsc linting anyway... pointless.  just an example
    it('has a setter property for password', function () {
        var user = new user_1.User();
        user.password = "NewUserPassword";
        expect(user.password).toEqual('NewUserPassword');
    });
    it('has a setter property for email', function () {
        var user = new user_1.User();
        console.log(user);
        user.email = "email@domain.com";
        expect(user.email).toEqual('email@domain.com');
    });
});
//# sourceMappingURL=user.spec.js.map