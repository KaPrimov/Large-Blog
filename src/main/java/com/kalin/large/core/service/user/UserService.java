package com.kalin.large.core.service.user;

import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * User service for working with {@link com.kalin.large.core.model.user.User} entity
 */
public interface UserService extends UserDetailsService {

    /**
     * Register the given user
     * @param userDTO {@link String}
     * @return boolean
     */
    boolean registerUser(RegisterUserDTO userDTO);

    /**
     * Method for giving more info to the user when register
     * @param username {@link String} the username to look for
     * @param email {@link String} the email to look for
     * @return true if the login exists, otherwise - false
     */
    boolean hasLogin(final String username, final String email);

    /**
     * Finds the user by username
     * @param username {@link String}
     * @return userDTO {@link UserFullDTO}
     */
    UserFullDTO getFullUserInfoByUsername(final String username);
}
