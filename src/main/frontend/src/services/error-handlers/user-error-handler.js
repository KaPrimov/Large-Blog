import CommonErrorMessageCodeHandler from './common-error-message-code-handler';

export default class EmployeeErrorMessageCodeHandler extends CommonErrorMessageCodeHandler {
	constructor() {
		super('employee_actions.server_errors');
	}

	getFieldError(code) {       

		return null;
	}
}
