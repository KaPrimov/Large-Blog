package com.kalin.large.core.service.security;

import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * {@link SecurityService} implementation
 */
@Service
public class SecurityServiceImpl implements SecurityService {

    private final ModelMapper modelMapper;

    @Autowired
    public SecurityServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    /**
     * @see SecurityService#getLoggedInUser()
     */
    @Override
    public UserFullDTO getLoggedInUser() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Object currentUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (currentUser instanceof User) {

                User loggedInUser = (User) currentUser;
                return this.modelMapper.map(loggedInUser, UserFullDTO.class);
            }
        }

        return null;
    }
}
