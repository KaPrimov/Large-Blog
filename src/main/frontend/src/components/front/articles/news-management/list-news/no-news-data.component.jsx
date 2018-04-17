import React from 'react';
import PropTypes from 'prop-types';
import Img from '../../../../common/img-smooth-loading/img.component.jsx';
import {Translate} from 'react-redux-i18n';

const NoNewsData = ({loading}) => {
	return (
		<article className={'no-news-data text-xs-center ' + (loading ? 'loading' : '')}>
			<figure className="mx-auto poster">
				<Img src="/assets/images/no-news-poster.jpg" />
			</figure>
			<div className="no-news-feed-text">
				<h3><Translate value="no_news_data.no_data" /></h3>
			</div>
		</article>
	);
};

NoNewsData.propTypes = {
	loading: PropTypes.bool.isRequired
};

export default NoNewsData;