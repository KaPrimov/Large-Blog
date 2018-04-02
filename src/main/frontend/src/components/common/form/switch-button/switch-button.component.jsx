import React from 'react';
import {Translate} from 'react-redux-i18n';
import PropTypes from 'prop-types';

export default class SwitchButton extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			className: this.props.className,
			id: this.props.id,
			name: this.props.name,
			title: this.props.title,
			label: this.props.label,
			labelRight: this.props.labelRight,
			disabled: this.props.disabled ? this.props.disabled : false,
			defaultChecked: this.props.defaultChecked,
			theme: this.props.theme,
			checked: null,
			onChange: this.handleChange
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.id !== nextProps.id) {
			this.setState({id: nextProps.id});
		}

		if (this.state.title !== nextProps.title) {
			this.setState({title: nextProps.title});
		}

		if (this.state.label !== nextProps.label) {
			this.setState({label: nextProps.label});
		}

		if (this.state.labelRight !== nextProps.labelRight) {
			this.setState({labelRight: nextProps.labelRight});
		}

		if (this.state.name !== nextProps.name) {
			this.setState({name: nextProps.name});
		}

		if (this.state.disabled !== nextProps.disabled) {
			this.setState({disabled: nextProps.disabled});
		}

		if (this.state.defaultChecked !== nextProps.defaultChecked) {
			this.setState({defaultChecked: nextProps.defaultChecked});
		}
	}

	render() {
		let id = this.state.id;
		let label = undefined;
		let labelRight = undefined;

		if (this.state.id == undefined && this.state.name != undefined) {
			id = this.state.name;
		}

		if (this.state.label !== undefined) {
			label = React.createElement(
				'label',
				{htmlFor: id},
				<Translate value={this.state.label} />
			);
		}

		if (this.state.labelRight !== undefined) {
			labelRight = React.createElement(
				'label',
				{htmlFor: id},
				<Translate value={this.state.labelRight} />
			);
		}

		if (this.state.theme === undefined) {
			this.state.theme = 'rsbc-switch-button-flat-round';
		}

		if (this.state.name === undefined) {
			this.state.name = 'switch-button';
		}

		if (this.state.defaultChecked === undefined) {
			this.state.defaultChecked = false;
		}

		return React.createElement(
			'div',
			{className: 'rsbc-switch-button ' + this.state.theme + (this.state.disabled ? ' disabled' : '') ,  title: this.state.title},
			label,
			React.createElement('input', {onChange: this.props.onChange,
				checked: this.state.defaultChecked,
				disabled: this.state.disabled,
				id: id, name: this.state.name,
				type: 'checkbox',
				value: '1'}),
			React.createElement('label', {htmlFor: id}),
			labelRight
		);
	}
}

SwitchButton.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	title: PropTypes.string,
	label: PropTypes.string,
	labelRight: PropTypes.string,
	defaultChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	disabled: PropTypes.bool,
	theme: PropTypes.string,
	checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	onChange: PropTypes.func
};
