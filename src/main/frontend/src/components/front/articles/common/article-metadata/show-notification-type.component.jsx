import React from 'react';
import PropTypes from 'prop-types';
import {I18n} from 'react-redux-i18n';
import FieldCreationLabelComponent from './field-creation-label.component.jsx';

const ShowNotificationsTypeComponent = ({type, title, subtitle}) => {
	return (
		<div className="row meta-data-label">
			<FieldCreationLabelComponent 
				title={title}
				subtitle={subtitle}
			/>
			<h4 className="cols-xs-6 block-element text-xs-center">
				{I18n.t(`meta_data_section.radio_button.options.${type.toLowerCase()}`)}
			</h4>
              
		</div>
	);
};

ShowNotificationsTypeComponent.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired
};

export default ShowNotificationsTypeComponent;