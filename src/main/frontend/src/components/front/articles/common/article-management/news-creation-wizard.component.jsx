import React from 'react';
import {Translate} from 'react-redux-i18n';
import PropTypes from 'prop-types';
import * as ArticleStatus from '../article-status.constants';

const NewsCreationWizard = ({activeAddContentStep, doneAddContentStep, activeMetadataStep, doneMetadataStep, activePublishStep, donePublishStep, status, creationLabels}) => {
	return (
		<div className="row">
			<div className="mt-element-step">
				{status !== ArticleStatus.PUBLISHED && status !== ArticleStatus.PUBLISH_PENDING ?
					<div className="row step-line">
						<div className={'col-md-4 mt-step-col first ' + (activeAddContentStep ? 'active' : '') + '' + (doneAddContentStep ? 'done' : '')}>
							<div className="mt-step-number bg-white">1</div>
							<div className="mt-step-title uppercase font-grey-cascade"><Translate value={creationLabels.content.data} /></div>
							<div className="mt-step-content font-grey-cascade"><Translate value={creationLabels.content.sub} /></div>
						</div>
						<div className={'col-md-4 mt-step-col ' + (activeMetadataStep ? 'active' : '') + '' + (doneMetadataStep ? 'done' : '')}>
							<div className="mt-step-number bg-white">2</div>
							<div className="mt-step-title uppercase font-grey-cascade"><Translate value={creationLabels.metadata.data} /></div>
							<div className="mt-step-content font-grey-cascade"><Translate value={creationLabels.metadata.sub} /></div>
						</div>
						<div className={'col-md-4 mt-step-col last ' + (activePublishStep ? 'active' : '') + '' + (donePublishStep ? 'done' : '')}>
							<div className="mt-step-number bg-white">3</div>
							<div className="mt-step-title uppercase font-grey-cascade"><Translate value={creationLabels.publish.data} /></div>
							<div className="mt-step-content font-grey-cascade"><Translate value={creationLabels.publish.sub} /></div>
						</div>					
					</div> :
					<div className="row step-line">
						<div className={'col-md-6 mt-step-col first ' + (activeAddContentStep ? 'active' : '') + '' + (doneAddContentStep ? 'done' : '')}>
							<div className="mt-step-number bg-white">1</div>
							<div className="mt-step-title uppercase font-grey-cascade"><Translate value={creationLabels.content.data} /></div>
							<div className="mt-step-content font-grey-cascade"><Translate value={creationLabels.content.sub} /></div>
						</div>
						<div className={'col-md-6 mt-step-col last ' + (activeMetadataStep ? 'active' : '') + '' + (doneMetadataStep ? 'done' : '')}>
							<div className="mt-step-number bg-white">2</div>
							<div className="mt-step-title uppercase font-grey-cascade"><Translate value={creationLabels.metadata.data} /></div>
							<div className="mt-step-content font-grey-cascade"><Translate value='news_creation_wizard_component.element_metadata.review' /></div>
						</div>				
					</div>
				}
			</div>
		</div>
	);
};

NewsCreationWizard.propTypes = {
	activeAddContentStep: PropTypes.bool.isRequired,
	doneAddContentStep: PropTypes.bool.isRequired,
	activeMetadataStep: PropTypes.bool.isRequired,
	doneMetadataStep: PropTypes.bool.isRequired,
	activePublishStep: PropTypes.bool.isRequired,
	donePublishStep: PropTypes.bool.isRequired,
	creationLabels: PropTypes.object.isRequired,
	status: PropTypes.string
};

export default NewsCreationWizard;
