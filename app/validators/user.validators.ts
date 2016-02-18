import 'rxjs/Rx' //operators for es6 ... wtf
import {ControlGroup} from 'angular2/common';

export class UserValidators{

	static emailValidator(control) {
		if(control._value === undefined){
			return null;
		}
		// RFC 2822 compliant reg ex
		if (control.value.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")) {
			return null;
		} else {
			return { emailValidator: true };
		}
	}

	static emailMatch({value}: ControlGroup): {[key: string]: any} {
		if(value.emailCtrl === undefined && value.confirmEmail === undefined){
			console.log('null');
			return null;
		} else {
			console.log(value.emailCtrl === value.confirmEmail ? null : { emailMatch: true });
			return value.emailCtrl === value.confirmEmail ? null : { emailMatch: true };
		}
	}

	static passwordMatch({value}: ControlGroup): {[key: string]: any} {
		if(value.password === undefined && value.confirmPassword === undefined){
			console.log('null');
			return null;
		} else {
			console.log(value.password === value.confirmPassword ? null : { passwordMatch: true });
			return value.password === value.confirmPassword ? null : { passwordMatch: true };
		}
	}
}