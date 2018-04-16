import React from 'react';
import UploadArticleImage from './upload-article-image.component.jsx';
import DisplayArticleImage from './display-article-image.component.jsx';
import ArticleAPI from '../../../services/api/article.api';
import * as newsActions from '../../../services/actions/news.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class UploadArticleImageContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentNews: this.props.currentNews,
			imgSrc: ArticleAPI.getArticlePhotoPathByArticleId(this.props.currentNews.imagePath != null ? this.props.currentNews.id : -1),
			inViewMode: true
		};

		this.handlerChangeImage = this.handlerChangeImage.bind(this);
		this.onSave = this.onSave.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.currentNews !== nextProps.currentNews) {
			if (this.state.imgSrc && this.state.imgSrc.length < 100) {
				this.setState({currentNews: nextProps.currentNews, 
					imgSrc: ArticleAPI.getArticlePhotoPathByArticleId(nextProps.currentNews.imagePath != null ? nextProps.currentNews.id : -1)});
			}
		}
	}

	handlerChangeImage(newImage) {
		this.setState({imgSrc: newImage}, () => {
			this.onSave();
		});
	}

	removeImage() {
		this.setState({inViewMode: true});
	}

	onSave() {
		let articleImagePicture = {
			id: this.state.currentNews.id,
			image: this.state.imgSrc
		};

		this.props.actions.updateArticleImage(articleImagePicture);
	}
	deleteImage() {
		this.setState({imgSrc: null}, () => {
			let articleImagePicture = {
				id: this.state.currentNews.id,
				image: this.state.imgSrc
			};
	
			this.props.actions.updateArticleImage(articleImagePicture).then(() => {
				this.setState({inViewMode: false});
			});
		});		
	}

	render() {
		if (this.state.inViewMode) {
			let imagePath = this.state.imgSrc;
			if (!imagePath) {
				if (this.state.currentNews.image) {
					imagePath = this.state.currentNews.image.image;
				}
			}
			return (
				<div>
					<DisplayArticleImage
						imgSrc={imagePath}
						changeViewModeHandler={(inViewMode) => this.setState({inViewMode: inViewMode})}
						title={this.props.title}
						subtitle={this.props.subtitle}
						deleteImage={() => this.deleteImage()}
					/>
				</div>
			);
		}
		return (
			<div>
				<UploadArticleImage
					imgChangeHandler={this.handlerChangeImage}
					removeImage={this.removeImage}
					title={this.props.title}
					subtitle={this.props.subtitle}
					changeViewModeHandler={(inViewMode) => this.setState({inViewMode: inViewMode})}
					ref='uploadArticleImage'
					updateMetadataHandler={this.props.actions.updateMetadataHandler}
					imgSrc={this.state.imgSrc}
				/>
			</div>
		);
	}
}

UploadArticleImageContainer.propTypes = {
	imgSrc: PropTypes.string
};

function mapStateToProps(state) {
	return {
		currentNews: state.singleNews,
		currentLocale: state.currentLocale
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(newsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(UploadArticleImageContainer);
