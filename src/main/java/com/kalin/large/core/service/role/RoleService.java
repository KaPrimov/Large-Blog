package com.kalin.large.core.service.role;

import com.kalin.large.core.model.roles.Role;

public interface RoleService {
    Role findRoleByName(String name);
}
