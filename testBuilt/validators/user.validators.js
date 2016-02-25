require('rxjs/Rx'); //operators for es6 ... wtf
var UserValidators = (function () {
    function UserValidators() {
    }
    UserValidators.emailValidator = function (control) {
        if (control._value === undefined) {
            return null;
        }
        // RFC 2822 compliant reg ex
        if (control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
            return null;
        }
        else {
            return { emailValidator: true };
        }
    };
    UserValidators.emailMatch = function (_a) {
        var value = _a.value;
        if (value.emailCtrl === undefined && value.confirmEmail === undefined) {
            return null;
        }
        else {
            return value.emailCtrl === value.confirmEmail ? null : { emailMatch: true };
        }
    };
    UserValidators.passwordMatch = function (_a) {
        var value = _a.value;
        if (value.password === undefined && value.confirmPassword === undefined) {
            return null;
        }
        else {
            return value.password === value.confirmPassword ? null : { passwordMatch: true };
        }
    };
    return UserValidators;
})();
exports.UserValidators = UserValidators;
//# sourceMappingURL=user.validators.js.map