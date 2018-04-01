import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from './article-header.component.jsx';
import ArticleFooter from './article-footer.component.jsx';
import {Translate} from 'react-redux-i18n';
import {Link} from 'react-router';

class ArticleCard extends React.Component{
	
        
	render (){
		return (
			<article className="article-card card main-panel-shadow-effect">
				<ArticleHeader {...this.props} onTagClick={this.props.onTagClick} />
				<main className="card-body">
					<div className="article-card-body">
						<div className="article-titles">
							<h5 className="card-title text-xs-center">{this.props.newsArticle.title}</h5>
							{this.props.newsArticle.subtitle && <h6 className="card-title text-xs-center">{this.props.newsArticle.subtitle}</h6>}
						</div>
					</div>
					<div className="article-card-details">
						<p className="card-text">{this.props.newsArticle.shortDescription}</p>
						<button className="text-to-read-more btn-ocustom standart-button-workflow" onClick={this.props.onRedirectClickHandler}>
							<Translate value="article_card_page_container_component.read_more"/>
						</button>
					</div>
					<ArticleFooter {...this.props} />
				</main>
			</article>
		);
	}
}


ArticleCard.propTypes = {
	hasProfileReadPrivilege: PropTypes.bool.isRequired,
	newsArticle: PropTypes.object.isRequired,
	onRedirectClickHandler: PropTypes.func.isRequired,
	onTagClick: PropTypes.func
};

export default ArticleCard;