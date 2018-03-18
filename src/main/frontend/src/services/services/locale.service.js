import cookie from 'react-cookie';
const LOCALES = {
        localesISO: {
            bg_BG: {flag: 'flag-sm flag-bg', name: 'lang.bulgarian', shortName: 'bg'},
            en_GB: {flag: 'flag-sm flag-gb', name: 'lang.english', shortName: 'en-GB'},
            fr_FR: {flag: 'flag-sm flag-fr', name: 'lang.french', shortName: 'fr'},
        },
        preferredLocale: 'en_GB',
        CURRENT_LANG_COOKIE_NAME: 'CURRENT_LANG'
    };
/**
 * Locale service
 */
export default class LocaleService {
    /**
     * Get locales as list
     */
    static getLocales() {
        let localesISO = LOCALES.localesISO;
        let locales = [];

        for (let localeKey of  Object.keys(localesISO)) {
            locales.push(localesISO[localeKey]);
        }

        return locales;
    }

    /**
     * Get specific locale by shortName
     */
    static getLocaleByShortName(shortName) {
        return this.getLocales().filter(locale => locale.shortName == shortName)[0];
    }

    /**
     * Get current language
     */
    static getPreferredLanguage() {
        return LOCALES.localesISO[LOCALES.preferredLocale];
    }

    /**
     * Get the locale of the client
     */
    static getLocaleOfTheClient() {
        return (window.navigator.userLanguage || window.navigator.language).substring(0, 2);
    }

    /**
     * Save Lang cookie for specific selected language
     */
    static saveLangToCookie(lang){
        cookie.save(LOCALES.CURRENT_LANG_COOKIE_NAME, lang, {path: '/', maxAge: 300000});
    }

    /**
     * Get specific lang from cookie
     */
    static getLangFromCookie() {
        return cookie.load(LOCALES.CURRENT_LANG_COOKIE_NAME);
    }

    /**
     * Returns whether there is a saved lang cookie or not
     */
    static hasSavedLangCookie() {
        return cookie.load(LOCALES.CURRENT_LANG_COOKIE_NAME) !== undefined;
    }
}
