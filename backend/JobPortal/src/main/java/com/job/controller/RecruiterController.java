package com.job.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.job.dtos.AppliedCandidateDto;
import com.job.entity.JobPost;
import com.job.request.JobPostRequest;
import com.job.request.RecruiterRegisterRequest;
import com.job.request.RecruiterUpdate;
import com.job.response.JobPostResponse;
import com.job.response.RecruiterResponse;
import com.job.response.UserEntityResponse;
import com.job.service.RecruiterService;
import com.job.utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins={"https://jobcrackk.netlify.app" ,"https://jobcrackr.netlify.app"})
public class RecruiterController {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private RecruiterService recruiterService;
	
	@PostMapping("/register/hr")  
	public ResponseEntity<?> createUser(@RequestBody RecruiterRegisterRequest recruit){ 
		System.out.println("ASLAA");
		try {
			
			RecruiterResponse recruiterResponse=this.recruiterService.registerRecruiter(recruit);
			return new ResponseEntity<RecruiterResponse>(recruiterResponse,HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
			
		}
	}
	@GetMapping("/applied/users/{jobId}")
	public ResponseEntity<?> getAppliedUsers(
	        @PathVariable("jobId") String jobId,
	        @RequestParam(defaultValue="0") int page,
	        @RequestParam(defaultValue="10") int size,
	        HttpServletRequest req
	        
	) {
		try {
			System.out.println("ASLAA");
			String email=getEmail(req.getHeader("Authorization"));
			Page<AppliedCandidateDto> dtos=this.recruiterService.postApplied(page, size, email, jobId);
			return new ResponseEntity<Page<AppliedCandidateDto>>(dtos,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/candidates/skills")
	public ResponseEntity<?> getCandidatesBySkills(
            @RequestParam List<String> skills,
            @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size
	   ) {
		try {
	         Page<AppliedCandidateDto> result = recruiterService.findCandidatesBySkills(skills, page, size);

	            return ResponseEntity.ok(result);
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	}
	@GetMapping("/recruiter/details")
	public ResponseEntity<?> getDetails(HttpServletRequest req){
		System.out.println("ASLAA");
		try {
			String email=getEmail(req.getHeader("Authorization"));
			RecruiterResponse recruiterResponse=this.recruiterService.recruiterDetails(email);
			return new ResponseEntity<RecruiterResponse>(recruiterResponse,HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
			
		}
	}
	@GetMapping("/user/details/{email}")
	public ResponseEntity<?> getUserDetails(@PathVariable("email") String email, HttpServletRequest req){
		System.out.println("ASLAA");
		try {
			
			UserEntityResponse res=this.recruiterService.userDetails(email);
			return new ResponseEntity<UserEntityResponse>(res,HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
			
		}
	}
	@PutMapping("/recruiter/update")
	public ResponseEntity<?> updateProfile(@RequestBody RecruiterUpdate recr,HttpServletRequest req){
		System.out.println("ASLAA"+recr);
		try {
			String email=getEmail(req.getHeader("Authorization"));
			RecruiterResponse recruiterResponse=this.recruiterService.updateRecruiter(recr, email);
			return new ResponseEntity<RecruiterResponse>(recruiterResponse,HttpStatus.OK);
			
		}catch(Exception e) { 
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
			
		}
	}
	@PutMapping("/recruiter/upload")
	public ResponseEntity<?> updateProfileImage(@RequestPart("img") MultipartFile img,HttpServletRequest req){
		System.out.println("ASLAA");
		try {
			String email=getEmail(req.getHeader("Authorization"));
			RecruiterResponse recruiterResponse=this.recruiterService.uploadImage(img, email);
			return new ResponseEntity<RecruiterResponse>(recruiterResponse,HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
			
		}
	} 
	@PostMapping("/create/jobpost")
	public ResponseEntity<?> createJobPost(@RequestBody JobPostRequest jobPostRequest,HttpServletRequest req){ 
		try {
			System.out.println("ASLAA");
			String email=getEmail(req.getHeader("Authorization"));
			JobPost jobPost=this.recruiterService.createJobPost(email, jobPostRequest);
			return new ResponseEntity<JobPost>(jobPost,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/job/{id}")
	public ResponseEntity<?> getJobById( @PathVariable("id") String id, HttpServletRequest req){
		try {
			System.out.println("AYAYAYAYYAYAAYYA");
			String email=getEmail(req.getHeader("Authorization"));
		
			JobPostResponse job=this.recruiterService.jobById(id);
			System.out.println(job);
			return new ResponseEntity<JobPostResponse>(job,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
		}
	}
	@PutMapping("/update/jobpost/{id}")
	public ResponseEntity<?> updateJobPost(@RequestBody JobPostRequest req1 , @PathVariable("id") String id, HttpServletRequest req){
		try {
			System.out.println("AYAYAYAYYAYAAYYA");
			String email=getEmail(req.getHeader("Authorization"));
		
			JobPostResponse job=this.recruiterService.updateJobPost(req1, id, email);
			
			return new ResponseEntity<JobPostResponse>(job,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
		} 
	}
	@DeleteMapping("/delete/jobpost/{id}")
	public ResponseEntity<?> deleteJobPost( @PathVariable("id") String id, HttpServletRequest req){
		try {
			
			String email=getEmail(req.getHeader("Authorization"));
		
			this.recruiterService.deleteJobPost(email, id);
			
			return new ResponseEntity<String>("Deleted Successfully",HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage()+"",HttpStatus.BAD_REQUEST);
		} 
	}
	@GetMapping("/jobposts")
	public ResponseEntity<?> allJobPosts(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size,
	        HttpServletRequest req
	) {
	    try {
	    	System.out.println("EDHAR");
	        String email = getEmail(req.getHeader("Authorization"));

	        Page<JobPost> posts =
	                recruiterService.allJobPostsByRecruiter(email, page, size);

	        return new ResponseEntity<>(posts, HttpStatus.OK);

	    } catch (Exception e) {
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}
	private String getEmail(String head) { 
		String token=head.substring(7);
		String email=this.jwtUtil.extractSubject(token);
		return email;
	}
}
