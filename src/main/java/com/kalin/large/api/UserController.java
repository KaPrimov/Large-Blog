package com.kalin.large.api;

import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/api/users")
public class UserController {

    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping(path = "/register")
    public ResponseEntity<Boolean> registerUser(final @RequestBody RegisterUserDTO userDTO) {
        return ResponseEntity.ok(this.userService.registerUser(userDTO));
    }
}
