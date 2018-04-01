import React from 'react';
import PropTypes from 'prop-types';

const ShowTargetOfficesCoponent = ({offices}) => {
	return (
		<div className="target-group-management mx-auto">
			<div className="row">				
				{offices.map(office => (
					<div key={`responsibilities${office.name}`} className="col-xs-12 col-sm-4 value-profile text-xs-center language" >
						<div className="gradient-border">{office.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

ShowTargetOfficesCoponent.propTypes = {
	offices: PropTypes.arrayOf(PropTypes.object)
};

export default ShowTargetOfficesCoponent;
