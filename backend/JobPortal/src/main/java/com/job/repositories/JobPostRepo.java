package com.job.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.job.entity.JobPost;

@Repository
public interface JobPostRepo extends MongoRepository<JobPost,String> {
	List<JobPost> findBypostedByEmail(String email);
	
	List<JobPost> findByCategoryIn(List<String> categories,Pageable pageable);
	
	Page<JobPost> findByCategoryInAndAppliedUserEmailsNotContaining( List<String> categories,
	        String email,
	        Pageable pageable);
	
	Page<JobPost> findByAppliedUserEmailsContaining(String email,Pageable pageable);
	
	List<JobPost> findByAppliedUserEmailsContaining(String email);
	
	Page<JobPost> findByPostedByEmail(String email, Pageable pageable);
	
	@Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    Page<JobPost> searchByTitle(String keyword, Pageable pageable);
}
