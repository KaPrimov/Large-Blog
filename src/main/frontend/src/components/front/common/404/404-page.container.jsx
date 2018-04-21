import React from 'react';
import Header from './404-header.component.jsx';
import ErrorInfo from './404-body.component.jsx';
import {DynamicHeader} from '../dynamic-header/dynamic-header';
import {I18n} from 'react-redux-i18n';
import {connect} from 'react-redux';

/**
 * 404 page not found body component serves to visualize the body of the 404 page not found page
 */
class NotFound extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			changeLang: this.props.changeLang,
			currentLocale: this.props.currentLocale
		};

		this.startStop = {
			animate: true
		};

	}

	componentDidMount() {
		DynamicHeader(document.getElementById('small-header'), document.getElementById('404-background-canvas'), this.startStop, false);

	}

	componentWillReceiveProps(nextProps) {
		if (this.props.currentLocale !== nextProps.currentLocale) {
			this.setState({
				changeLang: nextProps.changeLang,
				currentLocale: nextProps.currentLocale
			}, () => document.title = I18n.t('additional_page_titles.not_found'));
		} 
	}

	componentWillUnmount() {
		this.startStop.animate = false;
	}

	render() {
		return (
			<article id="errorPage" className="content-wrap animated fadeIn">
				<div id="small-header" className="small-header">
					<div id="error-wrapper">
						<Header/>
            	<canvas id="404-background-canvas"></canvas>
						<ErrorInfo/>
  				</div>
				</div>
			</article>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		currentLocale: state.currentLocale
	};
}

export default connect(mapStateToProps)(NotFound);