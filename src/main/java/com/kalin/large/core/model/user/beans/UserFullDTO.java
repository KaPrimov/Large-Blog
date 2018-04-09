package com.kalin.large.core.model.user.beans;

import com.kalin.large.core.model.roles.Role;
import com.kalin.large.core.model.user.User;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Full user DTO
 */
public class UserFullDTO {
    private Long id;

    private String username;

    private String email;

    private Set<String> authorities;

    public UserFullDTO() {
    }

    public UserFullDTO(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.id = user.getId();
        this.setAuthorities(user.getAuthorities().stream().map(Role::getAuthority).collect(Collectors.toSet()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }
}
