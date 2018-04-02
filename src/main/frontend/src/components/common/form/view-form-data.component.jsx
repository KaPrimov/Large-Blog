import React from 'react';

const ViewFormData = ({label, value, ico}) => {
	return (
		<article className="view-form-data">
			{ico !== undefined &&
								<div className="icon" >{ico}</div>
			}
			<div className={'data ' + (ico === undefined ? '' : 'icon-with-padding')}>
				<label>{label}</label>
				<div className="value">{value}</div>
			</div>
		</article>
	);
};

export default ViewFormData;
