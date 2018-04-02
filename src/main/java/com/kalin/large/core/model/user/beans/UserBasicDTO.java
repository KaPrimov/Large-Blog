package com.kalin.large.core.model.user.beans;

public class UserBasicDTO {
	private Long id;
	private String username;
	
	public UserBasicDTO(Long id, String username) {
		this.id = id;
		this.username = username;
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}
}
