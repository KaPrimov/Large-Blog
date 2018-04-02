import React from 'react';
import Cropper from 'react-cropper';
import jQuery from 'jquery';
require('cropperjs/dist/cropper.min.css');
import PropTypes from 'prop-types';
import {ModalService} from '../../../services/services/modal.service';
import {I18n} from 'react-redux-i18n';
import FieldCreationLabelComponent from '../../front/articles/common/article-metadata/field-creation-label.component.jsx';
import CircularButton from '../form/circular-button.component.jsx';


export default class UploadArticleImage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgSrc: this.props.imgSrc,
			showButtons: true
		};
		this.cropImage = this.cropImage.bind(this);
		this.onChange = this.onChange.bind(this);
		this.removeImage = this.removeImage.bind(this);
	}

	componentDidMount() {
		this.uploadImage();
	}

	onChange(e) {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		let size = files[0].size;

		if (size && size > Configuration.MAX_FILE_UPLOAD_SIZE_IN_BYTES) {
			ModalService.showAlert(I18n.t('common.upload_file_size_limit', {size: Configuration.MAX_FILE_UPLOAD_SIZE_IN_BYTES / 1048576}));
			return;
		}

		const reader = new FileReader();
		reader.onload = () => {
			this.setState({imgSrc: reader.result});
		};
		reader.readAsDataURL(files[0]);
	}

	cropImage() {
		if (typeof this.cropper.getCroppedCanvas() == null) {
			return;
		}
		this.props.imgChangeHandler(this.cropper.getCroppedCanvas().toDataURL('image/jpeg'));
		this.props.changeViewModeHandler(true);
	}

	uploadImage() {
		jQuery('#article-file-input').click();		
		jQuery('.cropper-canvas > img').css('display', '');
	}

	removeImage() {
		this.props.removeImage();
		jQuery('.cropper-canvas > img').css('display', 'none');
		this.setState({imgSrc: null});
	}

	render() {
		return (
			<div className="col-xs-12 article-pic-wrapper">
				<FieldCreationLabelComponent
					title={this.props.title}
					subtitle={this.props.subtitle}
				/>
				<div id="crop-editor" className='article-editor'>
					<input type="file" id="article-file-input" style={{'display': 'none'}} onChange={this.onChange} />
					<Cropper
						style={{height: 'inherit', width: 'inherit'}}
						aspectRatio={16 / 9}
						preview=".img-preview"
						guides={false}
						src={this.state.imgSrc}
						ref={cropper => { this.cropper = cropper; }}
					/>
				</div>
				<br style={{clear: 'both'}} />
				<div className="image-controls">
					<CircularButton
						onClick={() => this.uploadImage()}
						dataTip={I18n.t('meta_data_section.choose_file_tooltip')}
						dataId='choose-image-tooltip'
						type='file'
						fontAwesomeName='picture-o'
					/>
					{this.state.imgSrc &&
						<CircularButton
							onClick={() => this.cropImage()}
							dataTip={I18n.t('meta_data_section.crop_image_tooltip')}
							dataId='cancel-tooltip'
							fontAwesomeName='check'
						/>
					}
					{this.state.imgSrc &&
						<CircularButton
							onClick={() => this.removeImage()}
							dataTip={I18n.t('meta_data_section.cancel_image_tooltip')}
							dataId='cancel-tooltip'
							fontAwesomeName='times'
						/>
					}
				</div>
			</div>
		);
	}
}

UploadArticleImage.propTypes = {
	imgSrc: PropTypes.string,
	imgChangeHandler: PropTypes.func.isRequired
};
