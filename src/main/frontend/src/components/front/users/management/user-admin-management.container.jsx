import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {I18n} from 'react-redux-i18n';
import {browserHistory} from 'react-router';
import * as usersActions from '../../../../services/actions/user.actions';
import UsersList from './users-list.component.jsx';

class UsersManagementPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: this.props.users
		};

		this.onUserSelect = this.onUserSelect.bind(this);
	}
    
	componentDidMount() {
		this.props.actions.getAllUsers();
    }
    
	componentWillReceiveProps(nextProps) {
		if (nextProps.users && nextProps.users.length != 0) {
			this.setState({users: nextProps.users});
		}
	}

	onUserSelect(id) {
		let user = this.state.users.filter(u => u.id === id)[0];
		this.props.actions.saveUserInStore(user);
		browserHistory.push('/admin/user');
	}

	render() {
		if (!this.state.users || this.state.users.length == 0) {
			return <h1>Nope</h1>;
		}
		return (
			<div className="container content-wrapper">
				<div className="row col-md-12 portlet light">
					<UsersList 
						users={this.state.users}
						onUserSelect={this.onUserSelect}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.users
	};
}



function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(usersActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagementPage);