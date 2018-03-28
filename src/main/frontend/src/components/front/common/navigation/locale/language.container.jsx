import React from 'react';
import * as localeActions from '../../../../../services/actions/locale.actions';
import Language from './language.component.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LocaleService from '../../../../../services/services/locale.service';
import PropTypes from 'prop-types';

class LanguageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.changeLanguage = this.changeLanguage.bind(this);
	}

	render() {
		return (
			<Language
				locales={LocaleService.getLocales()}
				changeLanguage={this.changeLanguage}
				currentLocale={this.props.currentLocale} />
		);
	}

	changeLanguage(localeName) {
		this.props.actions.changeLanguage(localeName);
	}
}

LanguageContainer.propTypes = {
	actions: PropTypes.object.isRequired,
	currentLocale: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(localeActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		currentLocale: state.currentLocale
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer);
