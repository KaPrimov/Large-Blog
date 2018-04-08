package com.kalin.large.core.repository.user;

import com.kalin.large.core.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByUsername(String username);

    User findFirstByEmail(String email);
}
