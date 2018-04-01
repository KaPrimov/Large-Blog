import React from 'react';
import PropTypes from 'prop-types';

class ArticleManagementTab extends React.Component {

	render() {
		if (this.props.name == this.props.activeTab) {
			return (
				<section>
					{this.props.children}
				</section>
			);
		} else {
			return null;
		}
	}
}

ArticleManagementTab.propTypes = {
	name: PropTypes.string.isRequired,
	activeTab: PropTypes.string.isRequired
}

export default ArticleManagementTab;