package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Users;
import com.app.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	

	public List<Users> getAllUsers()
	{
		return userRepo.findAll();
	}
	
	public Users getUserById(Long id) {
		return userRepo.findById(id).orElse(null);
	}
	
	public Users saveUsers(Users user) {
		return userRepo.save(user);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
	
	public Users updateUser(Users user) {
		return userRepo.save(user);
	}
	
	
}
