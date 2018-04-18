import React from 'react';
import {Translate, Localize, I18n} from 'react-redux-i18n';
import ArticleAPI from '../../../../../services/api/article.api';
import NewsAPI from '../../../../../services/api/news.api';
import NewsErrorMessageCodeHandler from '../../../../../services/error-handlers/news-error-message-code-handler';
import NewsWysiwygEditor from '../management/news-wysiwyg-editor.container.jsx';
import * as newsActions from '../../../../../services/actions/news.actions';
import SecurityService from '../../../../../services/services/security.service' ;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import NotificationService from '../../../../../services/services/notification.service';

class ArticleViewPageContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
        
		this.state = {
			articleElement: null,
			imagePath: '',
			authenticatedUser: this.props.authenticatedUser,
			isFromArticleManagement: this.props.isFromArticleManagement,
			hasProfileReadPrivilege: SecurityService.access(this.props.authenticatedUser, 'hasPrivilege[people.profile:read]'),
			currentLocale: this.props.currentLocale
		};
		this.loadPageData = this.loadPageData.bind(this);
		this.markNewsAsSeen = this.markNewsAsSeen.bind(this);
		this.checkIfUserIsEligible = this.checkIfUserIsEligible.bind(this);
		this.redirectToNewsPage = this.redirectToNewsPage.bind(this);
		this.loadNewsInState = this.loadNewsInState.bind(this);
	}
    
	componentDidMount() {
		this.checkIfUserIsEligible();
		document.title = I18n.t('article_management_container.show_view_label');
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.authenticatedUser !== nextProps.authenticatedUser) {
			this.setState({authenticatedUser: nextProps.authenticatedUser});
		}

		if (nextProps.isFromArticleManagement !== undefined) {
			this.setState({isFromArticleManagement: nextProps.isFromArticleManagement});
		}

		if (this.state.currentLocale !== nextProps.currentLocale) {
			this.setState({currentLocale: nextProps.currentLocale}, () => {
				document.title = I18n.t('article_management_container.show_view_label');
			});
		}
	}

	loadPageData(news) {
		this.setState({articleElement: news, imagePath: ArticleAPI.getArticlePhotoPathByArticleId(news.id)});
		this.loadNewsInState(news);
		this.markNewsAsSeen(news.id);
	}

	markNewsAsSeen(id) {
		this.props.actions.markNewsAsSeen(id);
	}

	loadNewsInState(news) {
		this.props.actions.saveNewsInState(news);
	}

	redirectToNewsPage() {
		NotificationService.notifyWarning(I18n.t('article_management_container.user_not_eligible'));
		this.context.router.push('/news');
	}
	

	getBreadCrumbNodes() {
		return [{icon: 'fa fa-newspaper-o', label: 'article_management_container.main_title', url: '/news'},
			{icon: 'fa fa-file-text-o', label: 'article_management_container.article'}];
	}

	checkIfUserIsEligible() {
		NewsAPI.getNewsWithId(this.props.params.id).then(news => {			
			this.loadPageData(news);						
		}).fail(error => {
			let errorMessageCodeHandler = new NewsErrorMessageCodeHandler();
			NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
		});
	}

	render() {
		return (
			<section className="container-fluid" >
				<section className='create-article-editor'>
					<div>
						<div className='portlet light article-management'>
							<div className='article-view-element'>
								{this.state.articleElement && 
									<section>
										<h6><Translate value="article_management_container.date_of_publish"/>
											<Localize value={this.state.articleElement.startDate} dateFormat="date.l" /></h6>
										<NewsWysiwygEditor 
											isReadOnly={true}
											titleValue={this.state.articleElement.title}
											subtitleValue={this.state.articleElement.subtitle}
											imagePath={this.state.imagePath}
											singleNews={this.state.articleElement}/>
										{/* <ArticleFooterComponent newsArticle={this.state.articleElement} hasProfileReadPrivilege={this.state.hasProfileReadPrivilege} /> */}
									</section>
								}
							</div>
						</div>
					</div>
				</section>
			</section>
		);
	}
}

ArticleViewPageContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
	return {
		authenticatedUser: state.authenticatedUser,
		isFromArticleManagement: state.isFromArticleManagement,
		currentLocale: state.currentLocale
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(newsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleViewPageContainer);