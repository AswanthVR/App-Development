package com.app.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

	public Optional<User> getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	public User addPhoneNumber(Long userId, String phoneNumber) {
		Optional<User> optionalUser = userRepo.findById(userId);

		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setPhone(phoneNumber);
			return userRepo.save(user);
		} else {
			throw new NoSuchElementException("User with ID " + userId + " not found");
		}
	}



}
