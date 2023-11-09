package com.app.controller;

import java.util.List;
import java.util.NoSuchElementException;
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
@CrossOrigin(origins = "http://localhost:3000")
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



	@PutMapping("/api/user/addPhoneNumber/{id}")
	public ResponseEntity<User> addPhoneNumber(@PathVariable Long id, @RequestParam String phoneNumber) {
		try {
			User updatedUser = userService.addPhoneNumber(id, phoneNumber);
			return ResponseEntity.ok(updatedUser);
		} catch (NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
