import React from 'react';
import {Translate} from 'react-redux-i18n';
import * as ArticleStatus from '../article-status.constants';

const ArticleManagementTabSwitcher = ({onSwitchBetweenTabs, activeTab}) => {
	return (
		<div className="article-management-buttons row">
			<button className={'btn btn-sm btn-ocustom col-xs-12 col-md-2 offset-md-3 management-button' + (activeTab === ArticleStatus.DRAFT? ' standart-button-workflow' : '') }
				onClick={() => onSwitchBetweenTabs(ArticleStatus.DRAFT)}>
				<Translate value="article_management.draft" />
			</button>
			<button className={'btn btn-sm btn-ocustom col-xs-12 col-md-2 offset-md-3 management-button' + (activeTab === ArticleStatus.PUBLISHED ? ' standart-button-workflow' : '') }
				onClick={() => onSwitchBetweenTabs(ArticleStatus.PUBLISHED)}>
				<Translate value="article_management.published" />
			</button>
			<br/>
		</div>
	);
};

export default ArticleManagementTabSwitcher;