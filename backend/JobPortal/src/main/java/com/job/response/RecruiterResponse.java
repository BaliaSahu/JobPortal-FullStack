package com.job.response;

import java.util.List;

import com.job.entity.JobPost;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecruiterResponse {
	private String id;
	private String fullName;
	private String email;
	private String mobile;
	private String address;
	private String imgUrl;
	private String imgPublicId;
	private String company;
	private Double experienceYears;
	private List<JobPost> jobPosts;
}
