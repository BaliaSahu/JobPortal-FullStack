package com.job.entity;

import com.job.response.RecruiterResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Recruiter {
	private String fullName;
	private String email;
	private String mobile;
	private String address;
	private String password;
	private String imgUrl;
	private String imgPublicId;
	private Double experienceYears;
}
