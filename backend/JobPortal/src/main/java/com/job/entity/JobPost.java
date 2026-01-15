package com.job.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.job.response.UserEntityResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection="jobPosts")
public class JobPost {
	@Id
	private String id;
	@Indexed
	private String postedByEmail;
	
	@TextIndexed
	private String title;
	@TextIndexed
	private String description;
	@TextIndexed
	private String skills;
	private Double experience;
	private String location;
	private String companyName;
	private String category;
	private Double salPackage;
	@Indexed
	private Set<String> appliedUserEmails;
	private String status;
	@Indexed
	private LocalDate postedDate=LocalDate.now();
	
} 


