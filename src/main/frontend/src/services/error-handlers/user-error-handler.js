import CommonErrorMessageCodeHandler from './common-error-message-code-handler';

export default class EmployeeErrorMessageCodeHandler extends CommonErrorMessageCodeHandler {
	constructor() {
		super('employee_actions.server_errors');
		this.WRONG_CREDENTIALS = 401;
	}

	getFieldError(code) {       
		switch(code) {
		case this.WRONG_CREDENTIALS:
			return 'Nope';
		default:
			return null;

		}
	}
}
