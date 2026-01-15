package com.job.entity;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="users")
public class UserEntity {
	
	@Id
	private String id;
	
	private String role;
	private List<JobPost> jobPosts;
	private Double experienceYears;
	
	private List<JobPost> jobApplied;
	
	private String fullName;
	@Indexed(unique=true)
	private String email;
	private String mobile;
	private String address;
	private String password;
	private String resume;
	private String resumePublicId;
	private String imgUrl;
	private String imgPublicId;
	private List<String> skills;
	private List<String> interestedDomains;
	private String profileSummary; 
	private List<Education> education;
	private List<Experience> experience;
	private List<Certification> certification;
	private List<Project> projects;
	private LocalDate dob;
	private List<String> languages;
	private String company;
}
