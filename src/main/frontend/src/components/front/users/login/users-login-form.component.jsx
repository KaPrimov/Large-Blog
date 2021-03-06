import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../common/form/text-input.component.jsx';
import {Translate} from 'react-redux-i18n';
import FontAwesome  from 'react-fontawesome';

const RegisterForm = ({username, password, onInputChange, formChecker, onSubmit}) => {
	return (
		<form className="user-form">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					<h2><Translate value="login.label"/></h2>
					<hr/>
				</div>
			</div>
			<div className="row">
				<TextInput wrapperClass="form-group col-md-6 offset-md-3" name="username" isInputGroup={true} nam
					label="register.username_label" labelWrapperClass="col-md-3 field-label-responsive" inputGroupClassName="input-group mb-2 mr-sm-2 mb-sm-0 wrapper-input-with-fa"
					icon="user" inputIconClass="input-group-addon" type="text" inputClass="form-control ml-3" placehoder="common.placehodlers.username" 
					value={username} onChange={onInputChange} isRequired={true} error={formChecker.errors['credential.username']} />
			</div>
			<div className="row">
				<TextInput wrapperClass="form-group col-md-6 offset-md-3" name="password" isInputGroup={true}
					label="register.password_label" labelWrapperClass="col-md-3 field-label-responsive" inputGroupClassName="input-group mb-2 mr-sm-2 mb-sm-0 wrapper-input-with-fa"
					icon="close" inputIconClass="input-group-addon" type="password" inputClass="form-control ml-3" placehoder="common.placehodlers.password" 
					value={password} onChange={onInputChange} isRequired={true} error={formChecker.errors['credential.password']} />
			</div>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<button type="submit" className="btn btn-success" onClick={onSubmit}><FontAwesome name="sign-in"/><Translate value="login.btn"/></button>
				</div>
			</div>
		</form>
	);
};
RegisterForm.propTypes = {
	onInputChange: PropTypes.func.isRequired, 
	username: PropTypes.string, 
	password: PropTypes.string, 
	formChecker: PropTypes.object
};

export default RegisterForm;