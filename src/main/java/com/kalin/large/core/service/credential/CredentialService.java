package com.kalin.large.core.service.credential;

/**
 * Credential service
 *
 * @author Kalin Primov
 */
public interface CredentialService {

    /**
     * Method for giving more info to the user when register
     * @param username {@link String} the username to look for
     * @param email {@link String} the email to look for
     * @return true if the login exists, otherwise - false
     */
    boolean hasLogin(final String username, final String email);
}
