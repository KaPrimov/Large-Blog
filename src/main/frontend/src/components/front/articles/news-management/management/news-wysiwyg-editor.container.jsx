import React from 'react';
import PropTypes from 'prop-types';
import WysiwygEditor from '../../../../common/wysiwyg-editor/wysiwyg-editor.container.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tempFilesActions from '../../../../../services/actions/temp-files.actions';
import * as articleActions from '../../../../../services/actions/article.actions';

class NewsWysiwygEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			singleNews: this.props.singleNews
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.singleNews && nextProps.singleNews != {}) {
			this.setState({singleNews: nextProps.singleNews});
		}	
	}	

	render() {		
		let {body} = this.props.singleNews;
		
		if (body) {
			body = JSON.parse(body);
		}
		let showImage = false;
		if (this.props.singleNews.image) {
			if (this.props.singleNews.image.image) {
				showImage = true;
			}
		}

		return(
			<div id='dante-wrapper'>
				<WysiwygEditor
					titleValue={this.props.titleValue || '' }
					subtitleValue={this.props.subtitleValue || '' }
					onChangeContent={this.props.onChangeContent}
					imagePath={this.props.imagePath}
					showImage={showImage}
					content={body || ''}
					article={this.state.singleNews}
					isReadOnly={this.props.isReadOnly}    
					saveHandler={this.props.saveHandler}
					showHeadings={true}
					isTooltipHidden={false}
					bodyPlaceholder={this.props.isReadOnly ? ' ' : this.props.bodyPlaceholder}
					isMetadataButtonHidden={this.props.isMetadataButtonHidden}
				/>			
			</div>
		);
	}
}

NewsWysiwygEditor.propTypes = {
	isReadOnly: PropTypes.bool.isRequired,
	saveHandler: PropTypes.func,
	titleValue: PropTypes.string,
	subtitleValue: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onChangeContent: PropTypes.func,
	singleNews: PropTypes.object, 
	imagePath: PropTypes.string,
	article: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToPros)(NewsWysiwygEditor);
