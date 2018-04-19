import CommonErrorMessageCodeHandler from './common-error-message-code-handler';

export default class UserErrorMessageCodeHandler extends CommonErrorMessageCodeHandler {
	constructor() {
		super('user_actions.server_errors');
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
