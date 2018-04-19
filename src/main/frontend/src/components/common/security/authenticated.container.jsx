import React from 'react';
import {connect} from 'react-redux';
import SecurityService from '../../../services/services/security.service';
import PropTypes from 'prop-types';

class Authenticated extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthorized: SecurityService.access(this.props.authenticatedUser, this.props.access, this.props.any)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.authenticatedUser !== nextProps.authenticatedUser) {
			this.setState({isAuthorized: SecurityService.access(nextProps.authenticatedUser, this.props.access, this.props.any)});
		}
	}

	render() {
		if (this.state.isAuthorized) {
			return (
				this.props.isInList ? 
					<li className={this.props.className ? this.props.className : 'navbar-autenticated'}>
						{this.props.children}
					</li> : <div className={this.props.className ? this.props.className : 'navbar-autenticated'}>
						{this.props.children}
					</div>
			);
		} else {
			return null;
		}
	}
}

Authenticated.propTypes = {
	authenticatedUser: PropTypes.object,
	access: PropTypes.string,
	any: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		authenticatedUser: state.authenticatedUser
	};
}

export default connect(mapStateToProps)(Authenticated);
