import React from 'react';
import {Translate, I18n} from 'react-redux-i18n';
import TextInput from '../../../../common/form/text-input.component.jsx';


class ArticleManagementTab extends React.Component {
	render() {
		return (
			<div className="article-management-element">
				<div className="article-management-element-title col-xs-6 offset-xs-3">
					<Translate value={this.props.title} />
				</div>
				<div className="article-management-element-filter  col-md-3 col-xs-12">
					<TextInput
						isInputGroup={true}
						icon="search"
						inputIconClass="input-group-addon btn-ocustom small-search-btn no-hover"
						inputClass="form-control btn-ocustom semi-transparent-button-article-management"
						type="text"
						labelClass="col-form-label col-xs-12 text-xs-center"
						label=''
						inputWrapperClass="col-xs-12"
						name="search"
						value={this.props.keyword == null ? '' : this.props.keyword}
						onChange={this.props.onFilter}
						placeholder={I18n.t('article_management.filter')}/>
				</div>
				<div className="article-management-element-outline">
					<hr />
					{this.props.children}
				</div>
			</div>
		);}
}

export default ArticleManagementTab;