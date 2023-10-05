package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.User;
import com.app.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	

	public List<User> getAllUsers()
	{
		return userRepo.findAll();
	}
	
	public User getUserById(Long id) {
		return userRepo.findById(id).orElse(null);
	}
	
	public User saveUsers(User user) {
		return userRepo.save(user);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
	
	public User updateUser(User user) {
		return userRepo.save(user);
	}
	
	
}
