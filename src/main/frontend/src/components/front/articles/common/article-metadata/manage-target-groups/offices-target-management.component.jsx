import React from 'react';
import {I18n} from 'react-redux-i18n';
import MultiselectTwoSides from '../../../../../common/form/multi-select/multi-select.component.jsx';

const OfficesManagementComponent = ({currentSelectedOffices, offices, onOfficesChange}) => {
	return (
		<div className="assign-leave-request-responsibilities">
			<div className="col-xs-12 text-xs-center mx-auto">
				<MultiselectTwoSides
					value={currentSelectedOffices}
					options={offices}
					labelKey="name"
					valueKey="id"
					clearFilterText={I18n.t('common.btn.clear')}
					className="msts_theme"
					onChange={onOfficesChange}
					availableHeader={I18n.t('meta_data_section.multiselect_avalable')}
					selectedHeader={I18n.t('meta_data_section.multiselect_selected')}
					showControls={true}
					searchable={true}
					clearable={true}
				/>
			</div>
		</div>
	);
};

export default OfficesManagementComponent;