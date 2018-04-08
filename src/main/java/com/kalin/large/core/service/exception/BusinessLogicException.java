package com.kalin.large.core.service.exception;

/**
 * Exception class used for defining app specific exceptions
 */
public class BusinessLogicException extends Exception {

	private static final long serialVersionUID = 2628884078548937823L;
	
	private int errorCode;
	
	public BusinessLogicException(String message) {
		super(message);
	}

	public BusinessLogicException(int errorCode, String message) {
		super(String.format("Error code: %d, with Message: %s", errorCode, message));
		this.errorCode = errorCode;
	}

	public BusinessLogicException(int errorCode, String message, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
	}

	/**
	 * @return the {@link int} value of errorCode
	 */
	public int getErrorCode() {
		return errorCode;
	}
}
