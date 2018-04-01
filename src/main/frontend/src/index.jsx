/* eslint-disable import/default */
import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import ConfigureStore from './services/store/configure-store';
import {Provider} from 'react-redux';
import routes from './router/routes.jsx';
import * as securityActions from './services/actions/security.actions';
import {loadTranslations, syncTranslationWithStore} from 'react-redux-i18n';
import {initializeLanguage} from './services/actions/locale.actions';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.js';
import 'izitoast/dist/css/iziToast.min.css';
import translations from './services/i18n/translations';
import {AppContainer} from 'react-hot-loader';
import '../assets/styles/index.scss';
import '../assets/js/clean-blog.min.js';
import '../assets/js/jqBootstrapValidation.min.js';

const store = ConfigureStore();
const history = syncHistoryWithStore(browserHistory, store);
//
// Try silent authentication
store.dispatch(securityActions.refreshAuthentication());

// Configure i18n and start default english translations
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(initializeLanguage());

const LargeApplication = () => (
	<Provider store={store}>
		<Router history={history} routes={routes}/>
	</Provider>
);

const renderApplication = Application => {
	ReactDom.render(
		<AppContainer>
			<Application />
		</AppContainer>,
		document.getElementById('large-app')
	);
};

renderApplication(LargeApplication);

if (module.hot) {
	module.hot.accept(LargeApplication, () => renderApplication(LargeApplication));
}
