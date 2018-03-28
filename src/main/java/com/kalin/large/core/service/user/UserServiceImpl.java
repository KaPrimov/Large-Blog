package com.kalin.large.core.service.user;

import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.repository.user.UserRepository;
import com.kalin.large.core.service.role.RoleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    /*---------------------------------------------------- CONSTANTS -------------------------------------------------*/
    private static final String ROLE_USER = "ROLE_USER";

    /*-------------------------------------------------- REPOSITORIES ------------------------------------------------*/
    private final UserRepository userRepository;

    /*---------------------------------------------------- SERVICES --------------------------------------------------*/
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final BCryptPasswordEncoder cryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(final UserRepository userRepository, final ModelMapper modelMapper, final RoleService roleService, BCryptPasswordEncoder cryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
        this.cryptPasswordEncoder = cryptPasswordEncoder;
        initializeMapping();
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findFirstByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
    /**
     * helper method for mapping dtos
     */
    private void initializeMapping() {
        PropertyMap<RegisterUserDTO, User> userMap = new PropertyMap<RegisterUserDTO, User>() {
            @Override
            protected void configure() {
                map().setAccountNonExpired(true);
                map().setAccountNonLocked(true);
                map().setCredentialsNonExpired(true);
                map().setEnabled(true);
            }
        };
        modelMapper.addMappings(userMap);
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
