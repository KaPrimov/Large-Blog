import React from 'react';
import ManageArticleTargetEmployees from '../../../../../common/employee-selection/employee-selection.container.jsx';

const EmployeeManagementComponent = ({onChangeSelectedEmployees, employees, preSelectedEmployees}) => {
	return (
		<div className="manage_article_target_group text-xs-center">
			<div className="col-xs-8 offset-xs-2">
				<ManageArticleTargetEmployees
					onChangeSelectedEmployees={onChangeSelectedEmployees}
					employees={employees}
					preSelectedEmployees={preSelectedEmployees}
				/>
			</div>
		</div>
	);
};

export default EmployeeManagementComponent;