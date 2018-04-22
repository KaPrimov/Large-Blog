package com.kalin.large.core.service.user;

import com.kalin.large.core.model.roles.beans.AuthorityRoleDTO;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.model.user.beans.UserAuthoritiesDTO;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import com.kalin.large.core.model.user.beans.UserRolesDTO;
import com.kalin.large.core.service.exception.BusinessLogicException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Set;

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

    /**
     * @return Set of {@link UserAuthoritiesDTO}
     */
    Set<UserAuthoritiesDTO> getAllUsers();
    /**
     * Update the employee's roles
     *
     * @param id
     *            the id of the {@link User}, which roles should be updated
     * @param employeeRolesDTO
     *            the new roles
     * @return the id of the updated {@link User}'s roles
     * @throws BusinessLogicException
     */
    Long updateRoles(Long id, UserRolesDTO employeeRolesDTO) throws BusinessLogicException;

    /**
     * List all {@link com.kalin.large.core.model.roles.Role}s which belongs to specific {@link User}
     *
     * @param id
     * @return {@link Set} from {@link com.kalin.large.core.model.roles.beans.RoleDTO}
     */
    Set<AuthorityRoleDTO> listRolesWhichBelongsToUser(Long id);
}
