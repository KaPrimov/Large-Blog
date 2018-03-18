import * as ActionTypes from './action-types.constants';
import {setLocale} from 'react-redux-i18n';
import LocaleService from '../services/locale.service';

/* ------------------------------ Public API ------------------------------- */

/**
 * Change the current language
 */
export function changeLanguage(currentLocale) {
    return function(dispatch) {
        dispatch(setLocale(currentLocale));
        dispatch(_setChangeLanguage(currentLocale));
    }
}

/**
 * Initialize the language
 */
export function initializeLanguage() {
    return function(dispatch) {
        if (LocaleService.hasSavedLangCookie()) {
            dispatch(changeLanguage(LocaleService.getLangFromCookie()));
        } else {
            let clientLocale = LocaleService.getLocaleOfTheClient();
            let locale = LocaleService.getLocaleByShortName(clientLocale);
            if (locale == undefined) {
                locale = LocaleService.getPreferredLanguage();
            }
            dispatch(changeLanguage(locale.shortName));
        }
    }
}

export function _setChangeLanguage(currentLocale) {
    return {type: ActionTypes.CHANGE_LANGUAGE, currentLocale : currentLocale};
}
