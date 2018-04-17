import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as newsActions from '../../../../services/actions/news.actions';
import SecurityService from '../../../../services/services/security.service';
import PropTypes from 'prop-types';
import InfiniteScroll from '../../common/infinite-scroller/infinite-scroll.component.jsx';
import ArticleCard from '../../articles/common/article-card/article-card.container.jsx';
import {Translate, I18n} from 'react-redux-i18n';
import NoNewsData from '../../articles/news-management/list-news/no-news-data.component.jsx';
import PageHeader from './page-header.component.jsx';
import {setTimeout} from 'timers';

class NewsViewPageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			news: this.props.news,
			employeesPerArticle: this.props.employeesPerArticle,
			hasProfileReadPrivilege: SecurityService.access(this.props.authenticatedUser, 'hasPrivilege[people.profile:read]'),
			loadAsynchData: false,
			filterCriteria: {desiredPage: 0, hasMoreItems: true, filterByTag: this.props.params['tag'] !== undefined ? this.props.params['tag'] : null},
			hasFilterByTag: this.props.params['tag'] !== undefined,
			showEmptyData: false,
			loading: true,
			currentLocale: this.props.currentLocale,
			polls: this.props.polls,
			statsModalIsOpen: false
		};

		this.listCurrentNews = this.listCurrentNews.bind(this);	
		this.hasMoreNews = this.hasMoreNews.bind(this);	
		this.onTagClick = this.onTagClick.bind(this);
		this.onClickStats = this.onClickStats.bind(this);
		this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this);
		this._isMounted = false;
		this.settings = {
			centerMode: true,
			centerPadding: '0px',
			className: 'col-xs-9 poll-carousel',
			infinite: true,
			slidesToShow: 3,
			speed: 700,
			dots: true, 
			pauseOnHover: true,
			autoplay: true,
			autoplaySpeed: 2000
		};
	}
	componentWillMount() {
		this._isMounted = true;
	}

	componentDidMount() {
		document.title = I18n.t('article_management_container.main_title');
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.news !== nextProps.news) {
			this.setState({
				news: nextProps.news, 
				showEmptyData: nextProps.news.length == 0
			});
		}

		if (this.state.authenticatedUser != nextProps.authenticatedUser) {
			this.setState({authenticatedUser:nextProps.authenticatedUser});
			this.setState({hasProfileReadPrivilege: SecurityService.access(this.props.authenticatedUser, 'hasPrivilege[people.profile:read]')});
		}

		if (this.state.currentLocale !== nextProps.currentLocale) {
			this.setState({currentLocale: nextProps.currentLocale}, () => {
				document.title = I18n.t('article_management_container.main_title');
			});
		}

		if(this.props.params != nextProps.params) {
			let filterCriteria = Object.assign({}, this.state.filterCriteria);
			filterCriteria.filterByTag = nextProps.params['tag'] == undefined ? null : nextProps.params['tag'];
			this.setState({filterCriteria, showEmptyData: true, loading: true}, () => {
				this.props.actions.clearNewsContent(); 
				this.listCurrentNews();
			});
		}

		if (this.state.polls !== nextProps.polls) {
			this.setState({polls: nextProps.polls});
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	/**
	 * OnClick handler, which redirects to news filter by tag page
	 * @param {string} tagName - The name of the tag
	 */
	onTagClick(tagName) {
		let newCriteria = Object.assign({}, this.state.filterCriteria, {filterByTag: tagName, desiredPage: 0});
		this.setState({filterCriteria: newCriteria}, () => {
			this.context.router.push(`/news/filter-by/${tagName}`);
		});
	}

	/**
	 * List current news with pagination
	 */
	listCurrentNews() {
		let filterCriteria = Object.assign({}, this.state.filterCriteria);
		filterCriteria.desiredPage++;
		this.setState({loadAsynchData: true, filterCriteria}, () => {
			this.props.actions.listCurrentNews(filterCriteria).then(() => {
				this.setState({
					loadAsynchData: false, 
					filterCriteria, 
					showEmptyData: this.state.news.length == 0
				}, () => {
					setTimeout(() => {
						if (this._isMounted) {
							this.setState({loading: false});
						}
					}, 1000);
				});
			});
		});
	}

	/**
	 * Checks are there more news
	 */
	hasMoreNews() {
		return this.state.filterCriteria.hasMoreItems && !this.state.loadAsynchData;
	}

	/**
	 * Redirect handler, whiche determines the correct link
	 */
	onRedirectClickHandler(id) {
		browserHistory.push('news/article/' + id);
	}

	/**
	 * Shows the stats modal
	 * @param {*Number} pollId 
	 */
	onClickStats(pollId) {
		document.body.style.overflow = 'hidden';

		this.props.actions.getSinglePoll(pollId);
		this.setState({statsModalIsOpen : true});
	}

	/**
	 * hides the stats modal
	 * @param e 
	 */
	handleModalCloseRequest(e) {	
		e.preventDefault();
		document.body.style.overflow = 'auto';

		this.setState({
			statsModalIsOpen: false
		});
	}

	render() {
		if (this.state.showEmptyData) {
			return (
				<div>
					<PageHeader/>
					<LoaderComponent loading={this.state.loading} />
					<NoNewsData loading={this.state.loading} />
				</div>
			);
		}

		return (
			<div className="home-page-wrapper">
				<PageHeader/>
				<section className="container-fluid">
					{this.state.hasFilterByTag && 
						<article className="filter-by-tag text-xs-center">
							<h3><Translate value={'news_page.filtration_by_tag'} tag={this.props.params['tag'] !== undefined ? this.props.params['tag'] : ''} /></h3>
						</article>
					}
					<article className="news-list-wrapper">
						<InfiniteScroll
							pageStart={0}
							loadMore={this.listCurrentNews}
							hasMore={this.hasMoreNews()}
							useWindow={true}
							threshold={500} >
							{this.state.news.map((newsArticle) => 
								<div key={`article-wrapper-${newsArticle.id}`} className="news-wrapper col-xs-12 col-md-6 col-xl-4">
									<ArticleCard
										key={`article-card-${newsArticle.id}`}
										newsArticle={newsArticle}
										hasProfileReadPrivilege={this.state.hasProfileReadPrivilege}
										onTagClick={this.onTagClick}
										onRedirectClickHandler={() => this.onRedirectClickHandler(newsArticle.id)}
									/>
								</div>
							)}
						</InfiniteScroll>
					</article>				
				</section>
			</div>
		);
	}
}

NewsViewPageContainer.propTypes = {
	actions: PropTypes.object.isRequired,
	authenticatedUser: PropTypes.object.isRequired,
	news: PropTypes.array.isRequired,
};

NewsViewPageContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
	return {
		news: state.news,
		authenticatedUser: state.authenticatedUser,
		currentLocale: state.currentLocale
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(newsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsViewPageContainer);