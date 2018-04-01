import React from 'react';
import PropTypes from 'prop-types';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';

const ShowArticleTextPropertyComponent = ({text, title, subtitle}) => {
	return (
		<div className="row meta-data-label">
			<FieldCreationLabelComponent 
				title={title}
				subtitle={subtitle}
			/>
			<h6 className="cols-xs-12 block-element text-xs-center">
				{text}
			</h6>
              
		</div>
	);
};

ShowArticleTextPropertyComponent.propTypes = {
	text: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired
};

export default ShowArticleTextPropertyComponent;