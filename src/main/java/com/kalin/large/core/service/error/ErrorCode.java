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
		int EMPLOYEE_DOCUMENT_NOT_FOUND = 500;
		int CANT_WRITE_FILE 	= 501;
		int CANT_READ_FILE 		= 502;
		int FILE_ACCESS_PROBLEM	= 503;
		int DOCUMENT_NOT_FOUND  = 504;
		int CANT_DELETE_DIRECTORY = 505;
	}

}
