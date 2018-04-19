import React from 'react';
import {Link} from 'react-router';
import {Translate} from 'react-redux-i18n';
import LanguageContainer from './locale/language.container.jsx';
import PropTypes from 'prop-types';
import Authenticated from '../../../common/security/authenticated.container.jsx';


const Navigation= ({authenticatedUser, onLogout}) => {
	return (
		<nav className="navbar-light navbar-fixed-top" id="mainNav">
			<div className="container-fluid head-nav">
				<Link className="navbar-brand" to="/">L@rge</Link>
				<div className="pull-right links-wrapper" id="navbarResponsive">
					<ul className="nav navbar-nav ul-links">
						{authenticatedUser != null && <li className="nav-item">
							<Link className="nav-link" to="/article/all"><Translate value="navigation.blogs"/></Link>
						</li>}
						{authenticatedUser != null && <li className="nav-item">
							<Link className="nav-link" to="/articles/news/create"><Translate value="navigation.news_create"/></Link>
						</li>}
						{authenticatedUser == null && <li className="nav-item">
							<Link className="nav-link" to="/users/login"><Translate value="navigation.login"/></Link>
						</li>}						
						{authenticatedUser == null && <li className="nav-item">
							<Link className="nav-link" to="/users/register"><Translate value="navigation.register"/></Link>
						</li>}
						<Authenticated access="hasRole[administrator]">
							<Link className="nav-link" to="/admin"><Translate value="navigation.admin"/></Link>
						</Authenticated>
						<Authenticated access="hasRole[administrator],hasRole[moderator]">
							<Link className="nav-link" to="/articles/news-management"><Translate value="navigation.manage_news"/></Link>
						</Authenticated>
						{authenticatedUser != null && <li className="nav-item">
							<Link className="nav-link logout-btn" onClick={onLogout}><Translate value="navigation.logout"/></Link>
						</li>}
						<LanguageContainer />	
					</ul>
				</div>
			</div>
		</nav>
	);
};

Navigation.propTypes = {
	authenticatedUser: PropTypes.object,
	onLogout: PropTypes.func
};

export default Navigation;