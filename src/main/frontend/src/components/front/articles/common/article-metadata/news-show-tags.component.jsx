import React from 'react';
import PropTypes from 'prop-types';
import ScrollArea from 'react-scrollbar';
import FieldCreationLabelComponent from '../../common/article-metadata/field-creation-label.component.jsx';

const NewsShowTags = ({tags, title, subtitle}) => {
	return (
		<div className="meta-data-label">
			<FieldCreationLabelComponent 
				title={title}
				subtitle={subtitle}
			/>
			<article className="target-group col-sm-8 offset-xs-2">
				<header className="clearfix">
					<ScrollArea
						speed={0.8}
						horizontal={false}
						className="target-group-list text-xs-center"
					>
						<div>
							{tags && tags.map((tag, index) => {
								return (
									<div className="single-tag" key={index}>
										<span>{`${tag.name}`}</span>
									</div>
								);
							}
							)}
						</div>
					</ScrollArea>
				</header>
			</article>
		</div>
	);
};

NewsShowTags.propTypes = {
	tags: PropTypes.array,
	title:PropTypes.string,
	subtitle:PropTypes.string

};

export default NewsShowTags;