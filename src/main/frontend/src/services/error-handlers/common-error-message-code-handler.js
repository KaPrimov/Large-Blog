import {I18n} from 'react-redux-i18n';
import TransformObjectUtils from '../services/transform-object-utils.service';

const BEAN_VALIDATION_ERROR_CODE = -2;
const UNAUTHORISED_ERROR_STATUS = 401;
const PAYLOAD_TOO_LARGE = 413;

/**
 * Error codes returned from the server
 **/
export default class CommonErrorMessageCodeHandler {
	constructor(errorCodeMsgPrefix) {
		this.errorCodeMsgPrefix = errorCodeMsgPrefix;
	}

	generateMessage(error) {
		if (error.status !== undefined && error.status == PAYLOAD_TOO_LARGE) {
			return I18n.t('common.file_too_large');
		}

		let i18nLabel = this.generateI18nLabel(error.responseText !== undefined ? JSON.parse(error.responseText) : error);

		return I18n.t(i18nLabel.code, i18nLabel.arguments);
	}

	generateI18nLabel(error) {
		let fieldError = null;
		let message = null;

		if(error !== undefined && error.status !== undefined && error.status == UNAUTHORISED_ERROR_STATUS) {
			message = {code: 'common.no_authorities_error', arguments: {}};
		} else if (error !== undefined && error.code !== undefined) {

			if (BEAN_VALIDATION_ERROR_CODE == error.code) {
				message = this.generateBeanValidationErrorMessage(error);
			} else {
				fieldError = this.getFieldError(error.code);
				if (fieldError != null) {
					message = {code: `${this.errorCodeMsgPrefix}.${fieldError}`, arguments: {}};
				}
			}
		}

		if (message == null) {
			message = {code: 'common.unspecified_server_error', arguments: {}};
		}

		return message;
	}

	getFieldError(code) {
		return null;
	}

	generateMessageCodeFromServerErrorMessage(messageCode) {
		let message = messageCode.replace('javax.validation.constraints.', '');
		message = message.toLowerCase();
		message = TransformObjectUtils.transform(message);
		message = 'common.server_side_generic_errors.' + message;
		return message;
	}

	generateBeanValidationErrorMessage(error) {
		if (error.messageCode === undefined || error.property === undefined || error.messageCode.indexOf('javax.validation.constraints.') == -1) {
			return null;
		}

		let filedNameMessage = I18n.t(`${this.errorCodeMsgPrefix}.fields.${TransformObjectUtils.transform(error.property)}`);
		let argumentsForI18n = {fieldName: filedNameMessage};
		if (error.arguments !== undefined && error.arguments != null) {
			argumentsForI18n = Object.assign({}, argumentsForI18n, error.arguments);
		}
		let messageCode = this.generateMessageCodeFromServerErrorMessage(error.messageCode);

		return {code: messageCode, arguments: argumentsForI18n};
	}
}
