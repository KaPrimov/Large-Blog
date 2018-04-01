import React from 'react';
import CreateContentContainer from './create-content.container.jsx';
import MetaDataInputContainer from './meta-data-input.container.jsx';
import PublishArticleComponent from './publish-article.component.jsx';
import PageTitle from '../../../../common/layout/page-title/page-title.component.jsx';
import Breadcrumb from '../../../../common/layout/breadcrumb/breadcrumb.component.jsx';
import {Link, withRouter, browserHistory} from 'react-router';
import {Translate, I18n} from 'react-redux-i18n';
import * as newsActions from '../../../../../services/actions/news.actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NewsCreationWizard from '../../common/article-management/news-creation-wizard.component.jsx';
import Layout from '../../../../common/layout/layout';
import * as ArticleStatus from '../../common/article-status.constants.js';
import PropTypes from 'prop-types';


class CreateNewsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isForSave: false,
			isMetaDataShown: false,
			singleNews: this.props.singleNews,
			activeAddContentStep: true,
			doneAddContentStep: false,
			activeMetadataStep: false,
			doneMetadataStep: false,
			activePublishStep: false,
			donePublishStep: false,
			previousStep: '',
			finish: false,
			isFromArticleManagement: this.props.isFromArticleManagement,
			status: this.props.singleNews.status,
			currentLocale: this.props.currentLocale,
			isMetadataButtonHidden: false
		};

		this.layout = new Layout();
		this.bindEventHandlers();
		this.creationLabels = {
			content: {
				data: 'news_creation_wizard_component.element_content.data',
				sub: 'news_creation_wizard_component.element_content.sub'
			},
			metadata: {
				data: 'news_creation_wizard_component.element_metadata.data',
				sub: 'news_creation_wizard_component.element_metadata.sub'
			},
			publish: {
				data: 'news_creation_wizard_component.element_publish.data',
				sub: 'news_creation_wizard_component.element_publish.sub'
			}
		};
	}

	componentWillReceiveProps(nextProps) {
		this.layout.initFixedSidebar();
		if (nextProps.singleNews) {
			this.setState({singleNews: nextProps.singleNews});
		}
		if (nextProps.isFromArticleManagement !== this.state.isFromArticleManagement) {
			this.setState({isFromArticleManagement: nextProps.isFromArticleManagement});
		}

		if (this.state.currentLocale !== nextProps.currentLocale) {
			this.setState({currentLocale: nextProps.currentLocale}, () => {
				document.title = I18n.t('article_management_container.show_editor_label');
			});
		}
	}

	componentDidMount() {
		this.layout.initFixedSidebar();
		document.title = I18n.t('article_management_container.show_editor_label');
		if (this.props.router.getCurrentLocation().pathname.toLowerCase() === '/news/article/publish' ||
			this.props.router.getCurrentLocation().pathname.toLowerCase() === '/news/article/edit') {
			if (this.props.singleNews === {} || !this.props.singleNews.id) {
				this.props.router.push('/news');
			}
		}
		if (this.props.singleNews.isForPublish) {
			this.setState({
				activeMetadataStep: true,
				doneMetadataStep: false,
				activePublishStep: false,
				activeAddContentStep: false,
				doneAddContentStep: true,
				singleNews: this.props.singleNews,
				previousStep: 'addContent'
			});
		} else if (this.props.singleNews.isForDetails) {
			this.setState({
				activeMetadataStep: true,
				doneMetadataStep: false,
				activePublishStep: false,
				activeAddContentStep: false,
				doneAddContentStep: true,
				singleNews: this.props.singleNews,
				previousStep: 'addContent'
			});
		} else if (this.props.singleNews.status === ArticleStatus.PUBLISHED) {
			this.setState({
				activeAddContentStep: true,
				doneAddContentStep: false,
				activeMetadataStep: false,
				doneMetadataStep: false,
				activePublishStep: false,
				donePublishStep: false,
				singleNews: this.props.singleNews,
				isMetadataButtonHidden: true,
				previousStep: ''
			});
		}
	}

	onAddContentStepDone(news) {
		this.setState({
			activeAddContentStep: false,
			doneAddContentStep: true,
			activeMetadataStep: true,
			doneMetadataStep: false,
			singleNews: news,
			previousStep: 'addContent'
		});
		this.layout.initFixedSidebar();
	}

	onMetadataStepDone(news) {
		this.layout.initFixedSidebar();
		this.props.actions.updateMetadataHandler(news).then(() => {
			this.setState({
				activeMetadataStep: false,
				doneMetadataStep: true,
				activePublishStep: true,
				singleNews: news,
				previousStep: 'metadata'
			}, () => {
				this.props.actions.publishNews(news).then(() => {
					this.setState({finish: true});
				});
			});
		});
		
	}

	onMetadataStepBack(news) {
		this.setState({
			activeMetadataStep: false,
			doneMetadataStep: false,
			doneAddContentStep: false,
			activeAddContentStep: true,
			previousStep: 'metadata',
			singleNews: news
		});
		this.layout.initFixedSidebar();
	}

	onPublishedStepBack(news) {
		this.setState({
			activePublishStep: false,
			donePublishStep: false,
			activeMetadataStep: true,
			doneMetadataStep: false,
			previousStep: 'publish',
			singleNews: news
		});
		this.layout.initFixedSidebar();
	}

	bindEventHandlers() {
		this.onAddContentStepDone = this.onAddContentStepDone.bind(this);
		this.onMetadataStepDone = this.onMetadataStepDone.bind(this);
		this.onMetadataStepBack = this.onMetadataStepBack.bind(this);
		this.onRedirectClickHandler = this.onRedirectClickHandler.bind(this);
	}	

	getBreadCrumbNodes() {
		return [{icon: 'fa fa-newspaper-o', label: 'article_management_container.main_title', url: '/news'},
			{icon: 'fa fa-file-text-o', label: 'news_layout_container.articles', url: '/news/article-management'},
			{icon: 'fa fa-pencil', label: 'article_management_container.show_editor_label'}];
	}

	onRedirectClickHandler(id) {
		this.props.actions.getSingleNews(id, false).then(() => browserHistory.push('news/article/' + id));
	}

	render() {
		return (
			<section className="container-fluid" >
				<PageTitle mainTitle="article_management_container.main_title" subTitle="article_management_container.show_editor_label" />
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
					{this.state.singleNews.status !== ArticleStatus.PUBLISHED && 
						<NewsCreationWizard 
							activeAddContentStep={this.state.activeAddContentStep}
							doneAddContentStep={this.state.doneAddContentStep}
							activeMetadataStep={this.state.activeMetadataStep}
							doneMetadataStep={this.state.doneMetadataStep}
							activePublishStep={this.state.activePublishStep}
							donePublishStep={this.state.donePublishStep}
							status={this.state.status}
							creationLabels={this.creationLabels}
						/>
					}
					{this.state.activeAddContentStep && <CreateContentContainer 
						onNext={this.onAddContentStepDone} 
						previousStep={this.state.previousStep} 
						createOrUpdateArticle={this.props.actions.createOrUpdateNews} 
						singleNews={this.state.singleNews} 
						bodyPlaceholder={I18n.t('wysiwyg_editor_labels.body_placeholder')}
						isMetadataButtonHidden={this.state.isMetadataButtonHidden}/>}
					{this.state.activeMetadataStep && <MetaDataInputContainer ref="metaDataInputContainer" 
						onNext={this.onMetadataStepDone} 
						onBack={this.onMetadataStepBack} 
						previousStep={this.state.previousStep}
						singleNews={this.state.singleNews}
					/> }
					{this.state.activePublishStep && <PublishArticleComponent 
						onPublish={this.onPublishedStepDone} 
						onBack={this.onPublishedStepBack} 
						singleNews={this.state.singleNews} 
						finish={this.state.finish}
						onRedirectClickHandler={this.onRedirectClickHandler}
					/> }
				</section>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		singleNews: state.createNews,
		isFromArticleManagement: state.isFromArticleManagement,
		currentLocale: state.currentLocale
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(newsActions, dispatch)
	};
}

CreateNewsContainer.propTypes = {
	singleNews: PropTypes.object,
	isFromArticleManagement: PropTypes.bool,
	currentLocale: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewsContainer));
