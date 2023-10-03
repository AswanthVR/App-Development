package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.app.entity.Users;
import com.app.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;

	@GetMapping("/api/user/getusers")
	public List<Users> getUser(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/api/user/post")
	public void saveUsers(@RequestBody Users user) {
		userService.saveUsers(user);
	}
	
	@DeleteMapping("/api/user/delete/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Users> updateUser(@PathVariable Long id , @RequestBody Users user){
		Users updatedUser = userService.updateUser(user);
		return ResponseEntity.ok(updatedUser);
	}
	
	@GetMapping("/api/user/getUser/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable Long id){
		Users user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}
	
}
