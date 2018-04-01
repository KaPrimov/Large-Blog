package com.kalin.large.core.service.security;

import com.kalin.large.core.model.user.beans.UserFullDTO;

/**
 * Security Servicse
 */
public interface SecurityService {

    /**
     * Find the currently logged in user. If no user is found - returns null.
     * @return {@link com.kalin.large.core.model.user.User}
     */
    UserFullDTO getLoggedInUser();
}
