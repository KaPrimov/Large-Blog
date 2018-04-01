import React from 'react';
import {Translate} from 'react-redux-i18n';
import ArticleCard from '../../common/article-card/article-card.container.jsx';
import {Link} from 'react-router';

const PublishArticleComponent = ({singleNews, finish, onRedirectClickHandler}) => {
	return (
		<section className='container create-article-editor'>
			<div className='row'>
				<div className='portlet light article-management'>
					<div className="portlet-title">
						<span className="caption"><Translate value="article_management_container.publish_label" /></span>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='portlet light article-management'>
					<div className='article-management-element'>
						<ArticleCard
							newsArticle={singleNews}
							hasProfileReadPrivilege={true}
							onRedirectClickHandler={() => onRedirectClickHandler(singleNews.id)}
						/>
					</div>
					{!finish && (
						<div className="row text-xs-center">
							<Translate value="article_management.saving" />
							<i className="fa fa-refresh fa-spin fa-fw margin-bottom"></i>
						</div>
					)}
					{finish && (
						<div className="row">
							<div className='row mx-auto'>
								<Link to='news/article-management' className="btn btn-sm btn-ocustom col-xs-6 create-metadata-button offset-xs-3">
									<Translate value="article_management.to_all_articles" />
								</Link>
							</div>
						</div>
					)}					
				</div>
			</div>
			
		</section>
	);
};

export default PublishArticleComponent;