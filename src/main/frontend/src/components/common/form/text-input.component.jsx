import React, {PropTypes} from 'react';
import {Translate, I18n} from 'react-redux-i18n';
import FontAwesome  from 'react-fontawesome';

const TextInput = ({inputGroupClassName, inputIconClass, isRequired, isInputGroup, errorClass, icon, wrapperClass, labelClass, inputWrapperClass, inputClass, type, name, label, onChange, placeholder, value, error, disabled, labelLogic, onKeyPress}) => {
	if (wrapperClass === undefined) {
		wrapperClass = 'form-group row';
	}

	if (labelClass === undefined) {
		labelClass = 'col-form-label';
	}

	if (inputWrapperClass === undefined) {
		inputWrapperClass = '';
	}

	if (inputClass === undefined) {
		inputClass = 'form-control btn-ocustom';
	}

	if (isInputGroup === undefined) {
		isInputGroup = false;
	}

	if (isRequired === undefined) {
		isRequired = false;
	}

	if (inputGroupClassName === undefined) {
		inputGroupClassName = 'input-group';
	}

	if (placeholder === undefined) {
		placeholder = '';
	}

	if (inputIconClass === undefined) {
		inputIconClass = 'input-group-addon';
	}

	if (errorClass === undefined) {
		errorClass = 'alert-danger';
	}

	if (disabled === undefined) {
		disabled = false;
	}

	const simpleInput = (<input disabled={disabled ? 'disabled' : ''} type={type} name={name} className={inputClass} placeholder={I18n.t(placeholder)} value={value} onChange={onChange} onKeyPress={onKeyPress}/>);
	const groupInput = (
		<div className={inputGroupClassName}>
			{icon && <span className={inputIconClass}><FontAwesome name={icon}/></span>}
			<input disabled={disabled ? 'disabled' : ''} type={type} name={name} className={inputClass} placeholder={I18n.t(placeholder)} value={value == null || value == undefined ? '' : value} onChange={onChange} onKeyPress={onKeyPress} />
		</div>
	);

	return (
		<div className={wrapperClass}>
			<label className={labelClass} htmlFor={name}><Translate value={label}/>{isRequired && <span className="required">*</span>}
				{labelLogic}
			</label>
			<div className={inputWrapperClass}>
				{isInputGroup ? groupInput : simpleInput}
				{error && <div className={errorClass}>{error}</div>}
			</div>
		</div>
	);
};

TextInput.propTypes = {
	wrapperClass: PropTypes.string,
	labelClass: PropTypes.string,
	inputWrapperClass: PropTypes.string,
	inputClass: PropTypes.string,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.any,
	error: PropTypes.string,
	isInputGroup: PropTypes.bool,
	icon: PropTypes.string,
	inputIconClass: PropTypes.string,
	disabled: PropTypes.bool,
	errorClass: PropTypes.string

};

export default TextInput;
