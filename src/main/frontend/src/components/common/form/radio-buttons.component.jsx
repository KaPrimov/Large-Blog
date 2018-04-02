import React from 'react';
import {RadioGroup, RadioButton} from '../radio-buttons/index.jsx';
import PropTypes from 'prop-types';

const RadioButtonsCommponent = ({onRadioButtonChange, name, radioButtons, selected, isDisabled}) => {
	return (
		<RadioGroup name={name} onChange={onRadioButtonChange} horizontal={true} value={selected || ''}>
			{radioButtons.map((data, index) => {
				return (
					<RadioButton value={data.value} iconSize={20} pointColor='#23385D' rootColor='#798DAD' key={index} hasTooltip={true} dataId={data.value} dataTooltip={data.dataTip} disabled={isDisabled} >
						{data.option}
					</RadioButton>
				);
			})}
		</RadioGroup>
	);
};

RadioButtonsCommponent.propTypes = {
	onRadioButtonChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	notificationType: PropTypes.string,
	radioButtons: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.string.isRequired,
		option: PropTypes.string.isRequired,
		dataTip: PropTypes.string
	})).isRequired,
	isDisabled: PropTypes.bool
};

export default RadioButtonsCommponent;