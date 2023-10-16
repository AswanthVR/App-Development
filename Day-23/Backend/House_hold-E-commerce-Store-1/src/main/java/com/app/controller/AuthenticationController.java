package com.app.controller;

import com.app.entity.User;
import com.app.security.service.AuthenticationService;
import com.app.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import constant.Api;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import request.AuthenticationRequest;
import request.RegisterRequest;
import response.AuthenticationResponse;

@RestController
@RequestMapping(Api.AUTH)
@RequiredArgsConstructor
//@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authService;

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        boolean isRegistered = authService.userRegistration(request);
        return isRegistered ? ResponseEntity.ok("User registered successfully")
                : ResponseEntity.badRequest().body("Sommething went wrong!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.userAuthentication(request));
    }

    @PostMapping("/register/google")
    public ResponseEntity<String> google_register(@RequestBody RegisterRequest request) {
        boolean isRegistered = authService.userRegistration_google(request);
        return isRegistered ? ResponseEntity.ok("User registered successfully")
                : ResponseEntity.badRequest().body("Sommething went wrong!");
    }

    @PostMapping("/login/google")
    public ResponseEntity<AuthenticationResponse> authenticate_google(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.userAuthentication(request));
    }





}