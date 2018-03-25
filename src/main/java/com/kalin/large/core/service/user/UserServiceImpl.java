package com.kalin.large.core.service.user;

import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.RegisterUserDTO;
import com.kalin.large.core.repository.user.UserRepository;
import com.kalin.large.core.service.role.RoleService;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private static final String ROLE_USER = "ROLE_USER";
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, RoleService roleService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
    }

    @Override
    public boolean registerUser(final RegisterUserDTO userDTO) {
        if (userExists(userDTO)) {
            return false;
        }
        initializeMapping();
        User user = modelMapper.map(userDTO, User.class);
        user.setAuthorities(new HashSet<>(Collections.singletonList(roleService.findRoleByName(ROLE_USER))));
        this.userRepository.save(user);
        return true;
    }

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

    private boolean userExists(RegisterUserDTO userDTO) {
       User isUsernameExisting = this.userRepository.findFirstByUsername(userDTO.getUsername());
       if (isUsernameExisting == null) {
           User isEmailExisting = this.userRepository.findFirstByEmail(userDTO.getEmail());
           if (isEmailExisting == null) {
               return false;
           }
       }
       return true;
    }
}
