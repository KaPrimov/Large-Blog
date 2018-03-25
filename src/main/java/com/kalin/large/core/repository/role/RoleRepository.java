package com.kalin.large.core.repository.role;

import com.kalin.large.core.model.roles.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findFirstByAuthority(String authority);
}
