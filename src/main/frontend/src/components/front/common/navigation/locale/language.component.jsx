import React from 'react';
import {Translate} from 'react-redux-i18n';
import PropTypes from 'prop-types';

const Language = ({locales, changeLanguage, currentLocale}) => {
	return (
		<li className="nav-item dropdown dropdown-language">
			<a className="dropdown-toggle" data-toggle="dropdown" data-close-others="true">
				<span className={currentLocale.flag}/>
				<span className="langname"> <Translate value={`language_component.shortLang.${currentLocale.name}`} /></span>
			</a>
			<ul className="dropdown-menu dropdown-menu-default">
				{locales.map(locale => {
					return (
						<li className="dropdown-item" key={locale.shortName}>
							<a href="javascript:;" onClick={()=> changeLanguage(locale.shortName)}> <span className={locale.flag}></span> <Translate value={`language_component.${locale.name}`} /></a>
						</li>
					);
				})}
			</ul>
		</li>
	);
};

Language.propTypes = {
	locales: PropTypes.array.isRequired,
	changeLanguage: PropTypes.func.isRequired,
	currentLocale: PropTypes.object.isRequired
};

export default Language;
