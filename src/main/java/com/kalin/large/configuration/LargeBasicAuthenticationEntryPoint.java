package com.kalin.large.configuration;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Used by the <code>ExceptionTraslationFilter</code> to commence authentication
 *
 * <p>
 * Once a user agent is authenticated using BASIC authentication, logout
 * requires that the browser be closed or an unauthorized (401) header be sent.
 * The simplest way of achieving the latter is to call the
 * {@link #commence(HttpServletRequest, HttpServletResponse, AuthenticationException)}
 * method below. This will indicate to the browser its credentials are no longer
 * authorized, causing it to prompt the user to login again.
 *
 */
public class LargeBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint implements AuthenticationEntryPoint, InitializingBean {

    public LargeBasicAuthenticationEntryPoint() {
        setRealmName("basic");
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
}