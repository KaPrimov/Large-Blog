import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const MultiselectTwoSides = createReactClass({
	propTypes: {
		availableFooter: PropTypes.node,
		availableHeader: PropTypes.node,
		className: PropTypes.string,
		clearFilterText: PropTypes.string,
		clearable: PropTypes.bool,
		deselectAllText: PropTypes.string,
		disabled: PropTypes.bool,
		filterComponent: PropTypes.func,
		highlight: PropTypes.array,
		labelKey: PropTypes.string,
		limit: PropTypes.number,
		onChange: PropTypes.func,
		options: PropTypes.array,
		placeholder: PropTypes.string,
		searchable: PropTypes.bool,
		selectAllText: PropTypes.string,
		selectedFooter: PropTypes.node,
		selectedHeader: PropTypes.node,
		showControls: PropTypes.bool,
		value: PropTypes.array,
		valueKey: PropTypes.string
	},

	getDefaultProps() {
		return {
			clearFilterText: 'Clear',
			clearable: true,
			deselectAllText: 'Deselect all',
			disabled: false,
			highlight: [],
			labelKey: 'label',
			options: [],
			searchable: false,
			selectAllText: 'Select all',
			showControls: false,
			value: [],
			valueKey: 'value'
		};
	},

	getInitialState() {
		return {
			filterAvailable: '',
			filterSelected: ''
		};
	},

	handleClickAvailable(value) {
		this.props.onChange(this.props.value.concat(value), value, 'available');
	},

	handleClickSelected(value) {
		const {
			onChange,
			value: currentValue
		} = this.props;
		const newValue = currentValue.slice();

		newValue.splice(currentValue.indexOf(value), 1);
		onChange(newValue, value, 'selected');
	},

	handleClickSelectAll() {
		const {
			limit,
			onChange,
			options,
			value,
			valueKey
		} = this.props;
		const previousValue = value.slice();

		const newValue = options.reduce((a, b) => {
			if (!b.disabled && previousValue.indexOf(b[valueKey]) === -1) {
				a.push(b[valueKey]);
			}
			return a;
		}, previousValue);

		let limitedValue = newValue;
		if (limit >= 0) {
			limitedValue = limitedValue.slice(0, limit);
		}

		limitedValue.sort();

		onChange(limitedValue);
	},

	handleClickDeselectAll() {
		this.props.onChange([]);
	},

	filterAvailable() {
		const {
			highlight,
			labelKey,
			limit,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b[valueKey]) === -1) {
				a.push(b);
			}
			return a;
		}, []);

		let limited = filtered;
		if (value.length >= limit) {
			limited = filtered.map(item => {
				return Object.assign({}, item, {disabled: true});
			});
		}

		if (highlight && highlight.length > 0) {
			limited = limited.map(item => {
				if (highlight.indexOf(item[valueKey]) > -1) {
					return Object.assign({}, item, {highlighted: true});
				}
				return item;
			});
		}

		if (!this.props.searchable) {
			return limited;
		}

		const {
			filterAvailable: filter
		} = this.state;
		if (filter) {
			return limited.filter(a => (filterByName(a, filter, labelKey)));
		}

		return limited;
	},

	filterActive() {
		const {
			labelKey,
			options,
			value,
			valueKey
		} = this.props;
		const filtered = options.reduce((a, b) => {
			if (value.indexOf(b[valueKey]) > -1) {
				a.push(b);
			}
			return a;
		}, []);

		if (!this.props.searchable) {
			return filtered;
		}

		const {filterSelected: filter} = this.state;
		if (filter) {
			return filtered.filter(a => (filterByName(a, filter, labelKey)));
		}

		return filtered;
	},

	handleChangeFilterAvailable(filterAvailable) {
		this.setState({filterAvailable});
	},

	handleChangeFilterSelected(filterSelected) {
		this.setState({filterSelected});
	},

	renderFilter(value, onChange) {
		const {
			clearFilterText,
			clearable,
			disabled,
			filterComponent,
			placeholder
		} = this.props;

		if (!filterComponent) {
			return (
				<Filter
					value={value}
					onChange={onChange}
					{...{
						clearFilterText,
						clearable,
						disabled,
						placeholder
					}}
				/>
			);
		}

		return React.createElement(filterComponent, {
			clearFilterText,
			clearable,
			disabled,
			onChange,
			placeholder,
			value
		});
	},

	render() {
		const {
			availableFooter,
			availableHeader,
			className,
			deselectAllText,
			disabled,
			labelKey,
			limit,
			options,
			searchable,
			selectAllText,
			selectedFooter,
			selectedHeader,
			showControls,
			value,
			valueKey
		} = this.props;

		const {
			filterAvailable,
			filterSelected
		} = this.state;

		const componentClassName = 'msts';

		return (
			<div className={classNames(componentClassName, disabled && `${componentClassName}_disabled`, className)}>
				{availableHeader || selectedHeader ? (
					<div className="msts__heading">
						<div className="msts__side msts__side_available">
							{availableHeader}
						</div>

						<div className="msts__side msts__side_selected">
							{selectedHeader}
						</div>
					</div>
				) : null}

				{searchable ? (
					<div className="msts__subheading">
						<div className="msts__side msts__side_filter">
							{this.renderFilter(filterAvailable, this.handleChangeFilterAvailable)}
						</div>

						<div className="msts__side msts__side_filter">
							{this.renderFilter(filterSelected, this.handleChangeFilterSelected)}
						</div>
					</div>
				) : null}

				<div className="msts__body">
					<div className="msts__side msts__side_available">
						<List
							options={this.filterAvailable()}
							onClick={this.handleClickAvailable}
							{...{
								disabled,
								labelKey,
								valueKey
							}}
						/>
					</div>

					{showControls ? (
						<div className="msts__side msts__side_controls">
							<button
								className="msts__control msts__control_select-all"
								onClick={this.handleClickSelectAll}
								title={selectAllText}
								type="button"
								disabled={value.length === options.length || value.length >= limit || disabled}
							/>

							<button
								className="msts__control msts__control_deselect-all"
								onClick={this.handleClickDeselectAll}
								title={deselectAllText}
								type="button"
								disabled={!value.length || disabled}
							/>
						</div>
					) : null}

					<div className="msts__side msts__side_selected">
						<List
							options={this.filterActive()}
							onClick={this.handleClickSelected}
							{...{
								disabled,
								labelKey,
								valueKey
							}}
						/>
					</div>
				</div>

				{availableFooter || selectedFooter ? (
					<div className="msts__footer">
						<div className="msts__side msts__side_available">
							{availableFooter}
						</div>

						<div className="msts__side msts__side_selected">
							{selectedFooter}
						</div>
					</div>
				) : null}
			</div>
		);
	}
});

export default MultiselectTwoSides;

const List = createReactClass({
	propTypes: {
		disabled: PropTypes.bool,
		labelKey: PropTypes.string,
		onClick: PropTypes.func,
		options: PropTypes.array,
		valueKey: PropTypes.string
	},

	getDefaultProps() {
		return {
			options: []
		};
	},

	handleClick(value) {
		if (this.props.disabled) {
			return;
		}

		this.props.onClick(value);
	},

	render() {
		const {
			labelKey,
			options,
			valueKey
		} = this.props;

		return (
			<ul className="msts__list">
				{options.map(item => (
					<ListItem
						key={item[valueKey]}
						onClick={this.handleClick}
						disabled={item.disabled}
						highlighted={item.highlighted}
						label={item[labelKey]}
						value={item[valueKey]}
					/>
				))}
			</ul>
		);
	}
});

const ListItem = createReactClass({
	propTypes: {
		disabled: PropTypes.bool,
		highlighted: PropTypes.bool,
		label: PropTypes.string,
		onClick: PropTypes.func,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string
		])
	},

	handleClick() {
		if (this.props.disabled) {
			return;
		}

		const {
			onClick,
			value
		} = this.props;
		onClick(value);
	},

	render() {
		const {
			disabled,
			highlighted,
			label
		} = this.props;
		const className = 'msts__list-item';

		return (
			<li
				className={classNames(className, disabled && `${className}_disabled`, highlighted && `${className}_highlighted`)}
				onClick={this.handleClick}
			>
				{label}
			</li>
		);
	}
});

const Filter = createReactClass({
	propTypes: {
		clearFilterText: PropTypes.string,
		clearable: PropTypes.bool,
		disabled: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		placeholder: PropTypes.string,
		value: PropTypes.string
	},

	handleChange(e) {
		this.props.onChange(e.target.value);
	},

	handleClickClear() {
		this.props.onChange('');
	},

	render() {
		const {
			clearFilterText,
			clearable,
			disabled,
			placeholder,
			value
		} = this.props;

		return (
			<div className="msts__filter">
				<input
					className="msts__filter-input"
					onChange={this.handleChange}
					type="text"
					{...{
						disabled,
						placeholder,
						value
					}}
				/>

				{clearable && value && !disabled ? (
					<span
						className="msts__filter-clear"
						onClick={this.handleClickClear}
						title={clearFilterText}
					/>
				) : null}
			</div>
		);
	}
});

function filterByName(a, name, labelKey) {
	return a[labelKey].toLowerCase().indexOf(name.toLowerCase()) > -1;
}
