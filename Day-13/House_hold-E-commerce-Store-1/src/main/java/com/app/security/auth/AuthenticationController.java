package com.app.security.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.security.RegisterRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class AuthenticationController {

	private final AuthenticationService service = new AuthenticationService();
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody RegisterRequest request
			){
		return ResponseEntity.ok(service.register(request));
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> register(
			@RequestBody AuthenticationRequest request
			){
		return ResponseEntity.ok(service.authenticate(request));
		
	}
}
