package com.job.controller;

import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.job.dtos.UserDto;
import com.job.entity.Certification;
import com.job.entity.Education;
import com.job.entity.Experience;
import com.job.entity.Project;
import com.job.entity.UserEntity;
import com.job.exceptions.DataNotFoundException;
import com.job.repositories.UserRepo;
import com.job.request.BasicInfo;
import com.job.service.CloudinaryService;
import com.job.service.UserProfileService;
import com.job.service.UserService;
import com.job.utils.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins={"https://jobcrackk.netlify.app" ,"https://jobcrackr.netlify.app"})
public class UserUpdateController {
	
	@Autowired
	private UserProfileService userProfileService;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@PutMapping("/update/profile")
    public ResponseEntity<?> updateProfile(@RequestPart("image") MultipartFile img, HttpServletRequest req){
	
    	try {
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.profileUpload(img, email);
    		if(!b)
    			throw new DataNotFoundException("Profile Image Not Uploaded");
    		return new ResponseEntity<String>("Profile Image Upload Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/resume")
    public ResponseEntity<?> updateResume(@RequestPart("resume") MultipartFile resume, HttpServletRequest req){
		
    	try {
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.resumeUpload(resume, email);
    		if(!b)
    			throw new DataNotFoundException("Resume Not Uploaded");
    		return new ResponseEntity<String>("Resume Upload Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/basicinfo")
    public ResponseEntity<?> updateBasicInfo(@RequestBody BasicInfo info, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.basicInfoUpdate(info, email);
    		if(!b)
    			throw new DataNotFoundException("Basic Information Not Uploaded");
    		return new ResponseEntity<String>("Basic Information Updated Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/education")
    public ResponseEntity<?> updateEducation(@RequestBody Education edu, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.educationUpdate(edu, email);
    		if(!b)
    			throw new DataNotFoundException("Education Information Not Uploaded");
    		return new ResponseEntity<String>("Education Information Updated Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@DeleteMapping("/delete/education")
    public ResponseEntity<?> deleteEducation(@RequestBody Education edu, HttpServletRequest req){
    	try {
    		System.out.println("ASALA");
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.educationSectionDelete(edu, email);
    		if(!b)
    			throw new DataNotFoundException("Education Information Not Deleted");
    		return new ResponseEntity<String>("Education Information deleted Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/experience")
    public ResponseEntity<?> updateExperience(@RequestBody Experience ex, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.experienceUpdate(ex, email);
    		if(!b)
    			throw new DataNotFoundException("Experience Information Not Uploaded");
    		return new ResponseEntity<String>("Experience Information Updated Successfully.",HttpStatus.OK);
    		 
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@DeleteMapping("/delete/experience")
    public ResponseEntity<?> deleteExperience(@RequestBody Experience ex, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.experienceSectionDelete(ex, email);
    		if(!b)
    			throw new DataNotFoundException("Experience Information Not Deleted");
    		return new ResponseEntity<String>("Experience Information Deleted Successfully.",HttpStatus.OK);
    		 
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/project")
    public ResponseEntity<?> updateProject(@RequestBody Project pr, HttpServletRequest req){
    	try {
    		System.out.println(pr);
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.projectUpdate(pr, email);
    		if(!b)
    			throw new DataNotFoundException("Project Information Not Uploaded");
    		return new ResponseEntity<String>("Project Information Updated Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@DeleteMapping("/delete/project")
    public ResponseEntity<?> deleteProject(@RequestBody Project pr, HttpServletRequest req){
    	try {
    		System.out.println(pr);
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.projectSectionDelete(pr, email);
    		if(!b)
    			throw new DataNotFoundException("Project Information Not Deleted");
    		return new ResponseEntity<String>("Project Information Deleted Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@PutMapping("/update/certification")
    public ResponseEntity<?> updateCertification(@RequestBody Certification cr, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.certificationUpdate(cr, email);
    		if(!b)
    			throw new DataNotFoundException("Certification Information Not Uploaded");
    		return new ResponseEntity<String>("Certification Information Updated Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	@DeleteMapping("/delete/certification")
    public ResponseEntity<?> deleteCertification(@RequestBody Certification cr, HttpServletRequest req){
    	try {
    		
    		String email=getEmail(req.getHeader("Authorization"));
    		Optional<UserEntity> us=this.userRepo.findByEmail(email);
    		if(!us.isPresent()) {
    			return new ResponseEntity<String>("No User Present",HttpStatus.BAD_REQUEST);
    		}
    		if(us.isEmpty() || us.get().getRole().equalsIgnoreCase("recruiter")) {
				throw new Exception("Recruiter can not do this operation.");
			}
    		
    		boolean b=this.userProfileService.certificationSectionDelete(cr, email);
    		if(!b)
    			throw new DataNotFoundException("Certification Information Not Deleted");
    		return new ResponseEntity<String>("Certification Information Deleted Successfully.",HttpStatus.OK);
    		
    	}catch(Exception e) {
    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
    	}
    	
    }
	private String getEmail(String head) { 
		String token=head.substring(7);
		String email=this.jwtUtil.extractSubject(token);
		return email;
	}
	
}
