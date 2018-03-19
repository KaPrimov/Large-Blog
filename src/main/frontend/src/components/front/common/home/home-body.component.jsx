import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/navigation.container.jsx';
import PageHeader from './page-header.component.jsx';
class HomeBody extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<PageHeader />
			</div>
		);
	}
}

HomeBody.propTypes = {

};

export default HomeBody;