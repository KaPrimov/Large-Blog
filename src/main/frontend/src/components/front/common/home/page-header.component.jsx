import React from 'react';
import PropTypes from 'prop-types';
import {Translate} from 'react-redux-i18n';

const PageHeader = () => {
	return (
		<header className="masthead" style={{'backgroundImage': 'url(\'../../../../../assets/images/home-bg.jpg\')'}}>
			<div className="overlay"></div>
			<div className="container">
				<div className="row">
					<div className="offset-xs-2 col-xs-8">
						<div className="site-heading">
							<h1>L@rge</h1>
							<span className="subheading"><Translate value="home.heading"/></span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default PageHeader;