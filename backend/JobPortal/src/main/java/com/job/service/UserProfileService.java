package com.job.service;

import org.springframework.web.multipart.MultipartFile;

import com.job.entity.Certification;
import com.job.entity.Education;
import com.job.entity.Experience;
import com.job.entity.Project;
import com.job.request.BasicInfo;

public interface UserProfileService {
	public boolean resumeUpload(MultipartFile resume,String email);
	public boolean profileUpload(MultipartFile profile,String email);
	public boolean basicInfoUpdate(BasicInfo req,String email); 
	public boolean educationUpdate(Education req,String email);
	public boolean experienceUpdate(Experience req,String email);
	public boolean projectUpdate(Project req,String email);
	public boolean certificationUpdate(Certification req,String email);
	
	public boolean educationSectionDelete(Education req,String email);
	public boolean experienceSectionDelete(Experience req,String email);
	public boolean projectSectionDelete(Project req, String email);
	public boolean certificationSectionDelete(Certification req,String email);
}
