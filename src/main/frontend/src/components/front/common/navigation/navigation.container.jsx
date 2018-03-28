import React from 'react';
import {Link} from 'react-router';
import {Translate} from 'react-redux-i18n';
import LanguageContainer from './locale/language.container.jsx';

const NavigationContainer= () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
			<div className="container">
				<Link className="navbar-brand" to="/">L@rge</Link>
				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
					<i className="fa fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/blog/all"><Translate value="navigation.blogs"/></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/users/login"><Translate value="navigation.login"/></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/users/register"><Translate value="navigation.register"/></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/admin"><Translate value="navigation.admin"/></Link>
						</li>
					</ul>
				</div>
				<LanguageContainer />
			</div>
		</nav>
	);
};

export default NavigationContainer;