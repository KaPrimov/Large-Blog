import React from 'react';
import {Link} from 'react-router';
import {Translate} from 'react-redux-i18n';
import LanguageContainer from './locale/language.container.jsx';
import PropTypes from 'prop-types';
import Authenticated from '../security/authenticated.container.jsx';


const Navigation= ({authenticatedUser, onLogout}) => {
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
						{authenticatedUser != null && <li className="nav-item">
							<Link className="nav-link" to="/blog/all"><Translate value="navigation.blogs"/></Link>
						</li>}
						{authenticatedUser == null && <li className="nav-item">
							<Link className="nav-link" to="/users/login"><Translate value="navigation.login"/></Link>
						</li>}						
						{authenticatedUser == null && <li className="nav-item">
							<Link className="nav-link" to="/users/register"><Translate value="navigation.register"/></Link>
						</li>}
						<Authenticated access="hasRole[administrator]">
							<li className="nav-item">
								<Link className="nav-link" to="/admin"><Translate value="navigation.admin"/></Link>
							</li>
						</Authenticated>
						{authenticatedUser != null && <li className="nav-item">
							<Link className="nav-link logout-btn" onClick={onLogout}><Translate value="navigation.logout"/></Link>
						</li>}
					</ul>
				</div>
				<LanguageContainer />
			</div>
		</nav>
	);
};

Navigation.propTypes = {
	authenticatedUser: PropTypes.object,
	onLogout: PropTypes.func
};

export default Navigation;