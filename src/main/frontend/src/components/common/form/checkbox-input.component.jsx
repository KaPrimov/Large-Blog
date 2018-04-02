import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({onChange, value}) => {
	return (
		<div className="checkbox">
			<label><input type="checkbox" onChange={onChange}/> {value}</label>
		</div>
	);
};

CheckboxInput.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string.isRequired,
};

export default CheckboxInput;
