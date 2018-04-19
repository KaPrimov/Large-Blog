import React from 'react';
import Navigation from './navigation.component.jsx';
import * as securityActions from '../../../../services/actions/security.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

class NavigationContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticatedUser: this.props.authenticatedUser,
			isAuthenticated: false
		};
		this.onLogout = this.onLogout.bind(this);
	}
	componentWillReceiveProps(nextProps) {
        
		if (this.props.authenticatedUser !== nextProps.authenticatedUser) {
			this.setState({authenticatedUser: nextProps.authenticatedUser});
		}
	}

	/**
   * Logout the authenticated user and redirect it to home page
   */
	onLogout(event) {
		event.stopPropagation();
		this.props.actions.logout().then(() => {
			browserHistory.push('/');
		});

	}

	render() {
		return (
			<Navigation authenticatedUser={this.state.authenticatedUser} onLogout={this.onLogout} />
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticatedUser: state.authenticatedUser
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(securityActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
