import React, {PropTypes} from 'react';
import {Translate, I18n} from 'react-redux-i18n';
import Autocomplete from 'react-autocomplete';

const AutoComplete = ({isRequired, wrapperClass, labelClass, inputWrapperClass, name, label, onChange, onSelect, value, error, id, suggestedItems, loading, placeholder, isEnterSaving, enterHandler}) => {
	if (wrapperClass === undefined) {
		wrapperClass = 'form-group row';
	}

	if (labelClass === undefined) {
		labelClass = 'col-form-label';
	}

	if (inputWrapperClass === undefined) {
		inputWrapperClass = '';
	}

	if (isRequired === undefined) {
		isRequired = false;
	}
	if (placeholder === undefined) {
		placeholder = '';
	} else {
		placeholder = I18n.t(placeholder);
	}

	const simpleInput = (
		<Autocomplete
			value={value}
			inputProps={{name: {name}, id: {id}, className : 'form-control btn-ocustom input-style btn-sm', placeholder: placeholder, onKeyPress: (event) => {
				if (event.charCode == 13) {
					if(isEnterSaving) {
						enterHandler(event.target.value);
					} else {
						event.preventDefault();
					}
					return false;
				}
			}}}
			items={suggestedItems}
			getItemValue={(item) => item[name]}
			onSelect={(selectedValue, item) => {
					onSelect(selectedValue, item);
			}}
			onChange={onChange}
			wrapperStyle={{}}
			renderItem={(item, isHighlighted) => (
				<div
					className={isHighlighted ? 'highlighted-item' : 'item'}
					key={item.id}
					id={item.id}
				>{item[name]}</div>
			)}
			renderMenu={(items, value) => (
				<div className="autocompleate-proposals col-xs-12">
					{ loading ? (
						<div style={{padding: 6}}><Translate value='auto_complete_component.loading'/></div>
					) : items.map((item, index) => {
						var text = item.props.children;
						if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
							return [item];
						}
						else {
							return item;
						}
					})
					}
				</div>
			)}
		/>
	);


	return (
		<div className={wrapperClass}>
			{label != undefined && <label className={labelClass} htmlFor={name}><Translate value={label}/>{isRequired && <span className="required">*</span>}</label>}
			<div className={inputWrapperClass}>
				{simpleInput}
				{error && <div className="alert-danger">{error}</div>}
			</div>
		</div>
	);
};

AutoComplete.propTypes = {
	wrapperClass: PropTypes.string,
	labelClass: PropTypes.string,
	inputWrapperClass: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	id: PropTypes.string,
	loading: PropTypes.bool,
	isEnterSaving: PropTypes.bool,
	enterHandler: PropTypes.func,
	suggestedItems: PropTypes.arrayOf(PropTypes.object),
};

export default AutoComplete;
