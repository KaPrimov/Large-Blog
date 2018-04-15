package com.kalin.large.core.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Element does not exists")  // 404
public class ElementNotFound extends RestWebServiceException {

	private static final long serialVersionUID = -4421570054412713907L;

	public ElementNotFound(int errorCode, String message) {
        super(errorCode, message);
    }

    public ElementNotFound(int errorCode, String message, Throwable cause) {
        super(errorCode, message, cause);
    }
}
