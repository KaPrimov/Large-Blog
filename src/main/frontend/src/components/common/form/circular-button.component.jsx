
import React from 'react';
import FontAwesome from 'react-fontawesome';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const CircularButton = ({onClick, dataTip, dataId, type, fontAwesomeName}) => {
	return (
		<div className="circular-button-wrapper">
			<button type={type || ''} className="circular-button" onClick={onClick} data-tip={dataTip} data-for={dataId}>
				<FontAwesome className="circular-button-font-awesome" name={fontAwesomeName} />
			</button>
			<ReactTooltip id={dataId} />
		</div>
	);
};

CircularButton.propTypes = {
	onClick: PropTypes.func.isRequired, 
	dataTip: PropTypes.string.isRequired, 
	dataId: PropTypes.string, 
	type: PropTypes.string,
	fontAwesomeName: PropTypes.string.isRequired
};

export default CircularButton;