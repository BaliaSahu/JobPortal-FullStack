package com.job.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPostResponse {
	private String id;
	private String title;
	private String description;
	private String skills;
	private Double experience;
	private String location;
	private String companyName;
	private String status;
	private String category;
	private Double salPackage;
	private String postedByEmail;
}
