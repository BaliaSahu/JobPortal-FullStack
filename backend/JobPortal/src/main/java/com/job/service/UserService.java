package com.job.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.job.dtos.UserDto;
import com.job.entity.JobPost;
import com.job.request.UserRegisterRequest;
import com.job.response.JobPostResponse;
import com.job.response.RecruiterResponse;
import com.job.response.UserEntityResponse;

public interface UserService {
	
	public UserDto createUser(UserRegisterRequest user)throws Exception ;
	
	public UserDto updateUser(String email,UserDto userDto);
	
	public UserDto readUser(String email);
	
	public Page<JobPostResponse> jobPosts(int page, int size);

	public Page<JobPostResponse> jobsForYou(String email,int page, int size);

	public RecruiterResponse recruiterDetails(String id);
	
	public boolean applyJob(String id,String email);
	
	public Page<JobPostResponse> appliedJobs(String email,int page ,int size);
	
	public UserEntityResponse getUserDetails(String email);
	
	Page<JobPostResponse> searchJobsByTitle(String keyword, int page, int size);
}
