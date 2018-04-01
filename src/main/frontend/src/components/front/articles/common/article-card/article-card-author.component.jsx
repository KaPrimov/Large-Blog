import React from 'react';
import {Link} from 'react-router';
import EmployeeAPI from '../../../../../services/api/employee.api';
import Img from '../../../../common/img-smooth-loading/img.component.jsx';
import PropTypes from 'prop-types';

const Author = ({author, hasProfileReadPrivilege}) => {
	return (
		<div className="author-detail">
			<Link to={hasProfileReadPrivilege ? `/people/${author.id}` : ''}  className="profile" >
				<div className="author-avatar"><Img imgClasses="rounded-circle" src={EmployeeAPI.getProfilePictureUrlByEmployeeId(author.id)} alt="" /></div>
				<span className="username hidden-xs-down">{author.firstName + ' ' + author.lastName}</span>
			</Link>
		</div>
	);
};

Author.propTypes = {
	author: PropTypes.object,
	hasProfileReadPrivilege: PropTypes.bool
};

export default Author;
