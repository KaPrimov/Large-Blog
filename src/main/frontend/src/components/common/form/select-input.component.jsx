import React from 'react';
import {Translate, I18n} from 'react-redux-i18n';
import FontAwesome  from 'react-fontawesome';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectInput extends React.Component {
	constructor(props) {
		super(props);

		this.defaultOption = this.props.defaultOption !==undefined ? {key: '', value: I18n.t(this.props.defaultOption)} : '';

		this.state = {
			wrapperClass : this.props.wrapperClass === undefined ? 'form-group row' : this.props.wrapperClass,
			labelClass : this.props.labelClass === undefined ? 'col-form-label' : this.props.labelClass,
			selectWrapperClass : this.props.selectWrapperClass === undefined ? '' : this.props.selectWrapperClass,
			selectClass : this.props.selectClass === undefined ? 'form-control btn-ocustom semi-transparent-button' : this.props.selectClass,
			isRequired : this.props.isRequired === undefined ? false : this.props.isRequired,
			disabled : this.props.disabled === undefined ? false : this.props.disabled,
			name: this.props.name,
			label: this.props.label,
			value: this.props.value,
			error: this.props.error,
			options: this.props.defaultOption !==undefined ? [this.defaultOption, ...this.props.options] : this.props.options,			
			info: this.props.info,
		};

		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.wrapperClass !== nextProps.wrapperClass) {
			this.setState({wrapperClass: nextProps.wrapperClass});
		}

		if (this.state.labelClass !== nextProps.labelClass) {
			this.setState({labelClass: nextProps.labelClass});
		}

		if (this.state.selectWrapperClass !== nextProps.selectWrapperClass) {
			this.setState({selectWrapperClass: nextProps.selectWrapperClass});
		}

		if (this.state.selectClass !== nextProps.selectClass) {
			this.setState({selectClass: nextProps.selectClass});
		}

		if (this.state.isRequired !== nextProps.isRequired) {
			this.setState({isRequired: nextProps.isRequired});
		}

		if (this.state.disabled !== nextProps.disabled) {
			this.setState({disabled: nextProps.disabled});
		}

		if (this.state.name !== nextProps.name) {
			this.setState({name: nextProps.name});
		}

		if (this.state.label !== nextProps.label) {
			this.setState({label: nextProps.label});
		}

		if (this.state.value !== nextProps.value) {
			this.setState({value: nextProps.value});
		}

		if (this.state.error !== nextProps.error) {
			this.setState({error: nextProps.error});
		}

		if (this.state.options !== nextProps.options) {
			this.setState({options:  this.state.defaultOption !==undefined ? [this.defaultOption, ...nextProps.options] : nextProps.options});
		}

		if (this.state.info !== nextProps.info) {
			this.setState({info: nextProps.info});
		}
	}

	onChange(selectedObject) {
		let event = {
			preventDefault: () => {},
			target: {
				name: this.state.name,
				value: selectedObject == null ? (this.defaultOption !== '' ? this.defaultOption.key : null) : selectedObject.key
			},
			selectedObject: selectedObject
		};
		
		this.props.onChange(event);
	}
	
	render() {
		return (
			<div className={this.state.wrapperClass}>
				{this.state.label && <label
					className={this.state.labelClass}
					htmlFor={this.state.name}>
					<Translate value={this.state.label}/>
					{this.state.isRequired && <span className="required">*</span>}
					{this.state.info && <span className="custom-modal-icon-in-button" title={I18n.t(this.state.info)}><FontAwesome name="info-circle"/></span>}
				</label>}
				<div className={this.state.selectWrapperClass}>
					<Select
						className={this.state.selectClass}
						name={`${this.state.name}`}
						value={this.state.value}
						disabled={this.state.disabled}
						options={this.state.options}
						onChange={this.onChange}
						placeholder={this.defaultOption !== '' ? this.defaultOption.value : ''}
						noResultsText={I18n.t('select_component.no_result_text')}
						clearValueText={I18n.t('select_component.clear_value_text')}
						clearAllText={I18n.t('select_component.clear_all')}
						backspaceToRemoveMessage={I18n.t('select_component.backspace_to_remove_message')}
						valueKey="key"
						labelKey="value"
						clearable={this.props.clearable}
					/>
				</div>
				{this.state.error && <div className="col-xs-12 alert-danger">{this.state.error}</div>}
			</div>
		);
	}
}

SelectInput.propTypes = {
	wrapperClass: PropTypes.string,
	labelClass: PropTypes.string,
	selectWrapperClass: PropTypes.string,
	selectClass: PropTypes.string,
	name: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	defaultOption: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	error: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	isRequired: PropTypes.bool,
	disabled: PropTypes.bool,
	info: PropTypes.string
};

export default SelectInput;
