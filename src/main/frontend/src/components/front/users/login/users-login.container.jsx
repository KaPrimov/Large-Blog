import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {I18n} from 'react-redux-i18n';
import UserLoginForm from './users-login-form.component.jsx';
import SecurityAPI from '../../../../services/api/security.api';
import FormValidatorService from '../../../../services/services/form-validator.service';
import NotificationService from '../../../../services/services/notification.service.js';

class UserRegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			formChecker: {isValid: true, silentCheck: false, errors: [], checkedFields: {
				'credential.username': false, 'credential.password': false
			}}
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
				let userData = {
					username: this.state.username,
					password: this.state.password
				};
				
				SecurityAPI.loginUser(userData).then(result => {
					NotificationService.notifySuccess(I18n.t('user_actions.register_success'));
				});
			}
		});
		
	}

	validateForm(field, silent, hardCheck) {
		let deffered = jQuery.Deferred();

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
			} else {
				formChecker.errors['credential.username'] = null;
			}			
		}	

		if (field == 'credential.password' || silent || hardCheck) {
			formChecker.checkedFields['credential.password'] = true;
			if (!FormValidatorService.validateRequired(this.state.password)) { 
				formChecker.errors['credential.password'] = I18n.t('common.validation.required_field');
			} else {
				formChecker.errors['credential.confirmPassword'] = null;
				formChecker.errors['credential.password'] = null;
			}
		}
	
		FormValidatorService.checkForm(formChecker);
		this.setState({formChecker: formChecker}, () => deffered.resolve());		

		return deffered.promise();
	}
    
	render() {
		return (
			<div className="container content-wrapper">
				<div className="row col-md-12 portlet light">
					<UserLoginForm 
						username={this.state.username}
						password={this.state.password}
						onInputChange={this.onChange}
						formChecker={this.state.formChecker}
						onSubmit={this.onSubmit}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps)(UserRegisterContainer);