import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserRegisterForm from './users-register-form.component.jsx';


class UserRegisterContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			formChecker: {isValid: false, silentCheck: false, errors: [], checkedFields: {
				'credential.username': false, 'credential.password': false, 'credential.confirm': false
			}},
		};
		this.bindEventHandlers();
	}

	bindEventHandlers() {
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({[event.name]: event.value});
	}

	onSubmit(event) {
		event.preventDefault();
	}
    
	render() {
		return (
			<div className="container content-wrapper">
				<UserRegisterForm 
					username={this.state.username}
					password={this.state.password}
					confirmPassword={this.state.confirmPassword}
					onInputChange={this.onChange}
					formChecker={this.state.formChecker}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({}, dispatch)
	};
}

function mapStateToProps(state) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterContainer);