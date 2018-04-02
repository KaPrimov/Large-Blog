import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';

const DEFAULT_TIME_INTERVAL = 15;
const PopurTimePicker = ({selected, onChange, locale, inline, onBlur, disabled, noResponsive, timeInterval}) => {
	return (
		<DatePicker
			utcOffset={0}
			disabled={disabled}
			inline={inline}
			onBlur={onBlur}
			locale={locale}
			selected={selected}
			onChange={onChange}
			className="form-control form-control-sm btn-ocustom"
			fixedHeight
			peekNextMonth
			showMonthDropdown
			showYearDropdown
			showTimeSelect
			timeFormat="HH:mm"
			dateFormat="DD.MM.YYYY     -     HH:mm"            
			timeIntervals={timeInterval ? timeInterval: DEFAULT_TIME_INTERVAL}
			popperPlacement={noResponsive ?  '' : 'top-end'}
			popperModifiers={{
				offset: {
					enabled: true,
					offset: '5px, 10px'
				},
				preventOverflow: {
					enabled: true,
					escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
					boundariesElement: 'viewport'
				}
			}}
		/>
	);
};

export default PopurTimePicker;