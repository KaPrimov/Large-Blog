import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Translate} from 'react-redux-i18n';

const NoItemsFound = ({text}) => {

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="not-found-template">
					<h2 className="not-found-header"><Translate value={text}/></h2>
					<FontAwesome name="frown-o" className="not-found-icon"/>
				</div>
			</div>
		</div>
	);
};

export default NoItemsFound;