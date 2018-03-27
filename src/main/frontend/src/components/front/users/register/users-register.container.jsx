import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {I18n} from 'react-redux-i18n';
import UserRegisterForm from './users-register-form.component.jsx';
import * as userActions from '../../../../services/actions/user.actions';
import SecurityAPI from '../../../../services/api/security.api';
import FormValidatorService from '../../../../services/services/form-validator.service';

class UserRegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			formChecker: {isValid: true, silentCheck: false, errors: [], checkedFields: {
				'credential.username': false, 'credential.email': false, 'credential.password': false, 'credential.confirmPassword': false
			}},
		};
		this.bindEventHandlers();
	}

	bindEventHandlers() {
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		this.validateForm(null, null, true).then(() => {
			if (this.state.formChecker.isValid) {
				alert('inside')
				let userData = {
					username: this.state.username,
					password: this.state.password,
					email: this.state.email
				};
				
				this.props.actions.registerUser(userData);
			}
		});
		
	}

	validateForm(field, silent, hardCheck) {
		let deffered = jQuery.Deferred();
		let hasAsyncCheck = false;
		let hasLoginError = false;

		if (silent === undefined) {
			silent = false;
		}

		if (hardCheck === undefined) {
			hardCheck = false;
		}

		let formChecker = Object.assign({}, this.state.formChecker);
		formChecker.silentCheck = silent;

		if (field == 'credential.username' || silent || hardCheck) {
			formChecker.checkedFields['credential.username'] = true;
			if (!FormValidatorService.validateRequired(this.state.username)) {
				formChecker.errors['credential.username'] = I18n.t('common.validation.required_field');
				hasLoginError = true;
			} else if (!FormValidatorService.validateMinLength(this.state.username, 2)) {
				formChecker.errors['credential.username'] = I18n.t('common.validation.min_length', {size: 2});
				hasLoginError = true;
			} else if (!FormValidatorService.validateMaxLength(this.state.username, 90)) {
				formChecker.errors['credential.username'] = I18n.t('common.validation.max_length', {size: 90});
				hasLoginError = true;
			} else {
				formChecker.errors['credential.username'] = null;
			}			
		}

		if (field == 'credential.email' || silent || hardCheck) {
			formChecker.checkedFields['credential.email'] = true;
			if (!FormValidatorService.validateRequired(this.state.email)) { 
				formChecker.errors['credential.email'] = I18n.t('common.validation.required_field');
				hasLoginError = true;
			} else if(!FormValidatorService.validatePattern(this.state.email, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
				formChecker.errors['credential.email'] = I18n.t('common.validation.email');
			} else {
				formChecker.errors['credential.email'] = null;
			}
		}

		if (field == 'credential.password' || silent || hardCheck) {
			formChecker.checkedFields['credential.password'] = true;
			formChecker.checkedFields['credential.confirmPassword'] = true;
			if (!FormValidatorService.validateRequired(this.state.password)) { 
				formChecker.errors['credential.password'] = I18n.t('common.validation.required_field');
				hasLoginError = true;
			} else if(!FormValidatorService.validateMinLength(this.state.password, 6)) {
				formChecker.errors['credential.password'] = I18n.t('common.validation.min_length', {size: 6});
				hasLoginError = true;
			} else if (this.state.confirmPassword !== this.state.password) {
				formChecker.errors['credential.confirmPassword'] = I18n.t('common.validation.passwords_do_not_match');
			} else {
				formChecker.errors['credential.confirmPassword'] = null;
				formChecker.errors['credential.password'] = null;
			}
		}		
		
		if (!hasLoginError) {
			hasAsyncCheck = true;
			SecurityAPI.loginExists(this.state.username, this.state.email).then(result => {
				if (result) {
					formChecker.errors['credential.username'] = I18n.t('common.validation.user_exists');
					formChecker.errors['credential.email'] = I18n.t('common.validation.user_exists');
				}
				FormValidatorService.checkForm(formChecker);
				this.setState({formChecker}, () => deffered.resolve());
			});
		}
		if (!hasAsyncCheck) {
			FormValidatorService.checkForm(formChecker);
			this.setState({formChecker: formChecker}, () => deffered.resolve());
		}

		return deffered.promise();
	}
    
	render() {
		return (
			<div className="container content-wrapper">
				<div className="row col-md-12 portlet light">
					<UserRegisterForm 
						username={this.state.username}
						password={this.state.password}
						confirmPassword={this.state.confirmPassword}
						email={this.state.email}
						onInputChange={this.onChange}
						formChecker={this.state.formChecker}
						onSubmit={this.onSubmit}
					/>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterContainer);