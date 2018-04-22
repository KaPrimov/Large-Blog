package com.kalin.large.core.service.user;

import com.kalin.large.core.model.roles.Role;
import com.kalin.large.core.model.roles.beans.AuthorityRoleDTO;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.model.user.beans.UserAuthoritiesDTO;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import com.kalin.large.core.model.user.beans.UserRolesDTO;
import com.kalin.large.core.repository.user.UserRepository;
import com.kalin.large.core.service.error.ErrorCode;
import com.kalin.large.core.service.exception.BusinessLogicException;
import com.kalin.large.core.service.role.RoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    /*---------------------------------------------------- CONSTANTS -------------------------------------------------*/
    private static final String ROLE_USER = "ROLE_USER";

    /*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
    private final UserRepository userRepository;

    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final BCryptPasswordEncoder cryptPasswordEncoder;

    /*---------------------------------------------------- FACTORIES --------------------------------------------------*/
    private final UserFactory userFactory;

    @Autowired
    public UserServiceImpl(final UserRepository userRepository, final ModelMapper modelMapper, final RoleService roleService, final BCryptPasswordEncoder cryptPasswordEncoder, UserFactory userFactory) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
        this.cryptPasswordEncoder = cryptPasswordEncoder;
        this.userFactory = userFactory;
    }

    /**
     * @see com.kalin.large.core.service.user.UserService#registerUser(RegisterUserDTO)
     */
    @Override
    public boolean registerUser(final RegisterUserDTO userDTO) {
        if (userExists(userDTO.getUsername(), userDTO.getEmail())) {
            return false;
        }
        User user = modelMapper.map(userDTO, User.class);
        user.setAccountNonExpired(true);    
        user.setAccountNonLocked(true);     
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);              
        user.setAuthorities(new HashSet<>(Collections.singletonList(roleService.findRoleByName(ROLE_USER))));
        user.setPassword(this.cryptPasswordEncoder.encode(userDTO.getPassword()));
        this.userRepository.save(user);
        return true;
    }

    /**
     * @see com.kalin.large.core.service.user.UserService#hasLogin(String, String)
     */
    @Override
    public boolean hasLogin(final String username, final String email) {
        return this.userExists(username, email);
    }

    /**
     * @see UserService#getFullUserInfoByUsername(String)
     */
    @Override
    public UserFullDTO getFullUserInfoByUsername(String username) {
        User user = this.userRepository.findFirstByUsername(username);
        UserFullDTO userDTO = modelMapper.map(user, UserFullDTO.class);
        userDTO.setAuthorities(user.getAuthorities().stream().map(Role::getAuthority).collect(Collectors.toSet()));
		return userDTO;
    }

    /**
     * @see UserService#getAllUsers()
     */
    @Override
    public Set<UserAuthoritiesDTO> getAllUsers() {
        List<User> allUsers = this.userRepository.findAll();
        Set<UserAuthoritiesDTO> userAuthoritiesDTOS = new LinkedHashSet<>();
        for (User user : allUsers) {
            userAuthoritiesDTOS.add(this.userFactory.createUserWithAuthoritiesDTO(user));
        }
        return userAuthoritiesDTOS;
    }

    @Override
    public Long updateRoles(final Long id, final UserRolesDTO userRolesDTO) throws BusinessLogicException {
        Optional<User> optionalUser = this.userRepository.findById(id);

        if (!optionalUser.isPresent()) {
            throw new BusinessLogicException(ErrorCode.UserService.USER_DOES_NOT_EXISTS, "There is no user with id: " + id);
        }

        Set<Role> roles = new LinkedHashSet<>();

        for (Long roleId : userRolesDTO.getRoles()) {
            roles.add(this.roleService.findRoleById(roleId));
        }

        User user = optionalUser.get();
        user.setAuthorities(roles);
        userRepository.saveAndFlush(user);

        return user.getId();
    }

    @Override
    public Set<AuthorityRoleDTO> listRolesWhichBelongsToUser(final Long id) {
        User user = userRepository.getOne(id);
        return user.getAuthorities().stream().map(a -> new AuthorityRoleDTO(a)).collect(Collectors.toSet());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findFirstByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    /**
     * helper method for checking if user exists in the db
     * @param username {@link String}
     * @param email {@link String}
     * @return boolean
     */
    private boolean userExists(final String username, final String email) {
       User isUsernameExisting = this.userRepository.findFirstByUsername(username);
       if (isUsernameExisting == null) {
           User isEmailExisting = this.userRepository.findFirstByEmail(email);
           return isEmailExisting != null;
       }
       return true;
    }


}
