import React from 'react';
import PropTypes from 'prop-types';
import EmployeeAPI from '../../../../../../services/api/employee.api';
import Img from '../../../../../common/img-smooth-loading/img.component.jsx';

export default class ShowEmployeeTag extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			employee: this.props.employee
		};
	}

	render(){
		let employee = this.state.employee;
		return (
			<div className="picture-tag">
				<div className='small-picture col-xs-4'>
					<Img src={EmployeeAPI.getProfilePictureUrlByEmployeeId(this.state.employee.id)} imgClasses="small-picture-for-data-grid-rounded"/>
				</div>
				<span>{`${employee.firstName} ${employee.middleName || ''} ${employee.lastName}`}{' '}</span>
			</div>
		);
	}
}

ShowEmployeeTag.propTypes = {
	employee: PropTypes.object.isRequired
};