package com.kalin.large.api;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blog")
public class BlogAPI {
	
	@PostMapping("/create")
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<String> postCreate() {
		return ResponseEntity.ok("Logged");		
	}
}
