package com.kalin.large.core.service.error;

/**
 * Utility interface holding all error codes for business logic errors.
 *
 */
public interface ErrorCode {

	/**
	 * Error codes for SecurityService
	 */
	interface Authority {
		int ROLE_NOT_FOUND = 100;
		int ROLE_NAME_ALREADY_EXISTS = 101;
		int ROLE_NAME_WRONG = 102;
		int ROLE_NAME_REQUIRED_FIELD = 103;
		int ROLE_NAME_MIN_SIZE_ERROR = 104;
	}
	
	/**
	 * Error codes for CredentialService
	 */
	interface CredentialService {
		int LOGIN_ALREADY_EXISTS		= 200;
		int CREDENTIAL_DOES_NOT_EXISTS	= 201;
		int OLD_PASSWORD_INVALID 		= 202;
	}

	/**
	 * Error codes for ArticleService
	 */
	interface Articles {
		int ARTICLE_NOT_FOUND = 300;
		int FILE_ACCESS_DENIED = 301;
		int ID_REQUIRED_FIELD = 302;
		int TITLE_REQUIRED_FIELD = 303;
		int START_DATE_REQUIRED_FIELD = 304;
		int BODY_REQUIRED_FIELD = 305;
		int NOTIFICATION_TYPE_REQUIRED_FIELD = 306;
		int STATUS_REQUIRED_FIELD = 307;
		int START_DATE_IN_THE_PAST = 308;
	}

	/**
	 * Error codes for TempFileUpload
	 */
	interface TempFileUpload {
		int TEMP_FILE_UPLOAD_NOT_FOUND = 400;
		int ACTUAL_FILE_DOES_NOT_EXIST = 401;
		int UNSUCCESSFUL_FILE_MOVEMENT = 402;
	}

	/**
	 * Error codes for DocumentService
	 */
	interface DocumentService {
		int CANT_WRITE_FILE 	= 501;
		int CANT_READ_FILE 		= 502;
		int FILE_ACCESS_PROBLEM	= 503;
		int DOCUMENT_NOT_FOUND  = 504;
		int CANT_DELETE_DIRECTORY = 505;
	}
	/**
	 * Error codes for NewsService
	 */
	interface News {
		int NEWS_NOT_FOUND = 2600;
		int NEWS_IS_IN_USE = 2601;
		int FILE_ACCESS_DENIED = 2602;
		int ID_REQUIRED_FIELD = 2603;
		int DESCRIPTION_LENGTH_TOO_LONG = 2604;
		int DESCRIPTION_LENGTH_TOO_SHORT = 2605;
		int DESCRIPTION_REQUIRED_FIELD = 2606;
	}

	/**
	 * Error codes for EmployeeService
	 */
	interface UserService {
		int FILE_ACCESS_DENIED 						= 600;
		int USER_DOES_NOT_EXISTS		   	 	= 601;
		int CANT_DELETE_USER					= 602;
		int CANT_DELETE_CURRENT_USER				= 603;
		int FILE_IS_NOT_A_PICTURE 	= 604;
		int SUBSIDIARY_DIRECTOR_ALREADY_EXISTS 		= 605;
	}
}
