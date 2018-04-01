import React from 'react';
import NewsWysiwygEditor from './news-wysiwyg-editor.container.jsx';
import PropTypes from 'prop-types';

const CreateContentComponent = ({onChangeContent, saveHandler, singleNews, bodyPlaceholder, isMetadataButtonHidden}) => {
	return (
		<section className="container-fluid" >
			<section className='container create-article-editor'>
				<div className='row'>
					<div className='portlet light article-management' >
						<div className='article-view-element'>
							<NewsWysiwygEditor
								titleValue={singleNews.title}
								subtitleValue={singleNews.subtitle}
								content={singleNews.body}
								onChangeContent={onChangeContent}
								saveHandler={saveHandler}
								singleNews={singleNews}
								isReadOnly={false}
								bodyPlaceholder={bodyPlaceholder}
								isMetadataButtonHidden={isMetadataButtonHidden}
							/>
						</div>
					</div>
				</div>
			</section>
		</section>

	);
};

CreateContentComponent.propTypes = {
	titleValue: PropTypes.string,
	subtitleValue: PropTypes.string, 
	onChangeContent: PropTypes.func.isRequired,
	saveHandler: PropTypes.func.isRequired,
	newsType: PropTypes.string,
	isMetadataButtonHidden: PropTypes.bool
};

export default CreateContentComponent;