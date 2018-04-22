import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../../services/actions/user.actions';
import NotificationService from '../../../../services/services/notification.service';
import {Translate, I18n} from 'react-redux-i18n';
import MultiselectTwoSides from '../../../common/form/multi-select/multi-select.component.jsx';
import PropTypes from 'prop-types';

class AssignRoles extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authenticatedUser: this.props.authenticatedUser,
			user: this.props.user,
			userRoles: this.props.userRoles,
			roleList: Object.values(Configuration.Roles)
		};

		this.defaultRoleId = null;
		this.onRoleSelectChange = this.onRoleSelectChange.bind(this);
	}

	componentWillMount() {
		if (this.state.user !== undefined && this.state.user != null && this.state.user.id != null) {
			this.props.actions.listUserRoles(this.state.user.id);
		}
		// this.props.actions.listRoles();
		let defaultRole = this.state.roleList.filter(role => role.name == Configuration.Roles.USER)[0];
		if (defaultRole !== undefined) {
			this.defaultRoleId = defaultRole.id;
		}
	}

	componentDidMount() {		
		$('#footer').addClass('sticky');
	}
	

	componentWillReceiveProps(nextProps) {
		if (this.state.authenticatedUser !== nextProps.authenticatedUser) {
			this.setState({authenticatedUser: nextProps.authenticatedUser});
		}

		if (this.state.user != nextProps.user) {
			this.setState({user: nextProps.user});
			if (nextProps.user !== undefined && nextProps.user != null && nextProps.user.id != null) {
				this.props.actions.listUserRoles(nextProps.user.id);
			}
		}

		if (this.state.userRoles !== nextProps.userRoles) {
			this.setState({userRoles: nextProps.userRoles});
		}
	}

	componentWillUnmount() {
		$('#footer').removeClass('sticky');
	}

	onRoleSelectChange(currentSelectedRoles, selectedRole, fromSide) {
		if (fromSide == 'selected' && selectedRole == this.defaultRoleId) {
			NotificationService.notifyWarning(I18n.t('assign_roles_container.validation.default_role'));
			return;
		}

		this.props.actions.updateUserRoles(Object.assign({}, this.state.user, {roles: currentSelectedRoles}));
	}

	render() {
		return (
			<div className="assign-roles">
				<div className="col-xs-12 text-xs-center roles-title">
					<Translate value="assign_roles_`container.role_field"/>
				</div>
				<div className="col-xs-12 text-xs-center mx-auto">
					<MultiselectTwoSides
						value={this.state.userRoles.map(r => r.id)}
						options={this.state.roleList.map((r, i) => {
							return {name: r, id: i + 1};
						})}
						labelKey="name"
						valueKey="id"
						clearFilterText={I18n.t('common.btn.clear')}
						className="msts_theme"
						onChange={this.onRoleSelectChange}
						availableHeader={I18n.t('assign_roles_container.roles_available')}
						selectedHeader={I18n.t('assign_roles_container.roles_selected')}
						showControls={false}
						searchable={true}
						clearable={true}
					/>
				</div>
			</div>
		);
	}
}

AssignRoles.propTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	authenticatedUser: PropTypes.object
};

AssignRoles.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
	return {
		authenticatedUser: state.authenticatedUser,
		user: state.user,
		userRoles: state.userRoles
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignRoles);
