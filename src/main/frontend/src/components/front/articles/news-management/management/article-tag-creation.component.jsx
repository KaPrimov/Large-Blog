import React from 'react';
import PropTypes from 'prop-types';
import ManageArticleTagsComponent from '../../common/article-metadata/manage-article-tags.component.jsx';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';

const NewsTagCreationComponent = ({titleValue, subtitleValue}) => {
	return (
		<div className="mx-auto meta-data-element-wrapper">
			<FieldCreationLabelComponent
				title={titleValue}
				subtitle={subtitleValue} 
			/> 
			<div className="col-sm-6 offset-xs-3">
				<ManageArticleTagsComponent	/>
			</div>
		</div>
	);
};

NewsTagCreationComponent.propTypes = {
	titleValue: PropTypes.string.isRequired,
	subtitleValue: PropTypes.string.isRequired
};

export default NewsTagCreationComponent;
