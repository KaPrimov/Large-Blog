package com.kalin.large.core.model.user.beans;

import com.kalin.large.core.model.roles.beans.RoleDTO;

import java.util.Set;

/**
 * Full user DTO
 */
public class UserFullDTO {
    private Long id;

    private String username;

    private String password;

    private String email;

    private Set<RoleDTO> authorities;

    public UserFullDTO() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<RoleDTO> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<RoleDTO> authorities) {
        this.authorities = authorities;
    }
}
