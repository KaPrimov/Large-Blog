import React from 'react';
import PropTypes from 'prop-types';
import RadioButtonsComponent from '../../../../common/form/radio-buttons.component.jsx';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';

const NotificationTypesSelector = ({onRadioButtonChange, name, radioButtons, selected, titleValue, subtitleValue, isDisabled}) => {
	return (
		<div className="row mx-auto">
			<FieldCreationLabelComponent
				title={titleValue}
				subtitle={subtitleValue} />
			<div className="radio-buttons-wrapper">
				<RadioButtonsComponent
					onRadioButtonChange={onRadioButtonChange}
					name={name}
					radioButtons={radioButtons}
					selected={selected}
					isDisabled={isDisabled}
					padding="20px"
				/>
			</div>
		</div>
	);
};

NotificationTypesSelector.propTypes = {
	onRadioButtonChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	radioButtons: PropTypes.array.isRequired,
	titleValue: PropTypes.string.isRequired,
	subtitleValue: PropTypes.string.isRequired,
	selected: PropTypes.string
};

export default NotificationTypesSelector;
