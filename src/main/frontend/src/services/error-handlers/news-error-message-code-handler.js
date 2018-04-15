import CommonErrorMessageCodeHandler from './common-error-message-code-handler';

export default class NewsErrorMessageCodeHandler extends CommonErrorMessageCodeHandler {
	constructor() {
		super('news_actions.server_errors');

		this.NEWS_NOT_FOUND = 2600;
		this.NEWS_IS_IN_USE = 2601;
		this.FILE_ACCESS_DENIED = 2602;
		this.ID_REQUIRED_FIELD = 2603;
		this.DESCRIPTION_LENGTH_TOO_LONG = 2604;
		this.DESCRIPTION_LENGTH_TOO_SHORT = 2605;
		this.DESCRIPTION_REQUIRED_FIELD = 2606;
	}

	getFieldError(code) {
		switch(code) {
		case this.NEWS_NOT_FOUND:
			return 'news_not_found';
		case this.NEWS_IS_IN_USE:
			return 'news_is_in_use';
		case this.FILE_ACCESS_DENIED:
			return 'file_access_denied';
		case this.ID_REQUIRED_FIELD:
			return 'id_required_field';
		case this.DESCRIPTION_LENGTH_TOO_LONG:
			return 'description_length_too_long';
		case this.DESCRIPTION_LENGTH_TOO_SHORT:
			return 'description_length_too_short';
		case this.DESCRIPTION_REQUIRED_FIELD:
			return 'description_required_field';
		}

		return null;
	}
}
