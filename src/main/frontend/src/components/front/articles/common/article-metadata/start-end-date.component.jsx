import React from 'react';
import {Translate} from 'react-redux-i18n';
import PopurDatePicker from '../../../../common/form/date-picker/popur-date-picker.component.jsx';
import PropTypes from 'prop-types';
import FieldCreationLabelComponent from './field-creation-label.component.jsx';

const StartEndDateComponent = ({startDate, onStartDateChange, endDate, onEndDateChange, selectLocaleForCalendar, formChecker, title, subtitle}) => {
	return (
		<div className="row mx-auto meta-data-element-wrapper">
			<FieldCreationLabelComponent
				title={title}
				subtitle={subtitle}
			/> 
			<div className="form-group col-sm-6 text-center">
				<label className="col-sm-12 col-form-label block-element">
					<Translate value="meta_data_section.start_date" />
					<span className="required">*</span>
				</label>
				<PopurDatePicker selected={startDate} onChange={onStartDateChange} locale={selectLocaleForCalendar()} />
				{!formChecker.silentCheck ? (formChecker.errors['startDate'] && <div className="alert-danger">{formChecker.errors['startDate']}</div>) : null}
			</div>
			<div className="form-group col-sm-6 text-center">
				<label className="col-sm-12 col-form-label block-element">
					<Translate value="meta_data_section.end_date" />
				</label>
				<PopurDatePicker selected={endDate} onChange={onEndDateChange} locale={selectLocaleForCalendar()} />
				{!formChecker.silentCheck ? (formChecker.errors['endDate'] && <div className="alert-danger">{formChecker.errors['endDate']}</div>) : null}
			</div>
		</div>
	);
};

StartEndDateComponent.propTypes = {
	startDate: PropTypes.object,
	onStartDateChange: PropTypes.func.isRequired,
	endDate: PropTypes.object,
	onEndDateChange: PropTypes.func.isRequired,
	selectLocaleForCalendar: PropTypes.func.isRequired,
	formChecker: PropTypes.object.isRequired
};

export default StartEndDateComponent;