import React from 'react';
import LanguageContainer from '../../common/navigation/locale/language.container.jsx';

/**
 * 404 page not found header component serves to visualize the header of the 404 not found page
 */
const Header = () => {
	return (
		<header className="page-header navbar">
			<div className="top-menu">
				<ul className=" navbar-nav ">
					<LanguageContainer />
				</ul>
			</div>
		</header>
	);
};

Header.propTypes = {
};

export default Header;
