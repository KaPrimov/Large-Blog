import React from 'react';
import PropTypes from 'prop-types';

const FieldCreationLabelComponent = ({title, subtitle, isRequired}) => {
	return (
		<div className="row meta-data-label">
			<h4 className="cols-xs-6 block-element text-xs-center">
				{title} {isRequired && <span className="required">*</span>}
			</h4> 
			{subtitle && <p className="info text-xs-center" >
				<span>{subtitle}</span> 
			</p>}         
		</div>
	);
};
FieldCreationLabelComponent.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	isRequired: PropTypes.bool
};

export default FieldCreationLabelComponent;