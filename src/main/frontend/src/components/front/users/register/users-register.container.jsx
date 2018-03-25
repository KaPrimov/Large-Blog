import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserRegisterForm from './users-register-form.component.jsx';
import * as userActions from '../../../../services/actions/user.actions';


class UserRegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			formChecker: {isValid: false, silentCheck: false, errors: [], checkedFields: {
				'credential.username': false, 'credential.password': false, 'credential.confirm': false
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
		console.log('form');
		let userData = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email
		};
		this.props.actions.registerUser(userData);
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