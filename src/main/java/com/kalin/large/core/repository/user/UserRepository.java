package com.kalin.large.core.repository.user;

import com.kalin.large.core.model.roles.beans.AuthorityRoleDTO;
import com.kalin.large.core.model.user.User;
import com.kalin.large.core.model.user.beans.UserFullDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByUsername(String username);

    User findFirstByEmail(String email);

    @Query("SELECT new com.kalin.large.core.model.user.beans.UserFullDTO(u) FROM User AS u")
    Set<UserFullDTO> findAllUsers();

    @Query("SELECT new com.kalin.large.core.model.roles.beans.AuthorityRoleDTO(Role) FROM User AS u " +
            "INNER JOIN u.authorities Role")
    Set<AuthorityRoleDTO> findAllRolesForUser(@Param("userId") Long userId);
}
