import React from 'react';
import Navigation from './front/common/navigation/navigation.container.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as securityActions from '../services/actions/security.actions';
import Footer from './front/common/footer/footer.component.jsx';

class LargeAppContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.actions.refreshAuthentication();
	}

	render() {
		return (
			<article id="large-application">
				<Navigation />	
				{this.props.children}
				<Footer />
			</article>
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

export default connect(mapStateToProps, mapDispatchToProps)(LargeAppContainer);