package com.kalin.large.core.model.roles.beans;

/**
 * Role DTO to be used in the authenticated user
 */
public class RoleDTO {
    private String authority;

    public RoleDTO() {
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
