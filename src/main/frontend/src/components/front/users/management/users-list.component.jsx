import React from 'react';
import PropTypes from 'prop-types';
// import TextInput from '../../common/form/text-input.component.jsx';
// import {Translate} from 'react-redux-i18n';
// import FontAwesome  from 'react-fontawesome';

const UsersList = ({users, onUserSelect}) => {
	return (
		<div>
			{users.map(user => {
				return (
					<div key={user.id} className="row">
						<h1 className="col-xs-9">{user.username}</h1>
						<button className="btn btn-sm btn-ocustom col-xs-3" onClick={() => onUserSelect(user.id)}>Edit</button>
					</div>
				);
			})}
		</div>
	);
};

UsersList.propTypes = {
	onUserSelect: PropTypes.func.isRequired,
	users: PropTypes.array,
};

export default UsersList;