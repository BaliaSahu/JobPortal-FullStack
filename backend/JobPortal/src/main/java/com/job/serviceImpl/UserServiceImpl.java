package com.job.serviceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.job.dtos.UserDto;
import com.job.entity.JobPost;
import com.job.entity.UserEntity;
import com.job.exceptions.DataNotFoundException;
import com.job.repositories.JobPostRepo;
import com.job.repositories.UserRepo;
import com.job.request.UserRegisterRequest;
import com.job.response.JobPostResponse;
import com.job.response.RecruiterResponse;
import com.job.response.UserEntityResponse;
import com.job.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JobPostRepo jobRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto createUser(UserRegisterRequest user) throws Exception {
		// TODO Auto-generated method stub
		Optional<UserEntity>userEn=this.userRepo.findByEmail(user.getEmail());
		if(userEn.isPresent()) {
			throw new Exception("Email Already Exist");
		}
		UserEntity us=this.modelMapper.map(user, UserEntity.class);
		String hashPass=passwordEncoder.encode(us.getPassword());
		us.setRole("user");
		us.setPassword(hashPass);
		us.setEducation(new ArrayList<>());
		us.setExperience(new ArrayList<>());
		us.setCertification(new ArrayList<>());
		us.setProjects(new ArrayList<>());
		
		UserEntity user2=this.userRepo.save(us);
		return this.modelMapper.map(user2, UserDto.class);
	}

	@Override
	public UserDto updateUser(String email,UserDto userDto) {
		Optional<UserEntity>userEn=this.userRepo.findByEmail(email);
		if(!userEn.isPresent()) {
			throw new DataNotFoundException("User Not Found");
		}
		UserEntity user=userEn.get();
		user=this.modelMapper.map(userDto,UserEntity.class);
		
		user=this.userRepo.save(user);
		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public UserDto readUser(String email) {
		Optional<UserEntity>userEn=this.userRepo.findByEmail(email);
		if(!userEn.isPresent()) {
			throw new DataNotFoundException("User Not Found");
		}
		UserEntity user=userEn.get();
		 
		return this.modelMapper.map(user, UserDto.class);
	}

	@Override
	public Page<JobPostResponse> jobPosts(int page,int size) {
		System.out.println(page+" dfghjkrtyuiotyucvbnghjk "+size); 
		Pageable pageable=PageRequest.of(page, size,Sort.by("postesDate").descending());
		
		Page<JobPost> jobPage=this.jobRepo.findAll(pageable);
		
		List<JobPostResponse> jobPostResponses = jobPage.stream()
		        .map(job -> modelMapper.map(job, JobPostResponse.class))
		        .toList();
		
	    return new PageImpl<>(jobPostResponses, pageable, jobPage.getTotalElements());
		
	}
	
	@Override
	public Page<JobPostResponse> jobsForYou(String email,int page,int size) {
		UserEntity user = userRepo.findByEmail(email)
	            .orElseThrow(() -> new DataNotFoundException("User Not Found"));

	    List<String> interestedDomains = user.getInterestedDomains();

	    if (interestedDomains == null || interestedDomains.isEmpty()) {
	        throw new DataNotFoundException("Please update your profile to use this service.");
	    }

	    Pageable pageable = PageRequest.of(
	            page,
	            size,
	            Sort.by("postedDate").descending()
	    );

	    Page<JobPost> jobPage =
	            jobRepo.findByCategoryInAndAppliedUserEmailsNotContaining(
	                    interestedDomains,
	                    email,
	                    pageable
	            );
	    List<JobPostResponse> jobPostResponses = jobPage.stream()
		        .map(job -> modelMapper.map(job, JobPostResponse.class))
		        .toList();
	    return new PageImpl<>(jobPostResponses, pageable, jobPage.getTotalElements());
	}

	@Override
	public RecruiterResponse recruiterDetails(String email) {
		// TODO Auto-generated method stub
		
		Optional<UserEntity> resOp=this.userRepo.findByEmail(email);
		if(resOp.isEmpty() || resOp.get().getRole().equalsIgnoreCase("user")) {
			throw new DataNotFoundException("No Recruiter available");
		}
		RecruiterResponse res=this.modelMapper.map(resOp.get(), RecruiterResponse.class);
		List<JobPost> posts=this.jobRepo.findBypostedByEmail(email);
		if(posts==null || posts.isEmpty()) {
			return res;
		}
		List<JobPostResponse> postRes=posts.stream().map((e)-> this.modelMapper.map(e, JobPostResponse.class)).collect(Collectors.toList());
		List<JobPost> pnew=postRes.stream().map((e)-> this.modelMapper.map(e, JobPost.class)).collect(Collectors.toList());
		res.setJobPosts(pnew);
		return res;
	}

	@Override
	public boolean applyJob(String id, String email) {
		
		JobPost post = jobRepo.findById(id)
	            .orElseThrow(() ->
	                    new DataNotFoundException("Job post not found"));

	    if (!"open".equalsIgnoreCase(post.getStatus())) {
	        throw new DataNotFoundException("Job is no longer accepting applications");
	    }

	    UserEntity user = userRepo.findByEmail(email)
	            .orElseThrow(() ->
	                    new DataNotFoundException("User not found"));

	    if ("recruiter".equalsIgnoreCase(user.getRole())) {
	        throw new DataNotFoundException("Recruiters cannot apply for jobs");
	    }
		
		Set<String> applied=post.getAppliedUserEmails();
		if(applied==null) {
			applied=new HashSet<>();
		}
		applied.add(email);
		post.setAppliedUserEmails(applied);
		this.jobRepo.save(post);
		
		return true;
		
	}

	@Override
	public Page<JobPostResponse> appliedJobs(String email,int page ,int size) {
		UserEntity user = userRepo.findByEmail(email)
	            .orElseThrow(() ->
	                    new DataNotFoundException("User not found"));

	    if ("recruiter".equalsIgnoreCase(user.getRole())) {
	        throw new DataNotFoundException("Recruiters cannot apply for jobs");
	    }
	    
	    
	    Pageable pageable=PageRequest.of(page, size,Sort.by("postedDate").descending());
	    
	    Page<JobPost> jobPage=this.jobRepo.findByAppliedUserEmailsContaining(email, pageable);
	    
	    List<JobPostResponse> jobPostResponses = jobPage.stream()
		        .map(job -> modelMapper.map(job, JobPostResponse.class))
		        .toList();
	    return new PageImpl<>(jobPostResponses, pageable, jobPage.getTotalElements());
	}

	@Override
	public UserEntityResponse getUserDetails(String email) {
		
		UserEntity user=userRepo.findByEmail(email).orElseThrow(()-> new DataNotFoundException("User Not Found"));
		
		UserEntityResponse userRes=this.modelMapper.map(user, UserEntityResponse.class);
		return userRes;
	}

	@Override
	public Page<JobPostResponse> searchJobsByTitle(String keyword, int page, int size) {
	    Pageable pageable = PageRequest.of(page, size, Sort.by("postedDate").descending());
	    Page<JobPost> jobPosts;

	    if (keyword == null || keyword.trim().isEmpty()) {
	        jobPosts = jobRepo.findAll(pageable);
	    } else {
	        jobPosts = jobRepo.searchByTitle(keyword, pageable);
	    }

	    List<JobPostResponse> jobPostResponses = jobPosts.stream()
	        .map(job -> modelMapper.map(job, JobPostResponse.class))
	        .toList();

	    return new PageImpl<>(jobPostResponses, pageable, jobPosts.getTotalElements());
	} 


}
