import React from 'react';
import {Dante, DanteEditor} from './es/index';
import {Map, fromJS} from 'immutable';
import PropTypes from 'prop-types';
import defaultOptions from './generate-default-options.js';

export default class WysiwygEditor extends React.Component {
	constructor(props) {
		super(props);
		let config = Map(fromJS(defaultOptions(true, this.props.beforeHandler, this.props.successHandler, this.props.errorHandler, this.props.url)));
		this.options = config.mergeDeep({}).toJS();
	}

	render(){
		return(
			<DanteEditor
				content={this.props.content}
				config={this.options}
			/>
		);
	}
}

WysiwygEditor.propTypes = {
	url: PropTypes.string.isRequired,
	beforeHandler: PropTypes.func.isRequired,
	successHandler: PropTypes.func.isRequired,
	errorHandler: PropTypes.func.isRequired,
	content: PropTypes.object.isRequired
};