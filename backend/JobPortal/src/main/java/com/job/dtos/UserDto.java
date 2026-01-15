package com.job.dtos;

import java.time.LocalDate;
import java.util.List;

import com.job.entity.Certification;
import com.job.entity.Education;
import com.job.entity.Experience;
import com.job.entity.Project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
	private String id;
	private String fullName;
	private String email;
	private String mobile;
	private String address;
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
}
