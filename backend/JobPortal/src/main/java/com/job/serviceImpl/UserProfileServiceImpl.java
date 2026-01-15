package com.job.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

@Service
public class UserProfileServiceImpl implements UserProfileService {
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CloudinaryService cloudinaryService;
	
	@Override
	public boolean resumeUpload(MultipartFile resume, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		Map map=this.cloudinaryService.uploadResume(resume);
		
		UserEntity userEn=userOp.get();
		
		userEn.setResume((String)map.get("secure_url"));
		userEn.setResumePublicId((String)map.get("public_id"));
		
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean profileUpload(MultipartFile profile, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		Map map=this.cloudinaryService.uploadImage(profile);
		UserEntity userEn=userOp.get();
		
		userEn.setImgUrl((String)map.get("secure_url"));
		userEn.setImgPublicId((String)map.get("public_id"));
		
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean basicInfoUpdate(BasicInfo req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		userEn.setFullName(req.getFullName());
		userEn.setMobile(req.getMobile());
		userEn.setProfileSummary(req.getProfileSummary());
		
		List<String> domains=req.getInterestedDomains().stream().map(e-> e.toUpperCase()).collect(Collectors.toList());
		List<String> skills=req.getSkills().stream().map(e-> e.toUpperCase()).collect(Collectors.toList());
		
		userEn.setSkills(skills);
		userEn.setInterestedDomains(domains);
		userEn.setLanguages(req.getLanguages());
		
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean educationUpdate(Education req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Education> edu=userEn.getEducation();
		
		
		if(edu==null) {
			edu=new ArrayList<>();
		}
		edu.add(req);
		userEn.setEducation(edu);
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean experienceUpdate(Experience req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Experience> ex=userEn.getExperience();
		if(ex==null) {
			ex=new ArrayList<>();
		}
		ex.add(req);
		userEn.setExperience(ex);
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean projectUpdate(Project req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Project> pr=userEn.getProjects();
		if(pr==null) {
			pr=new ArrayList<>();
		}
		pr.add(req);
		userEn.setProjects(pr);
		this.userRepo.save(userEn);
		return true;
	}

	@Override
	public boolean certificationUpdate(Certification req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		List<Certification> cert=userEn.getCertification();
		if(cert==null) {
			cert=new ArrayList<>();
		}
		cert.add(req);
		userEn.setCertification(cert);
		this.userRepo.save(userEn);
		return true;
	}
	
	
	
	

	@Override
	public boolean educationSectionDelete(Education req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Education> edu=userEn.getEducation();
		if(edu==null) {
			throw new DataNotFoundException("No Education Section Present");
		}
		boolean b=edu.removeIf(e -> 
			Double.compare(e.getCgpa(),req.getCgpa())==0 &&
			Objects.equals(e.getInstitution(), req.getInstitution()) &&
			Objects.equals(e.getDegree(), req.getDegree()) &&
			Objects.equals(e.getStartDate(), req.getStartDate()) &&
			Objects.equals(e.getEndDate(), req.getEndDate()) &&
			Objects.equals(e.isStudying(), req.isStudying())
				);
		userEn.setEducation(edu);
		this.userRepo.save(userEn);
		if(!b) {
			throw new DataNotFoundException("No Education Section Found");
		}
		return true;
	}

	@Override
	public boolean experienceSectionDelete(Experience req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		List<Experience> ex=userEn.getExperience();
		if(ex==null) {
			throw new DataNotFoundException("No Experience Section Present");
		}
		boolean b=ex.removeIf(e->
				Objects.equals(e.getCompanyName(), req.getCompanyName()) &&
				Objects.equals(e.getRole(), req.getRole()) &&
				Objects.equals(e.getStartDate(), req.getStartDate()) &&
				Objects.equals(e.getEndDate(), req.getEndDate()) &&
				Objects.equals(e.getDescription(), req.getDescription()) &&
				Objects.equals(e.isWorking(), req.isWorking())
		);
		userEn.setExperience(ex);
		this.userRepo.save(userEn);
		if(!b) {
			throw new DataNotFoundException("No Experience Section Found");
		}		
		return true;
	}

	@Override
	public boolean projectSectionDelete(Project req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Project> pr=userEn.getProjects();
		if(pr==null) {
			throw new DataNotFoundException("No Project Section Present");
		}
		boolean b=pr.removeIf(e->
		Objects.equals(e.getName(), req.getName()) &&
		Objects.equals(e.getDescription(), req.getDescription()) &&
		Objects.equals(e.getProjectLink(), req.getProjectLink()) 
				);
		userEn.setProjects(pr);
		this.userRepo.save(userEn);
		if(!b) {
			throw new DataNotFoundException("No Project Section Found");
		}		
		
		return true;
	}

	@Override
	public boolean certificationSectionDelete(Certification req, String email) {
		Optional<UserEntity> userOp=this.userRepo.findByEmail(email);
		if(userOp.isEmpty()) {
			throw new DataNotFoundException("User Not Found!");
		}
		UserEntity userEn=userOp.get();
		
		List<Certification> cert=userEn.getCertification();
		if(cert==null) {
			throw new DataNotFoundException("No Certification Section Present");
		}
		boolean b=cert.removeIf(e->
			Objects.equals(e.getTitle(), req.getTitle()) &&
			Objects.equals(e.getCertificationProvider(), req.getCertificationProvider()) &&
			Objects.equals(e.getCompletionId(), req.getCompletionId()) 
				);
		userEn.setCertification(cert);
		this.userRepo.save(userEn);
		if(!b) {
			throw new DataNotFoundException("No Certification Section Found");
		}		
		
		return true;
	}

}
