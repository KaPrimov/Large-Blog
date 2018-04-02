import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class NotAuthenticated extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: this.props.authenticatedUser != null
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.authenticatedUser !== nextProps.authenticatedUser) {
			this.setState({isAuthenticated: nextProps.authenticatedUser != null});
		}
	}

	render() {
		if (this.state.isAuthenticated) {
			return null;
		} else {
			return (
				<div>
					{this.props.children}
				</div>
			);
		}
	}
}

NotAuthenticated.propTypes = {
	authenticatedUser: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		authenticatedUser: state.authenticatedUser
	};
}

export default connect(mapStateToProps)(NotAuthenticated);
