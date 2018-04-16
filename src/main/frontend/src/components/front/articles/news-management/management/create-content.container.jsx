import React from 'react';
import NotificationService from '../../../../../services/services/notification.service';
import CreateContentComponent from './create-content.component.jsx';
import {I18n} from 'react-redux-i18n';
import {bindActionCreators} from 'redux';
import * as newsActions from '../../../../../services/actions/news.actions.js';
import * as articleActions from '../../../../../services/actions/article.actions.js';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

class CreateContentContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newsType: this.props.newsType,
			isRedirecting: this.props.isRedirecting,
			isForSave: false,
			isMetaDataShown: false,
			singleNews: this.props.singleNews,
			tempFiles: this.props.tempFiles,
			deletedFiles: this.props.deletedFiles
		};
		this.bindEventHandlers();
	}
    
	bindEventHandlers() {
		this.onChangeContent = this.onChangeContent.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
	}
        
	componentWillReceiveProps(nextProps) {
		if (nextProps.newsType) {
			this.setState({isForSave: nextProps.isForSave, newsType: nextProps.newsType});
		}

		if (this.state.isForSave !== nextProps.isForSave) {
			this.setState({isForSave: nextProps.isForSave});
		}

		if (this.state.isRedirecting !== nextProps.isRedirecting) {
			
			this.setState({isRedirecting: nextProps.isRedirecting});
		}
		if (nextProps.singleNews && nextProps.singleNews.title) {
			this.setState({title: nextProps.singleNews.title, subtitle: nextProps.singleNews.subtitle, singleNews: nextProps.singleNews});
		}

		if (!(_.isEqual(this.state.tempFiles.sort(), nextProps.tempFiles.sort()))) {
			this.setState({tempFiles: nextProps.tempFiles});
		}

		if (!(_.isEqual(this.state.deletedFiles.sort(), nextProps.deletedFiles.sort()))) {
			this.setState({deletedFiles: nextProps.deletedFiles});
		}
	}
    
	onChangeContent(event) {
		let newsToUpdate = {};
		if (event.target.name === 'title') {
			newsToUpdate = Object.assign({}, this.state.singleNews, {title: event.target.value});
		} else if (event.target.name === 'subtitle') {
			newsToUpdate = Object.assign({}, this.state.singleNews, {subtitle: event.target.value});
		}
		this.setState({singleNews: newsToUpdate});
	}
    
	saveHandler(body, type) {
		const title = this.state.singleNews.title || '';
		const subtitle = this.state.singleNews.subtitle || '';
		const bodyAsJson = JSON.parse(body);
		const block = bodyAsJson.blocks[0];
		if (!title || title.trim().length === 0) {
			NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.title_required'));
			return;
		} else if (block.text.trim().length === 0 && block.type !== 'image' && block.type !== 'video') {
			NotificationService.notifyError(I18n.t('wysiwyg_editor_labels.content_required'));
			return;
		}
		const news = {
			body,
			title,
			subtitle,
		};
		if (this.state.singleNews.id) {
			news.id = this.state.singleNews.id;
		}

		if (!this.state.singleNews.idUser) {			
			news.idUser = this.props.idUser;
		}

		news.deletedFiles = this.state.deletedFiles;
		news.articleFiles =  this.state.tempFiles;

		this.props.createOrUpdateArticle(news);
		if (type === 'metadata') {
			this.props.onNext(news);
		}		
	}
    
	render() {
		return (
			<CreateContentComponent
				onChangeContent={this.onChangeContent}
				saveHandler={this.saveHandler}
				newsType={this.state.newsType}
				getBreadCrumbNodes={this.getBreadCrumbNodes}
				singleNews={this.state.singleNews}
				isEditable={true}
				bodyPlaceholder={this.props.bodyPlaceholder}
				isMetadataButtonHidden={this.props.isMetadataButtonHidden}
			/>
		);        
	}
}

function mapStateToProps(state) {
	return {
		idUser: state.authenticatedUser ? state.authenticatedUser.id : null,
		tempFiles: state.tempFiles,
		deletedFiles: state.deletedFiles
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, newsActions, articleActions), dispatch)
	};
}

CreateContentContainer.propTypes = {
	idUser: PropTypes.number,
	singleNews: PropTypes.object,
	tempFiles: PropTypes.array,
	deletedFiles: PropTypes.array,
	isMetadataButtonHidden: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer);
