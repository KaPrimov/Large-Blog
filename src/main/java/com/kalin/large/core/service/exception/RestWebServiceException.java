package com.kalin.large.core.service.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Exception which is thrown by REST WS
 */
public class RestWebServiceException extends RuntimeException {
/*--------------------------------------------------- CONSTANTS ------------------------------------------------*/
	private static final long serialVersionUID = 1410236571293909559L;
	private static Logger logger = LoggerFactory.getLogger(RestWebServiceException.class);
	
	private int errorCode;

    public RestWebServiceException(int errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public RestWebServiceException(int errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        if (logger.isWarnEnabled()){
        	logger.warn(message, cause);
        }
    }

    public int getErrorCode() {
        return errorCode;
    }
}
