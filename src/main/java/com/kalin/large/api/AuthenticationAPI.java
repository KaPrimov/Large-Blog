package com.kalin.large.api;

import com.kalin.large.core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationAPI {

    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final UserService userService;;

    @Autowired
    public AuthenticationAPI(UserService userService) {
        this.userService = userService;
    }

    /*------------------------------------------------------ API -----------------------------------------------------*/

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
}
