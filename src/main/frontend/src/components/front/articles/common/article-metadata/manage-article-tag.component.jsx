import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome  from 'react-fontawesome';

export default class ManageArticleTag extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			tag: this.props.tag
		};
	}

	render() {
		const tag = this.state.tag;
		return (
			<div className="single-tag">
				<span>{`${tag.name}`}</span>
				<span>
					<FontAwesome style={{'marginLeft' : '5px'}} name='close'  onClick={() => this.props.removeChosenTag(tag.name)}/>
				</span>
			</div>
		);
	}
}

ManageArticleTag.propTypes = {
	tag: PropTypes.object.isRequired,
	removeChosenTag: PropTypes.func.isRequired
};