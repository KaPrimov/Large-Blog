window.Configuration = {
	SERVER_PATH: '/',
	TIME_FOR_REQUEST_FOR_USER_IN_SECONDS: 15,
	TIME_FOR_REQUEST_FOR_NOTIFICATION_IN_SECONDS: 15,
	Roles: {
		USER: 'ROLE_USER',
		MODERATOR: 'ROLE_MODERATOR',
		ADMINISTRATOR: 'ROLE_ADMINISTRATOR',
		SUPER_ADMIN: 'ROLE_SUPER_ADMIN'
	},
	LOCALES: {
		localesISO: {
			bg_BG: {flag: 'flag-sm flag-com', name: 'lang.bulgarian', shortName: 'com'},
			en_GB: {flag: 'flag-sm flag-gb', name: 'lang.english', shortName: 'en-GB'},
			fr_FR: {flag: 'flag-sm flag-fr', name: 'lang.french', shortName: 'fr'},
		},
		preferredLocale: 'en_GB',
		CURRENT_LANG_COOKIE_NAME: 'CURRENT_LANG'
	},
	X_XSRF_TOKEN_COOKIE_NAME: 'XSRF-TOKEN',
	DEFAULT_PASSWORD: '123456',
	MAX_FILE_UPLOAD_SIZE_IN_BYTES: 1048576 * 10 // 10 MB
};