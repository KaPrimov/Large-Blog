import React from 'react';
import {Link} from 'react-router';
import {Translate, Localize, I18n} from 'react-redux-i18n';
import PageTitle from '../../../../common/layout/page-title/page-title.component.jsx';
import Breadcrumb from '../../../../common/layout/breadcrumb/breadcrumb.component.jsx';
import NewsAPI from '../../../../../services/api/news.api';
import OfficeAPI from '../../../../../services/api/office.api';
import ArticleAPI from '../../../../../services/api/article.api';
import NewsWysiwygEditor from '../management/news-wysiwyg-editor.container.jsx';
import Layout from '../../../../common/layout/layout';
import * as newsActions from '../../../../../services/actions/news.actions';
import NewsErrorMessageCodeHandler from '../../../../../services/services/error-handlers/news-error-message-code-handler';
import SecurityService from '../../../../../services/services/security.service' ;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as ArticleConstants from '../../common/article-status.constants';
import NotificationService from '../../../../../services/services/notification.service';
import ArticleFooterComponent from '../../common/article-card/article-footer.component.jsx';

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
		this.layout = new Layout();
		this.loadPageData = this.loadPageData.bind(this);
		this.markNewsAsSeen = this.markNewsAsSeen.bind(this);
		this.checkIfUserIsEligible = this.checkIfUserIsEligible.bind(this);
		this.redirectToNewsPage = this.redirectToNewsPage.bind(this);
		this.loadNewsInState = this.loadNewsInState.bind(this);
	}
    
	componentDidMount() {
		this.checkIfUserIsEligible();
		this.layout.initFixedSidebar();
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
	
	checkIfUserIsEligible() {
		NewsAPI.getNewsWithId(this.props.params.id).then(news => {
			if(news.employee.id == this.state.authenticatedUser.userId) {
				this.loadPageData(news);				
			} else {
				if(moment(news.startDate).startOf('day').isBefore(moment(new Date())) 
						&& (news.endDate == null || moment(news.endDate).isAfter(moment(new Date())) ) 
						 && news.status == ArticleConstants.PUBLISHED){
					
					if(news.targetEmployees.filter(te => te.id == this.state.authenticatedUser.userId).length != 0 ) {
						this.loadPageData(news);		
						return;								
					} else {
						OfficeAPI.findOfficeOfLoggedUser().then(officeId => {
							if(news.targetOffices.indexOf(officeId) != -1) {
								this.loadPageData(news);	
								return;																	
							} else {
								this.redirectToNewsPage();
							} 
						});
					}
				} else {
					this.redirectToNewsPage();
				}
			}
		}).fail(error => {
			let errorMessageCodeHandler = new NewsErrorMessageCodeHandler();
			NotificationService.notifyError(errorMessageCodeHandler.generateMessage(error));
		});
	}

	getBreadCrumbNodes() {
		return [{icon: 'fa fa-newspaper-o', label: 'article_management_container.main_title', url: '/news'},
			{icon: 'fa fa-file-text-o', label: 'article_management_container.article'}];
	}

	render() {
		return (
			<section className="container-fluid" >
				<PageTitle mainTitle="article_management_container.main_title" subTitle="article_management_container.show_view_label" />
				<article className="page-bar">
					<Breadcrumb nodes={this.getBreadCrumbNodes()} />
					<div className="toolbar-link pull-right">
						{this.state.isFromArticleManagement ?
							<Link to={'/news/article-management'} className="text-xs-center btn btn-sm btn-ocustom">
								<i className="fa fa-file-text-o"></i> <Translate value="article_management_container.back_to_management_button" />
							</Link>
							:
							<Link to={'/news'} className="text-xs-center btn btn-sm btn-ocustom">
								<i className="fa fa-file-text-o"></i> <Translate value="article_management_container.back_to_news_button" />
							</Link>
						} 
					</div>
				</article>
				<section className='container create-article-editor'>
					<div className='row'>
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
										<ArticleFooterComponent newsArticle={this.state.articleElement} hasProfileReadPrivilege={this.state.hasProfileReadPrivilege} />
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