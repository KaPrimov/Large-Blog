import React from 'react';
import EmployeeAPI from  '../../../../../services/api/employee.api';
import Img from '../../../../common/img-smooth-loading/img.component.jsx';
import PropTypes from 'prop-types';

const Reader = ({readerId}) => {
	return (
		<div className="reader-avatar"><Img imgClasses="rounded-circle" src={EmployeeAPI.getProfilePictureUrlByEmployeeId(readerId)} alt="" /></div>
	);
};

Reader.propTypes = {
	readerId: PropTypes.number
};

export default Reader;
