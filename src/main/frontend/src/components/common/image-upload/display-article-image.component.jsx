import React from 'react';
import PropTypes from 'prop-types';
import CircularButton from '../form/circular-button.component.jsx';
import {I18n} from 'react-redux-i18n';
import FieldCreationLabelComponent from '../../front/articles/common/article-metadata/field-creation-label.component.jsx';

const DisplayArticleImage = ({imgSrc, changeViewModeHandler, title, subtitle, deleteImage, withoutControls}) => {
	return (
		<div className="article-image-container">
			<div className="col-sm-12 mx-auto">
				<FieldCreationLabelComponent
					title={title}
					subtitle={subtitle}
				/>
				<div className="text-center mx-auto image-block">
					{imgSrc == '' || imgSrc == null ? (<img src="/assets/images/default-photo.png" />) : (<img src={imgSrc}></img>)}
				</div>
				{withoutControls ? null : 
					<div className="image-controls">
						<CircularButton
							onClick={() => changeViewModeHandler(false)}
							dataTip={I18n.t('meta_data_section.choose_file_tooltip')}
							dataId='choose-image-tooltip'
							type='file'
							fontAwesomeName='picture-o'
						/>
						{imgSrc &&
						<CircularButton
							onClick={() => deleteImage()}
							dataTip={I18n.t('meta_data_section.cancel_image_tooltip')}
							dataId='cancel-tooltip'
							fontAwesomeName='times'
						/>
						}
					</div>
				}
			</div>
		</div>
	);
};

DisplayArticleImage.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	deleteImage: PropTypes.func,
	imgSrc: PropTypes.string,
	changeViewModeHandler: PropTypes.func,
	withoutControls: PropTypes.bool
};

export default DisplayArticleImage;