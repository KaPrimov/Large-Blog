import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {I18n} from 'react-redux-i18n';
import * as clearPageStatesAction from '../../../services/actions/clear-page-states.actions';
import SecurityService from '../../../services/services/security.service';
import NotificationService from '../../../services/services/notification.service';

export default function(ComposedComponent, clearStatesAction, requiredAccess, any, redirectURL) {
	/**
	 * Authentication control over the pages
	 */
	class AuthenticatedRoute extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				showComponent: true,
				authenticatedUser: this.props.authenticatedUser
			};
			this.authenticatePage = this.authenticatePage.bind(this);
		}

		componentDidMount() {
			if (clearStatesAction !== undefined && clearStatesAction != null) {
				this.props.actions[clearStatesAction]();
			}
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.authenticatedUser && Object.keys(nextProps.authenticatedUser) !== 0) {
				this.setState({authenticatedUser: nextProps.authenticatedUser}, () => {
					this.authenticatePage(this.props.location.pathname, requiredAccess, any, redirectURL);
				});
			}

			if (this.props.showComponent != nextProps.showComponent) {
				this.setState({showComponent: nextProps.showComponent});
			}
		}

		authenticatePage(pathname, requiredAccess, any, redirectURL) {
			const isAuthorized = SecurityService.access(this.state.authenticatedUser, requiredAccess);
			if (!isAuthorized) {
				browserHistory.push(redirectURL ? redirectURL : '/');
				NotificationService.notifyError(I18n.t('common.access_error'));
			} else {
				this.setState({showComponent: true});
			}
		}

		render() {
			if (this.state.showComponent) {
				return <ComposedComponent {...this.props} />;
			} else {
				return null;
			}
		}
	}

	function mapStateToProps(state) {
		return {
			authenticatedUser: state.authenticatedUser
		};
	}

	function mapDispatchToProps(dispatch) {
		return {
			actions: bindActionCreators(clearPageStatesAction, dispatch)
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
}
