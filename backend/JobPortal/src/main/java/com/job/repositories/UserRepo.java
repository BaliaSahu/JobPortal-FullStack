package com.job.repositories;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.job.entity.UserEntity;

@Repository
public interface UserRepo extends MongoRepository<UserEntity,String> {
	
	public Optional<UserEntity> findByEmail(String email);
	
	public Page<UserEntity> findByEmailIn(Collection<String> emails,Pageable pageable);
	
	public Page<UserEntity> findBySkillsIn(List<String> skills,Pageable pageable);
}
