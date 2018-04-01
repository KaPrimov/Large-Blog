import React from 'react';
import FieldCreationLabelComponent from '../field-creation-label.component.jsx';
import {Translate} from 'react-redux-i18n';
import OfficesManagementComponent from './offices-target-management.component.jsx';
import EmployeesManagementComponent from './employee-target-management.component.jsx';
import PropTypes from 'prop-types';

const ManageTargetGroupsComponent = ({title, subtitle, checkedOffices, offices, onOfficesChange, onSwitchTargetButtonChange, isGroupMarked, onChangeSelectedEmployees, checkedEmployees}) => {
	return (
		<div className="row mx-auto">
			<FieldCreationLabelComponent
				title={title}
				subtitle={subtitle}
			/>
			
			<div className="col-xs-12">
				<div className="article-management-buttons row">
					<button className={'btn btn-sm btn-ocustom col-xs-12 col-md-2 offset-md-3 management-button' + (isGroupMarked ? ' standart-button-workflow': '')}
						onClick={() => onSwitchTargetButtonChange('offices')}>
						<Translate value="meta_data_section.btn.cities" />
					</button>
					<button className={'btn btn-sm btn-ocustom col-xs-12 col-md-2 offset-md-2 management-button' + (isGroupMarked ? '': ' standart-button-workflow')}
						onClick={() => onSwitchTargetButtonChange('employees')}>
						<Translate value="meta_data_section.btn.employees" />
					</button>
					<br/>
				</div>
					
				{isGroupMarked ? <OfficesManagementComponent 
					currentSelectedOffices={checkedOffices}
					offices={offices}
					onOfficesChange={onOfficesChange}
				/> : 
					<EmployeesManagementComponent 
						onChangeSelectedEmployees={onChangeSelectedEmployees}
						preSelectedEmployees={checkedEmployees}
					/>
				}
			</div>
		</div>
	);
};

ManageTargetGroupsComponent.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	onOfficesChange: PropTypes.func.isRequired,
	onSwitchTargetButtonChange: PropTypes.func.isRequired,
	isGroupMarked: PropTypes.bool.isRequired,
	onChangeSelectedEmployees: PropTypes.func.isRequired,
	checkedOffices: PropTypes.array,
	offices: PropTypes.array,
	checkedEmployees: PropTypes.array
};

export default ManageTargetGroupsComponent;
