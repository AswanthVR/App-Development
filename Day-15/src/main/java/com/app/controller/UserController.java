package com.app.controller;

import java.util.List;
import java.util.Optional;

import com.app.security.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.DeleteExchange;

import com.app.entity.User;
import com.app.service.UserService;

import static com.app.security.service.AuthenticationService.*;

@RestController
public class UserController {
	@Autowired AuthenticationService service;
	@Autowired
	UserService userService;

	@GetMapping("/api/user/getusers")
	public List<User> getUser(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/api/user/post")
	public void saveUsers(@RequestBody User user) {
		userService.saveUsers(user);
	}
	
	@DeleteMapping("/api/user/delete/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id , @RequestBody User user){
		User updatedUser = userService.updateUser(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	@GetMapping("/api/user/getUser/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id){
		User user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/api/user/getUserByEmail/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
		Optional<User> userOptional = userService.getUserByEmail(email);
		return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}


	
}
