import cookie from 'react-cookie';

/**
 * Locale service
 */
export default class LocaleService {
	/**
     * Get locales as list
     */
	static getLocales() {
		let localesISO = Configuration.LOCALES.localesISO;
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
		console.log('cur', shortName)
		console.log('all', this.getLocales());
		return this.getLocales().filter(locale => locale.shortName == shortName)[0];
	}

	/**
     * Get current language
     */
	static getPreferredLanguage() {
		return Configuration.LOCALES.localesISO[Configuration.LOCALES.preferredLocale];
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
		cookie.save(Configuration.LOCALES.CURRENT_LANG_COOKIE_NAME, lang, {path: '/', maxAge: 300000});
	}

	/**
     * Get specific lang from cookie
     */
	static getLangFromCookie() {
		return cookie.load(Configuration.LOCALES.CURRENT_LANG_COOKIE_NAME);
	}

	/**
     * Returns whether there is a saved lang cookie or not
     */
	static hasSavedLangCookie() {
		return cookie.load(Configuration.LOCALES.CURRENT_LANG_COOKIE_NAME) !== undefined;
	}
}
