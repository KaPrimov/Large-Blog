package com.kalin.large.core.service.user;

import com.kalin.large.core.model.user.beans.RegisterUserDTO;

public interface UserService {
    boolean registerUser(RegisterUserDTO userDTO);
}
