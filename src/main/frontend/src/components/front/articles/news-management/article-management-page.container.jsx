import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Translate, I18n} from 'react-redux-i18n';
import {Link, browserHistory} from 'react-router';
import * as newsActions from '../../../../services/actions/news.actions';
import Authenticated from '../../../common/security/authenticated.container.jsx';
import * as articleActions from '../../../../services/actions/article.actions';
import Breadcrumb from '../../../common/layout/breadcrumb/breadcrumb.component.jsx';
import PageTitle from '../../../common/layout/page-title/page-title.component.jsx';
import Layout from '../../../common/layout/layout';
import ArticleManagementTabSwitcher from '../common/article-management/article-management-tab-switcher.component.jsx';
import ArticleManagement from '../common/article-management/article-management-tab.jsx';
import ArticleManagementTab from '../common/article-management/article-management-tab.component.jsx';
import ArticleElement from './article-element.container.jsx';
import NoItemsFound from '../common/article-management/no-items-found.component.jsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as ArticleStatus from '../common/article-status.constants';
import {setTimeout} from 'timers';
import LoaderComponent from '../../../common/loader/loader-component.jsx';

class NewsManagementPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news : this.props.news,
			filteredNews: this.props.news ? [...this.props.news] : [],
			saving: false,
			keyword: '',
			changeLang: true,
			activeTab: this.props.activeTab,
			loading: true
		};

		this._isMounted = false;
		
		this.layout = new Layout();
		this.onFilterNews = this.onFilterNews.bind(this);
		this.deleteNews = this.deleteNews.bind(this);
		this.onEditClickHandler = this.onEditClickHandler.bind(this);
		this.onPublishClickHandler = this.onPublishClickHandler.bind(this);
		this.onRedirectClickHandler = this.onRedirectClickHandler.bind(this);
		this.onDetailsClickHandler = this.onDetailsClickHandler.bind(this);
	}

	componentWillMount() {
		this._isMounted = true;
	}

	componentDidMount(){
		this.props.actions.listAllOfMyNews().then(() => setTimeout(() => {
			if (this._isMounted) {
				this.setState({loading: false});
			}
		}, 500));

		this.layout.initFixedSidebar();
		document.title = I18n.t('article_management_container.sub_title');
		this.setState({activeTab: ArticleStatus.DRAFT});
	}

	componentWillReceiveProps(nextProps) {
		this.layout.initFixedSidebar();
		if (this.props.currentLocale !== nextProps.currentLocale) {
			this.setState({changeLang: !this.state.changeLang}, () => {
				document.title = I18n.t('article_management_container.sub_title');
			});
		}

		if(this.state.news != nextProps.news){
			this.setState({news: nextProps.news});
		}

		if(this.state.filteredNews != nextProps.filteredNews){
			this.setState({filteredNews: nextProps.filteredNews});
		}

		if(this.state.filteredNews != nextProps.news){
			this.setState({filteredNews: [...nextProps.news]});
		}

		if(this.state.keyword != nextProps.keyword){
			this.setState({keyword: nextProps.keyword});
		}

		if (nextProps.activeTab) {
			this.setState({activeTab: nextProps.activeTab});
		}

		this.layout.initFixedSidebar();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	deleteNews(newsElement) {
		let newFilteredNews = [...this.state.filteredNews];
		if(newsElement){
			var index = newFilteredNews.indexOf(newsElement);
			if (index > -1) {
				this.setState({saving: true});

				if(this.props.actions.deleteNews(newsElement)){
					newFilteredNews.splice(index, 1);
					this.setState({
						filteredNews: newFilteredNews,
						saving: false
					});
				} else {
					this.setState({saving: false});
				}
			}
		}
	}

	onFilterNews(filterText) {
		let keyword = filterText.target.value;
		this.setState({
			filteredNews: this.state.news,
			keyword
		});

		if(this.state.news) {
			let filteredNews = this.state.news.filter(news => news.title.toLowerCase().startsWith(keyword.toLowerCase()));
			this.setState({filteredNews});
		}
	}

	getBreadCrumbNodes() {
		return [ {icon: 'fa fa-newspaper-o', label: 'article_management_container.main_title', url: '/news'},
			{icon: 'fa fa-file-text-o', label: 'article_management_container.sub_title'} ];
	}

	showCreateNews() {
		this.setState({showCreateNews: true});
	}

	onEditClickHandler(id) {
		this.props.actions.getSingleNews(id, true).then(() => browserHistory.push('news/article/edit'));		
	}

	onDetailsClickHandler(id) {
		this.props.actions.getSingleNewsForDetails(id, true).then(() => browserHistory.push('news/article/edit'));
	}

	onPublishClickHandler(id) {
		this.props.actions.getSingleNewsForPublish(id, true).then(() => browserHistory.push('news/article/publish'));	
	}

	onRedirectClickHandler(id) {
		this.props.actions.getSingleNews(id, true).then(() => browserHistory.push('news/article/' + id));
	}

	isArticleActive(article) {
		if (!article.endDate) {
			if (moment().isAfter(moment(article.startDate))) {
				return true;
			}
		} else if (moment().isAfter(moment(article.startDate)) && moment().isBefore(moment(article.endDate).add(1, 'days'))) {
			return true;
		}

		return false;
	}

	handleTabChange(activeTab) {
		this.props.actions.changeTab(activeTab.activeTab);
	}

	render() {
		this.layout = new Layout();
		return (
			<section className = "container-fluid" > 
				<PageTitle mainTitle="article_management_container.main_title" subTitle="article_management_container.sub_title"/> 
				<article className = "page-bar">
					<Breadcrumb nodes={this.getBreadCrumbNodes()}/>
					<div className="toolbar-link pull-right">
						<Link to={'/news/article/create'} className="text-xs-center btn btn-sm btn-ocustom">
							<i className="fa fa-pencil"></i> <Translate value="article_management_container.show_editor_label" />
						</Link>	  
					</div>
				</article>
				<article>
					<section className="container-fluid">
						<div className="row">
							<div className="portlet light article-management container-fluid-with-max-width">
								<ArticleManagement title="article_management.articles" keyword={this.state.keyword} onFilter={(filterText) => this.onFilterNews(filterText)} >
									<ArticleManagementTabSwitcher onSwitchBetweenTabs={(activeTab) => this.handleTabChange({activeTab})} activeTab={this.state.activeTab}/>
									<ArticleManagementTab name={ArticleStatus.DRAFT} activeTab={this.state.activeTab}>
										{
											this.state.loading ? 
												<LoaderComponent loading={this.state.loading} /> :
												this.state.filteredNews && this.state.filteredNews.filter(articleElement => articleElement.status == ArticleStatus.DRAFT).length > 0 ?
													this.state.filteredNews.filter(articleElement => articleElement.status == ArticleStatus.DRAFT)
												 		.map(articleElement => 
															<ArticleElement 
																key={articleElement.id} 
																article={articleElement} 
																onDelete={(article) => this.deleteNews(article)}
																onEditClickHandler={this.onEditClickHandler}
																onRedirectClickHandler={this.onRedirectClickHandler} 
																isActive={this.isArticleActive(articleElement)}
																onPublish={this.onPublishClickHandler}/>) :
													<NoItemsFound text="article_management.not_found_title"/>
										}
									</ArticleManagementTab>
									<ArticleManagementTab name={ArticleStatus.PUBLISHED} activeTab={this.state.activeTab}>
										{
											this.state.loading ? 
												<LoaderComponent loading={this.state.loading} /> :
												this.state.filteredNews && this.state.filteredNews.filter(articleElement => articleElement.status !== ArticleStatus.DRAFT).length > 0 ?
													this.state.filteredNews.filter(articleElement => articleElement.status !== ArticleStatus.DRAFT)
												 		.map(articleElement => 
															<ArticleElement 
																key={articleElement.id} 
																article={articleElement} 
																onDelete={(article) => this.deleteNews(article)}
																onEditClickHandler={this.onEditClickHandler}
																onRedirectClickHandler={this.onRedirectClickHandler} 
																isActive={this.isArticleActive(articleElement)}
																onDetailsClickHandler={this.onDetailsClickHandler}/>) :
													<NoItemsFound text="article_management.not_found_title"/>
										}
									</ArticleManagementTab>
								</ArticleManagement>
							</div> 
						</div>
					</section>
				</article>
			</section>
		);
	}
}

NewsManagementPage.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
	return {
		news: state.news,
		currentLocale: state.currentLocale,
		activeTab: state.activeTab
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, newsActions, articleActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsManagementPage);
