import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';
import {I18n} from 'react-redux-i18n';

const ShortDescriptionComponent = ({titleValue, subtitleValue, shortDescription, formChecker, onChange}) => {
	return (
		<div className="row mx-auto">
			<FieldCreationLabelComponent
				title={titleValue}
				subtitle={subtitleValue}
				isRequired={true} />
			<TextareaAutosize
				rows={3}
				maxLength={200}
				type="text"
				className="col-xs-6 offset-xs-3 btn-ocustom"
				placeholder={I18n.t('meta_data_section.short_description_placeholder')}
				name="shortDescription"
				value={shortDescription || ''}
				onChange={onChange} />
			<div className="col-xs-6 offset-xs-3 cut-off-paddings-for-formchecker">
				{!formChecker.silentCheck ? (formChecker.errors['shortDescription'] && <div className="alert-danger">{formChecker.errors['shortDescription']}</div>) : null}
			</div>
		</div>
	);
};

ShortDescriptionComponent.propTypes = {
	titleValue: PropTypes.string.isRequired,
	subtitleValue: PropTypes.string.isRequired,
	formChecker: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	shortDescription: PropTypes.string
};

export default ShortDescriptionComponent;