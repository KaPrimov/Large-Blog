package com.kalin.large.configuration;

import org.springframework.security.web.header.Header;
import org.springframework.security.web.header.HeaderWriter;
import org.springframework.security.web.header.writers.CacheControlHeadersWriter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.util.ReflectionUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * Based on Spring's {@link CacheControlHeadersWriter}. The only difference is that this implementation writes
 * Cache-Control header as "no-cache, must-revalidate", instead of Spring's full "no-cache, no-store, max-age=0, must-revalidate".
 * Also the current implementation does not set "expires" flag.
 *
 */
public class CacheControlHeaderWriter implements HeaderWriter {
    private static final String EXPIRES = "Expires";
    private static final String PRAGMA = "Pragma";
    private static final String CACHE_CONTROL = "Cache-Control";
    private final Method getHeaderMethod = ReflectionUtils.findMethod(HttpServletResponse.class, "getHeader", new Class[]{String.class});
    private final HeaderWriter delegate = new StaticHeadersWriter(createHeaders());

    @Override
    public void writeHeaders(HttpServletRequest request, HttpServletResponse response) {
        if (!this.hasHeader(response, CACHE_CONTROL) && !this.hasHeader(response, EXPIRES) && !this.hasHeader(response, PRAGMA)) {
            this.delegate.writeHeaders(request, response);
        }
    }

    private boolean hasHeader(HttpServletResponse response, String headerName) {
        if (this.getHeaderMethod == null) {
            return false;
        } else {
            return ReflectionUtils.invokeMethod(this.getHeaderMethod, response, new Object[]{headerName}) != null;
        }
    }

    private static List<Header> createHeaders() {
        List<Header> headers = new ArrayList<>(1);
        headers.add(new Header(CACHE_CONTROL, new String[]{"no-cache, must-revalidate"}));

        return headers;
    }
}

