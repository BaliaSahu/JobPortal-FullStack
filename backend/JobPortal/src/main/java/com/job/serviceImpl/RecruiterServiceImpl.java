package com.job.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.job.dtos.AppliedCandidateDto;
import com.job.dtos.UserDto;
import com.job.entity.JobPost;
import com.job.entity.UserEntity;
import com.job.exceptions.DataNotFoundException;
import com.job.repositories.JobPostRepo;
import com.job.repositories.UserRepo;
import com.job.request.JobPostRequest;
import com.job.request.RecruiterRegisterRequest;
import com.job.request.RecruiterUpdate;
import com.job.response.JobPostResponse;
import com.job.response.RecruiterResponse;
import com.job.response.UserEntityResponse;
import com.job.service.CloudinaryService;
import com.job.service.RecruiterService;

@Service
public class RecruiterServiceImpl implements RecruiterService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private JobPostRepo jobRepo;
	
	@Autowired
	private ModelMapper modelMapper;
//	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Override
	public RecruiterResponse registerRecruiter(RecruiterRegisterRequest req) throws Exception {
		Optional<UserEntity> u=this.userRepo.findByEmail(req.getEmail());
		if(u.isPresent()) {
			throw new Exception("Email Already Exist");
		}
		UserEntity recruit=this.modelMapper.map(req,UserEntity.class);
		recruit.setRole("recruiter");
		String hashPassword=this.passwordEncoder.encode(req.getPassword());
		recruit.setPassword(hashPassword);
		recruit=this.userRepo.save(recruit);
		return this.modelMapper.map(recruit, RecruiterResponse.class);
	}
	@Override
	public RecruiterResponse updateRecruiter(RecruiterUpdate req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("Invalid Email id");
		}
		UserEntity userEn=userOp.get();
		userEn.setFullName(req.getFullName());
		userEn.setMobile(req.getMobile());
		userEn.setAddress(req.getAddress());
		userEn.setExperienceYears(req.getExperienceYears());
		userEn.setCompany(req.getCompany());
		
		userEn=this.userRepo.save(userEn);
		return this.modelMapper.map(userEn, RecruiterResponse.class);
	}

	 @Override
	 public Page<JobPost> allJobPostsByRecruiter(String email, int page, int size) {

       Pageable pageable = PageRequest.of(page, size);
       return jobRepo.findByPostedByEmail(email, pageable);
	 }
	@Override
	public JobPostResponse updateJobPost(JobPostRequest jobpost, String jobId,String email) {
		System.out.println(jobpost.getSalPackage()+"\n"+jobpost.getExperience());
		Optional<JobPost> jobOp=this.jobRepo.findById(jobId);
		if(jobOp.isEmpty()) {
			throw new DataNotFoundException("Invalid Job id");
		}
		JobPost job=jobOp.get();
		if(!job.getPostedByEmail().equals(email)) {
			throw new DataNotFoundException("Bad Request");
		}
	
	    job.setTitle(jobpost.getTitle());
	    job.setDescription(jobpost.getDescription());
	    job.setSkills(jobpost.getSkills());
	    job.setExperience(jobpost.getExperience());
	    job.setLocation(jobpost.getLocation());
	    job.setCompanyName(jobpost.getCompanyName());
	    job.setCategory(jobpost.getCategory().toUpperCase());
	    job.setSalPackage(jobpost.getSalPackage());

	    
	    job.setStatus("OPEN");
		job=this.jobRepo.save(job);
		return this.modelMapper.map(job, JobPostResponse.class);
	}  

	@Override
	public JobPost createJobPost(String email,JobPostRequest jobPostRequest) throws Exception {
		Optional<UserEntity> u=this.userRepo.findByEmail(email);
		if(!u.isPresent()) {
			throw new Exception("User Not Exists");
		}
		UserEntity us=u.get();
		if(us.getRole().equals("user")) {
			throw new Exception("You dont have access to create a job post");
		}
		
		JobPost jobPost=this.modelMapper.map(jobPostRequest, JobPost.class);
		jobPost.setPostedByEmail(email);
		jobPost.setCategory(jobPostRequest.getCategory().toUpperCase());
		jobPost=this.jobRepo.save(jobPost);
		
		return jobPost;
	}

	@Override
	public JobPostResponse jobById(String id) {
		
		Optional<JobPost> jobOp=this.jobRepo.findById(id);
		
		
		if(jobOp.isEmpty()) {
			throw new DataNotFoundException("Invalid Job id");
		}
		System.out.println(jobOp.get().getTitle());
		JobPostResponse res=this.modelMapper.map(jobOp.get(), JobPostResponse.class);
		return res;
	}

	@Override 
	public Boolean deleteJobPost(String email, String id) {
		
		Optional<JobPost> jobOp=this.jobRepo.findById(id);
		if(jobOp.isEmpty()) {
			throw new DataNotFoundException("Invalid Job id");
		}
		JobPost job=jobOp.get();
		if(!job.getPostedByEmail().equals(email)) {
			throw new DataNotFoundException("Bad Request");
		}
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		
		List<JobPost> posts=userOp.get().getJobPosts();
		if(posts==null) {
			posts=new ArrayList<>();
		}
		Boolean b=posts.removeIf(e-> e.getId().equals(id));
		if(!b) {
			return false;
		}
		this.userRepo.save(userOp.get());
		this.jobRepo.deleteById(id);
		return true;
	}

	@Override
	public Page<AppliedCandidateDto> postApplied(int page, int size,String email, String jobId) {
		 JobPost job = jobRepo.findById(jobId)
		            .orElseThrow(() -> new DataNotFoundException("Invalid Job id"));

		    if (!job.getPostedByEmail().equals(email)) {
		        throw new DataNotFoundException("Bad Request");
		    }

		    Set<String> emails = job.getAppliedUserEmails();
		    if (emails == null || emails.isEmpty()) {
		        return Page.empty();
		    }

		    Pageable pageable = PageRequest.of(
		            page,
		            size,
		            Sort.by("fullName").ascending()
		    );

		    Page<UserEntity> userPage =
		            userRepo.findByEmailIn(emails, pageable);

		    return userPage.map(user ->
		            modelMapper.map(user, AppliedCandidateDto.class)
		    ); 
	}

	@Override
	public RecruiterResponse recruiterDetails(String email) {
		Optional<UserEntity> u=this.userRepo.findByEmail(email);
		if(!u.isPresent()) {
			throw new DataNotFoundException("Recruiter Not Exists");
		}
		UserEntity us=u.get();
		if(us.getRole().equalsIgnoreCase("user")) {
			throw new DataNotFoundException("You dont have access to create a job post");
		}
		System.out.println("jouche");
		RecruiterResponse res=this.modelMapper.map(u, RecruiterResponse.class);
		
		return res;
	}
	@Override
	public RecruiterResponse uploadImage(MultipartFile img, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("Invalid Email id");
		}
		UserEntity userEn=userOp.get();
		Map map=this.cloudinaryService.uploadImage(img);
		userEn.setImgUrl((String)map.get("secure_url"));
		userEn.setImgPublicId((String)map.get("public_id"));
		userEn=this.userRepo.save(userEn);
		return this.modelMapper.map(userEn, RecruiterResponse.class);
	}
	@Override
	public UserEntityResponse userDetails(String email) {
		Optional<UserEntity> u=this.userRepo.findByEmail(email);
		if(!u.isPresent()) {
			throw new DataNotFoundException("User Not Exists");
		}
		UserEntity us=u.get();
		if(!us.getRole().equalsIgnoreCase("user")) {
			throw new DataNotFoundException("You dont have access to create a job post");
		}
		UserEntityResponse res=this.modelMapper.map(us, UserEntityResponse.class);
		return res;
	}
	@Override
    public Page<AppliedCandidateDto> findCandidatesBySkills(
            List<String> skills,
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        
        List<String> skills2=skills.stream().map(e-> e.toUpperCase()).collect(Collectors.toList());
        Page<UserEntity> users =
                userRepo.findBySkillsIn(skills2, pageable);
        
        // Convert UserEntity -> AppliedCandidateDto
        return users.map(user -> {
            AppliedCandidateDto dto = new AppliedCandidateDto();
            dto.setId(user.getId());
            dto.setFullName(user.getFullName());
            dto.setEmail(user.getEmail());
            dto.setMobile(user.getMobile());
            dto.setImgUrl(user.getImgUrl());
            dto.setResume(user.getResume());
            dto.setSkills(user.getSkills());
            dto.setProfileSummary(user.getProfileSummary());
            return dto;
        });
    }

}
