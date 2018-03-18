import * as ActionTypes from '../actions/action-types.constants';
import LocaleService from '../services/locale.service';

/**
 * Helper function for generation of initial states of reducers
 */
function initializeStates() {
    return {
        currentLocale: LocaleService.getPreferredLanguage()
    };
}

export default function localeReducer(state = initializeStates().currentLocale, action) {
    switch(action.type) {
        case ActionTypes.CHANGE_LANGUAGE:
            LocaleService.saveLangToCookie(action.currentLocale);
            return LocaleService.getLocaleByShortName(action.currentLocale);
        default:
            return state;
    }
}
