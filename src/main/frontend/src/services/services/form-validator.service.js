import jQuery from 'jquery';

export default class FormValidatorService {

	static validateBirthdate(birthdate){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		var then = new Date(birthdate);
		var thatDay = then.getDate();
		var thatMonth = then.getMonth()+1;
		var thatYear = then.getFullYear();

		var diffYears = yyyy - thatYear;
		var diffMonths = mm - thatMonth;
		var diffDays = dd - thatDay;

		if(diffYears < 16){
			return false;
		}

		if(diffYears == 16){
			if(diffMonths < 0)
				return false;
			if(diffMonths == 0){
				if(diffDays < 0){
					return false;
				}
			}
		}

		return true;
	}

	static validateEmail(value) {
		if (this.__isNumberType(value)) {
			return false;
		}

		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(value);
	}

	static validateRequired(value) {
		if (this.__isNumberType(value)) {
			return true;
		}

		return !jQuery.isEmptyObject(value) && value.length != 0;
	}

	static validateMinLength(value, minLength) {
		if (this.__isNumberType(value)) {
			return false;
		}

		if (jQuery.isEmptyObject(value)) {
			return true;
		}

		return value.length >= minLength;
	}

	static validateNumber(value) {
		if (jQuery.isEmptyObject(value)) {
			return true;
		}

		return !isNaN(value);
	}

	static validateMaxLength(value, maxLength) {
		if (this.__isNumberType(value)) {
			return false;
		}

		if (jQuery.isEmptyObject(value)) {
			return true;
		}

		return value.length <= maxLength;
	}

	static validatePattern(value, pattern) {
		if (this.__isNumberType(value)) {
			return false;
		}

		if (jQuery.isEmptyObject(value)) {
			return true;
		}

		return pattern.test(value);
	}

	static validatePhoneNumber(value) {
		if (jQuery.isEmptyObject(value)) {
			return true;
		}

		let re = /^\+?(\d+\s?)+$/;
		return re.test(value);
	}

	static checkForm(formChecker) {
		let hasUncheckedFields = false;
		for (let field in formChecker.checkedFields) {
			if (formChecker.checkedFields[field] == false) {
				hasUncheckedFields = true;
				break;
			}
		}
		if (hasUncheckedFields) {
			formChecker.isValid = false;
		} else {
			let hasErrors = false;
			for (let error in formChecker.errors) {
				if (formChecker.errors[error] != null) {
					hasErrors = true;
					break;
				}
			}

			if(formChecker.silentCheck && hasErrors) {
				formChecker.errors = [];
				for (let field in formChecker.checkedFields) {
					formChecker.checkedFields[field] = false;
				}
			}

			formChecker.isValid = !hasErrors;
		}
	}

	static __isNumberType(n) {
		return typeof n == 'number';
	}
}
