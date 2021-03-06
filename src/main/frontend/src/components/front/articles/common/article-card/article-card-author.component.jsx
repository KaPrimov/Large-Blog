import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

const Author = ({author, hasProfileReadPrivilege}) => {
	return (
		<div className="author-detail">
			<Link to={hasProfileReadPrivilege ? `/people/${author.id}` : ''}  className="profile" >
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
