import React from 'react';
import {Dante, DanteEditor} from './es/index';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tempFilesActions from '../../../services/actions/temp-files.actions';
import * as articleActions from '../../../services/actions/article.actions';
import {Map, fromJS} from 'immutable';
import defaultOptions from './generate-default-options';

class WysiwygEditor extends React.Component {
	constructor(props) {
		super(props);
		let config = Map(fromJS(defaultOptions(this.props.isReadOnly, this.props.saveHandler, this.deleteImageHandler, 
			this.props.isTooltipHidden, this.props.showHeadings, this.props.bodyPlaceholder)));
		this.options = config.mergeDeep({}).toJS();
		this.state = {
			article: this.props.article,
			currentLocale: this.props.currentLocale,
			isForRefresh: false,
			isMetadataButtonHidden: this.props.isMetadataButtonHidden
		};
		this.deleteImageHandler = this.deleteImageHandler.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.article && nextProps.article != {}) {
			this.setState({article: nextProps.article});
		}

		if (nextProps.currentLocale != undefined && nextProps.currentLocale !== this.state.currentLocale) {
			this.setState({isForRefresh: true});
		} else {
			this.setState({isForRefresh: false});
		}

		if (this.state.isMetadataButtonHidden !== nextProps.isMetadataButtonHidden) {
			this.setState({isMetadataButtonHidden: nextProps.isMetadataButtonHidden});
		}

		if (this.state.isForRefresh) {
			this.forceUpdate();
		}
	}

	deleteImageHandler(imageDataMap) {
		if (imageDataMap.get('id') === null) {
			return;
		}
		const matchingImage = this.state.article.articleFiles.filter(file => file.fileName === imageDataMap.get('name'))[0];
		let articleFileDTO = {
			tempFileUploadId: imageDataMap.get('id'),
			fileName: imageDataMap.get('name'),
			articleId: this.state.article.id ? this.state.article.id : -1,
			articleFileId: matchingImage ? matchingImage.articleFileId : -1
		};
		if (articleFileDTO.articleFileId !== -1) {
			this.props.actions.markFileForDelete(articleFileDTO);
		} else {
			this.props.actions.deleteFile(articleFileDTO);
		}
	}
	

	render() {

		return(
			<div id='dante-wrapper'>
				<DanteEditor
					config={this.options}
					preTitleValue={this.props.preTitleValue} 
					titleValue={this.props.titleValue || '' }
					subtitleValue={ this.props.subtitleValue || '' }
					onChangeContent={this.props.onChangeContent}
					imagePath={this.props.imagePath}
					showImage={this.props.showImage}
					content={this.props.content || ''}
					deleteHandler={this.deleteImageHandler}
					isForRefresh={this.state.isForRefresh}
					isMetadataButtonHidden={this.state.isMetadataButtonHidden}
				/>
			</div>
		);
	}
}

WysiwygEditor.propTypes = {
	isReadOnly: PropTypes.bool.isRequired,
	showHeadings: PropTypes.bool.isRequired,
	showImage: PropTypes.bool.isRequired,
	isTooltipHidden: PropTypes.bool.isRequired,
	saveHandler: PropTypes.func,
	titleValue: PropTypes.string,
	subtitleValue: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onChangeContent: PropTypes.func,
	newsType: PropTypes.string,
	article: PropTypes.object,
	imagePath: PropTypes.string,
	bodyPlaceholder: PropTypes.string,
	preTitleValue: PropTypes.string,
	isMetadataButtonHidden: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		currentLocale: state.i18n.locale
	};
}

function mapDispatchToPros(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, tempFilesActions, articleActions), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToPros)(WysiwygEditor);
