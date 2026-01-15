package com.job.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.job.dtos.AppliedCandidateDto;
import com.job.dtos.UserDto;
import com.job.entity.JobPost;
import com.job.request.JobPostRequest;
import com.job.request.RecruiterRegisterRequest;
import com.job.request.RecruiterUpdate;
import com.job.response.JobPostResponse;
import com.job.response.RecruiterResponse;
import com.job.response.UserEntityResponse;

public interface RecruiterService {
	
	public RecruiterResponse registerRecruiter(RecruiterRegisterRequest req) throws Exception;
	
	
	public RecruiterResponse updateRecruiter(RecruiterUpdate req,String email);
	
	public RecruiterResponse uploadImage(MultipartFile img,String email);
	
	public RecruiterResponse recruiterDetails(String email);
	
	public UserEntityResponse userDetails(String email);
	
	Page<JobPost> allJobPostsByRecruiter(String email, int page, int size);
	
	public JobPostResponse jobById(String id);
	
	public JobPostResponse updateJobPost(JobPostRequest jobpost, String jobId,String email);
	
	public JobPost createJobPost(String email,JobPostRequest jobPostRequest) throws Exception;
	
	public Boolean deleteJobPost(String email,String id);
	
	public Page<AppliedCandidateDto> postApplied(int page , int size, String email,String jobId); 
	
	 Page<AppliedCandidateDto> findCandidatesBySkills(
	            List<String> skills,
	            int page,
	            int size
	    );
	 
}
