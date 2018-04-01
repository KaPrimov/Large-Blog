import React from 'react';
import ManageArticleTag from './manage-article-tag.component.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoComplete from '../../../../common/form/auto-complete.component.jsx';
import * as tagActions from '../../../../../services/actions/tag.actions';
import ScrollArea from 'react-scrollbar';

class ManageArticleTagsContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			checkedTags: !this.props.preSelectedTags ? [] : [...this.props.preSelectedTags],
			suggestedTags: this.props.suggestedTags,
			formChecker: {isValid: false, silentCheck: false, errors: [], checkedFields: {
				'tagName': false
			}},
			tagLoading: false,
			tagValue: ''
		};

		this.onCheckboxClick = this.onCheckboxClick.bind(this);
		this.onTagAutoComplete = this.onTagAutoComplete.bind(this);
		this.onSelectTag = this.onSelectTag.bind(this);
		this.removeChosenTag = this.removeChosenTag.bind(this);
		this.enterHandler = this.enterHandler.bind(this);
	}

	componentWillReceiveProps(nextProps) {

		if (this.state.suggestedTags !== nextProps.suggestedTags ) {
			this.setState({suggestedTags: nextProps.suggestedTags});
		}
	}

	onCheckboxClick(tagName, checked) {
		let checkedTags = [...this.state.checkedTags];

		if(checked) {
			checkedTags = [...checkedTags, this.state.tags.filter(tag => tag.name == tagName)[0]];
		} else {
			checkedTags = checkedTags.filter(tag => tag.name != tagName);
		}

		this.setState({checkedTags: checkedTags});        
		this.props.actions.updateSelectedTags(checkedTags);
	}

	/**
   * Helper method which search with autocompleate for tags
   */
	onTagAutoComplete(event, value) {
        
		this.setState({ 
			tagValue: value,
			tagLoading: true
		});
		this.props.actions.listAllTagsForKeyword(value).then(() => {
			this.setState({tagLoading: false});
      
			let changedSuggested = this.state.suggestedTags.filter(suggestedTag => this.state.checkedTags.filter(checkedTag => checkedTag.name == suggestedTag.name).length == 0);
			this.setState({suggestedTags: changedSuggested});
		});
	}

	/**
   * Helper method which is applied when specific tag has been choosed
   */
	onSelectTag(value, chosenTag) {
		let chosenTagsArray = [...this.state.checkedTags, chosenTag];
    
		this.setState({
			checkedTags: chosenTagsArray,
			tagValue: ''
		});
        
		this.props.actions.updateSelectedTags(chosenTagsArray);
	}

	removeChosenTag(tagName){
		this.onCheckboxClick(tagName, false);
	}

	enterHandler(value) {
		let tagToAdd = {name: value, id: null};
		this.onSelectTag(value, tagToAdd);
	}

	render() {
		return (
			<article classID="target-group col-xs-12">
				<header className="clearfix">
					<ScrollArea
						speed={0.8}
						horizontal={false}
						className="target-group-list"
					>
						<div>
							{this.state.checkedTags && this.state.checkedTags.map((tag) =>
								<ManageArticleTag removeChosenTag={this.removeChosenTag} tag={tag} key={tag.name}/>
							)}
						</div>
					</ScrollArea>
					<AutoComplete
						wrapperClass="form-group col-xs-12"
						id="tag-autocomplete"
						isRequired={false}
						placeholder="common.grid.search"
						name="name"
						value={this.state.tagValue}
						error={!this.state.formChecker.silentCheck ? this.state.formChecker.errors['tagName'] : null}
						onChange={this.onTagAutoComplete}
						onSelect={this.onSelectTag}
						suggestedItems={this.state.suggestedTags}
						loading={this.state.tagLoading}
						isEnterSaving={true}
						enterHandler={this.enterHandler}
					/>
				</header>
			</article>
		);
	}
}
ManageArticleTagsContainer.propTypes = {
	actions: PropTypes.object.isRequired,
	suggestedTags: PropTypes.array.isRequired,
	tagLoading: PropTypes.bool
};

function mapStateToProps(state, ownProps) {
	return {
		suggestedTags: state.suggestedTags.suggestedTags,
		preSelectedTags: state.suggestedTags.checkedTags,
		tagLoading: ownProps.tagLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tagActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageArticleTagsContainer);
