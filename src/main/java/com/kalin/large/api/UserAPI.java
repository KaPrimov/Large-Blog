package com.kalin.large.api;

import com.kalin.large.core.model.roles.Role;
import com.kalin.large.core.model.roles.beans.AuthorityRoleDTO;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.model.user.beans.UserAuthoritiesDTO;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import com.kalin.large.core.model.user.beans.UserRolesDTO;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.exception.ElementNotFound;
import com.kalin.large.core.service.exception.RestWebServiceException;
import com.kalin.large.core.service.security.SecurityService;
import com.kalin.large.core.service.user.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Controller
@RequestMapping(path = "/api/users")
public class UserAPI {

    /*---------------------------------------------------- CONSTANTS --------------------------------------------------*/
    private static final String ROLE_PREFIX = "ROLE_";
    private static final String ADMINISTRATOR_ROLE = "ADMINISTRATOR";
    private static final String SUPER_ADMIN_ROLE = "SUPER_ADMIN";
    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final UserService userService;
    private final SecurityService securityService;

    @Autowired
    public UserAPI(UserService userService, SecurityService securityService) {
        this.userService = userService;
        this.securityService = securityService;
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping(path = "/register")
    public ResponseEntity<Boolean> registerUser(final @RequestBody RegisterUserDTO userDTO) {
        return ResponseEntity.ok(this.userService.registerUser(userDTO));
    }

    @PreAuthorize("hasAnyRole('ADMINISTRATOR, SUPER_ADMIN')")
    @GetMapping
    public ResponseEntity<Set<UserAuthoritiesDTO>> getAllUsers() {
        UserFullDTO currentUser = securityService.getLoggedInUser();

        if (currentUser.getAuthorities().stream().anyMatch(role -> role.replace(ROLE_PREFIX, StringUtils.EMPTY).equals(ADMINISTRATOR_ROLE) || role.replace(ROLE_PREFIX, StringUtils.EMPTY).equals(SUPER_ADMIN_ROLE))) {
            return ResponseEntity.ok(this.userService.getAllUsers());
        } else {
            throw new RestWebServiceException(ErrorCode.Authority.WRONG_ROLE, "Wrong Role!");
        }
    }

    /**
     * Update {@link Role}s for an {@link User}
     *
     * @param id
     * @param employeeRolesDTO
     * @return
     */
    @PreAuthorize("hasAnyRole('ADMINISTRATOR, SUPER_ADMIN')")
    @PutMapping(path = "/{id}/roles", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<Long> updateRoles(@PathVariable final Long id, @RequestBody final UserRolesDTO employeeRolesDTO) {
        UserFullDTO currentUser = securityService.getLoggedInUser();
        try {
            ResponseEntity<Long> responseEntity = ResponseEntity.ok(userService.updateRoles(id, employeeRolesDTO));

            return responseEntity;

        } catch (BusinessLogicException ble) {
            switch (ble.getErrorCode()) {
                case ErrorCode.UserService.USER_DOES_NOT_EXISTS:
                    throw new ElementNotFound(ble.getErrorCode(), ble.getMessage());

                default:
                    throw new RestWebServiceException(ble.getErrorCode(), ble.getMessage(), ble);
            }
        }
    }

    /**
     * List all {@link Role}s by specific {@link User}
     *
     * @param id the id of some {@link User}
     */
    @PreAuthorize("hasAnyRole('ADMINISTRATOR, SUPER_ADMIN')")
    @GetMapping(path = "/{id}/roles", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<Set<AuthorityRoleDTO>> listEmployeeRoles(@PathVariable final Long id) {
        return ResponseEntity.ok(userService.listRolesWhichBelongsToUser(id));
    }
}
