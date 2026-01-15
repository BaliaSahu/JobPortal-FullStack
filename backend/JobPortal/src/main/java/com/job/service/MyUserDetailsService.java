package com.job.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.job.entity.UserEntity;
import com.job.repositories.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<UserEntity> userOp=this.userRepo.findByEmail(username);
		if(!userOp.isPresent()) {
			throw new UsernameNotFoundException("User Not Found");
		}
		UserEntity userEn=userOp.get();
		
		
		return new User(userEn.getEmail(),userEn.getPassword(),Collections.emptyList());
	
	}

}
