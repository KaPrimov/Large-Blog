package com.kalin.large.api;

import com.kalin.large.core.model.user.beans.UserFullDTO;
import com.kalin.large.core.service.security.SecurityService;
import com.kalin.large.core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@RestController
public class AuthenticationAPI {

    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final UserService userService;;

    /*------------------------------------------------------ API -----------------------------------------------------*/
    @Autowired
    public AuthenticationAPI(UserService userService, SecurityService securityService) {
        this.userService = userService;
    }

    /**
     * Check if a login already exists
     *
     * @param username and @param password
     *            to look for
     * @return true if the login exists, otherwise - false
     */
    @GetMapping(value = "/loginExists", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<Boolean> loginExists(@RequestParam(required = true) final String username, @RequestParam(required = true) final String email) {

        if (userService.hasLogin(username, email)) {
            return ResponseEntity.ok(Boolean.TRUE);
        }
        return ResponseEntity.ok(Boolean.FALSE);
    }

    /**
     * Gets the data of the currently logged in user
     * @param principal {@link Principal}
     * @return userDTO {@link UserFullDTO}
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping(path = "/success-login")
    public ResponseEntity<UserFullDTO> getLoggedInUser(final Principal principal) {
        return ResponseEntity.ok(this.userService.getFullUserInfoByUsername(principal.getName()));
    }

    /**
     * Logout the authenticated user
     */
    @GetMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<Boolean> logout(final HttpServletRequest request, final HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
