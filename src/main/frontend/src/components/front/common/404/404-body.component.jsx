import React from 'react';
import {Link} from 'react-router';
import {Translate} from 'react-redux-i18n';

/**
 * 404 page not found error info component serves to visualize the error info component for the 404 not found page
 */
const ErrorInfo = () => {
	return (
		<h1 className="error-wrapper text-xs-center">
			<span id="error-type" className="thin">
				<Translate value="not_found_body_component.type"/>
			</span>
			<span id="error-message" className="thin">
				<Translate value="not_found_body_component.message"/>
			</span>
			<span>
				<Link to={'/'} className="btn btn-ocustom"><Translate value="not_found_body_component.home_button" /></Link>
			</span>
		</h1>
	);
};

export default ErrorInfo;
