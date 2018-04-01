import React from 'react';
import PropTypes from 'prop-types';
import ArticleAPI from '../../../../../services/api/article.api';
import Img from '../../../../common/img-smooth-loading/img.component.jsx';

const ArticleHeader = ({newsArticle, onTagClick}) => {
	return (
		<header>
			<figure className="main-image">
				{newsArticle && (newsArticle.imagePath) ? 
					<Img imgClasses="article-image" placeholder={'/assets/images/default-photo.png'} src={ArticleAPI.getArticlePhotoPathByArticleId(newsArticle.id)} alt=""/>:        
					<Img imgClasses="default-image" placeholder={'/assets/images/default-photo.png'} src="/assets/images/default-photo.png" />}
			</figure>
			{newsArticle.tags &&
			<div className="reader-tag-bar-items">
				{newsArticle.tags.map((tag, i)  => (<button key={i} onClick={() => onTagClick(tag.name)} type="button" className="btn btn-default btn-round-xs btn-xs">{tag.name}</button>))}
			</div>
			}
		</header>
	);
};

ArticleHeader.propTypes = {
	newsArticle: PropTypes.object.isRequired,
	onTagClick: PropTypes.func
};

export default ArticleHeader;