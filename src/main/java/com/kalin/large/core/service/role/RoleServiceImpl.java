package com.kalin.large.core.service.role;

import com.kalin.large.core.model.roles.Role;
import com.kalin.large.core.model.roles.beans.AuthorityRoleDTO;
import com.kalin.large.core.repository.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findRoleByName(String name) {
        return this.roleRepository.findFirstByAuthority(name);
    }

    @Override
    public Role findRoleById(final Long id) {
        return this.roleRepository.getOne(id);
    }
}
