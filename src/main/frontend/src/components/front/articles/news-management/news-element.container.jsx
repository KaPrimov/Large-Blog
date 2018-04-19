import React from 'react';
import {Translate, I18n} from 'react-redux-i18n';
import FontAwesome from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import SecurityService from '../../../../services/services/security.service';
import * as newsAction from '../../../../services/actions/news.actions';
import * as ArticleStatus from '../common/article-status.constants';

class ArticleElement extends React.Component{
	constructor(props){
		super(props);

		this.state={
			article: this.props.article,
			usersPerArticle: this.props.usersPerArticle,
			modalIsOpen: false,
			hasProfileReadPrivilege: SecurityService.access(this.props.authenticatedUser, 'hasPrivilege[people.profile:read]')			
		};

		this.generateToolTip = this.generateToolTip.bind(this);
	}
    
	componentWillReceiveProps(nextProps) {
		if(this.state.usersPerArticle !== nextProps.usersPerArticle){
			this.setState({usersPerArticle: nextProps.usersPerArticle});
		}
		if (this.state.authenticatedUser != nextProps.authenticatedUser) {
			this.setState({authenticatedUser:nextProps.authenticatedUser});
		}	
	}
	generateToolTip() {
		const article = this.state.article;
		let tooltipData = {};
		if (this.props.isActive) {
			if (article.endDate) {
				tooltipData = Object.assign({}, 
					{tooltip: I18n.t('article_management.article_is_active_until', {endDate: moment(article.endDate).format('DD/MM/YYYY')}),
						className: 'active-label', 
						value: 'article_management.active_label'});
			} else {
				tooltipData = Object.assign({}, 
					{tooltip: I18n.t('article_management.article_is_active_since', {startDate: moment(article.startDate).format('DD/MM/YYYY')}), 
						className: 'active-label', 
						value: 'article_management.active_label'});
			}
		} else {
			if (moment().isBefore(article.startDate)) {
				tooltipData = Object.assign({}, 
					{tooltip: I18n.t('article_management.article_is_inactive_until', {startDate: moment(article.startDate).format('DD/MM/YYYY')}), 
						className: 'future-active-label', 
						value: 'article_management.future_active_label'});
			} else if (moment().isAfter(article.endDate)) {
				tooltipData = Object.assign({}, 
					{tooltip: I18n.t('article_management.article_is_inactive_since', {endDate: moment(article.endDate).format('DD/MM/YYYY')}), 
						className: 'inactive-label', 
						value: 'article_management.inactive_label'});
			}
		}
		return tooltipData;
	}

	render() {
		const articleTooltipData = this.generateToolTip();
		return (  
			<article key={this.props.article.id} className="article-element row">
				<div className="col-sm-12 col-sm-6 col-lg-5 align-right article-titles">
					<div className="capital-title">
						{this.props.article.title}
					</div>
					<br />
					<div>
						{this.props.article.subtitle}
					</div>
				</div>
				<div className="col-sm-12 col-sm-6 col-lg-7 inline-block row" >
					<ul className="nav-icons">
						<li className="nav-icons-bar-item col-sm-4 col-lg-2" onClick={() => this.props.onRedirectClickHandler(this.props.article.id)}>
							<FontAwesome name='external-link' className="nav-icon-text"/>
							<span className="nav-icons-label-open">
								<Translate value="article_management.open" />
							</span>
						</li>
						<li className="nav-icons-bar-item col-sm-4 col-lg-2" onClick={() => this.props.onEditClickHandler(this.props.article.id)}>
							<FontAwesome name='pencil' />
							<span className="nav-icons-label">
								<Translate value="article_management.edit" />
							</span>
						</li>

						{this.state.article.status === ArticleStatus.PUBLISHED &&
							<li className="nav-icons-bar-item col-sm-4 col-lg-2" onClick={() => this.props.onDetailsClickHandler(this.props.article.id)}>
								<FontAwesome name='search'/>
								<span className="nav-icons-label">
									<Translate value="article_management.details" />
								</span>
							</li>
						}
						<li className="nav-icons-bar-item col-sm-4 col-lg-2" onClick={() => this.props.onDelete(this.props.article)}>
							<FontAwesome name='times'/>
							<span className="nav-icons-label">
								<Translate value="article_management.delete" />
							</span>
						</li>
						{this.state.article.status === ArticleStatus.DRAFT && 
							<li className="nav-icons-bar-item col-sm-4 col-lg-2" onClick={() => this.props.onPublish(this.props.article.id)}>
								<FontAwesome name='arrow-right'/>
								<span className="nav-icons-label">
									<Translate value="article_management.publish" />
								</span>
							</li>
						}
						{this.state.article.status !== ArticleStatus.DRAFT && (							
							<li className={this.state.article.status === ArticleStatus.PUBLISHED ? 'nav-icons-bar-item col-sm-4 col-lg-2' : 'nav-icons-bar-item col-sm-8 col-lg-4'} onClick={() => this.props.onPublish(this.props.article.id)}>
								<span className={`${articleTooltipData.className} pull-right`} data-tip={articleTooltipData.tooltip} data-for={`id-${this.props.article.id}`}><Translate value={articleTooltipData.value}/></span>
								<ReactTooltip id={`id-${this.props.article.id}`} />
							</li>) 						
						}
					</ul>
				</div>
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersPerArticle: state.usersPerArticle,
		authenticatedUser: state.authenticatedUser
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(newsAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleElement);


