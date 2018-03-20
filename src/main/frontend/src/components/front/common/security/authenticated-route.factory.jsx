import React from 'react';
import * as clearPageStatesAction from '../../../../services/actions/clear-page-states.actions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default function(ComposedComponent, clearStatesAction, requiredAccess, any, redirectURL) {
	/**
	 * Authentication control over the pages
	 */
	class AuthenticatedRoute extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				showComponent: this.props.showComponent
			};
		}

		componentDidMount() {
			this.props.actions.hideLayout(true);
			if (clearStatesAction !== undefined && clearStatesAction != null) {
				this.props.actions[clearStatesAction]();
			}

			this.props.actions.authenticatePage(this.props.location.pathname, requiredAccess, any, redirectURL);
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.showComponent == true) {
				this.props.actions.hideLayout(false);
			}

			if (this.props.showComponent != nextProps.showComponent) {
				this.setState({showComponent: nextProps.showComponent});
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
			showComponent: state.showComponent
		};
	}

	function mapDispatchToProps(dispatch) {
		return {
			actions: bindActionCreators(clearPageStatesAction, dispatch)
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
}
