import React from 'react';
import {Translate} from 'react-redux-i18n';
import PopurDatePicker from '../../../../common/form/date-picker/popur-date-picker.component.jsx';
import PropTypes from 'prop-types';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';
import moment from 'moment';

const NewsShowDates = ({startDate, endDate, selectLocaleForCalendar, title, subtitle, currentLocale}) => {
	return (
		<div className="row mx-auto">
			<FieldCreationLabelComponent
				title={title}
				subtitle={subtitle}
			/> 
			<div className="form-group col-sm-6 text-xs-center">
				<label className="col-xs-12 col-form-label block-element">
					<Translate value="meta_data_section.start_date" />
				</label>
				<p>{convertDateTimeInReadableStyle(event.eventStartOn, currentLocale.shortName)}</p>
			</div>
			<div className="form-group col-sm-6 text-xs-center">
				<label className="col-xs-12 col-form-label block-element">
					<Translate value="meta_data_section.end_date" />
				</label>
				{endDate ? <p>{convertDateTimeInReadableStyle(event.eventStartOn, currentLocale.shortName)}</p> : <Translate value='poll_management_content.no_end_date'/>}
			</div>
		</div>
	);
};



const convertDateTimeInReadableStyle = (dateTimeString, locale) => {
	moment.locale(locale);
	let dateTimeMoment = moment(dateTimeString).format('DD/MM/YYYY');
	return moment(dateTimeString).isValid() ? dateTimeMoment : '';
};

NewsShowDates.propTypes = {
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	selectLocaleForCalendar: PropTypes.func.isRequired,
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default NewsShowDates;