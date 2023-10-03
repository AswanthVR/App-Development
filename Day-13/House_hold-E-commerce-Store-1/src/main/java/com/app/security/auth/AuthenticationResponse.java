package com.app.security.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
	
	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public AuthenticationResponse(String token) {
		super();
		this.token = token;
	}

	public AuthenticationResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
