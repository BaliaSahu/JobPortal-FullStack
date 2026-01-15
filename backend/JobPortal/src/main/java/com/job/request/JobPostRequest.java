package com.job.request;

import java.util.List;

import com.job.entity.UserEntity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPostRequest {
	@NotBlank(message="Title is required")
	@Size(min=2,max=20,message="title must be between 2 and 20 characters")
	private String title;
	@NotBlank(message="Description is required")
	@Size(min=5,max=100,message="Description must be between 5 and 100 characters")
	private String description;
	@NotBlank(message="Skills is required")
	@Size(min=5, max=300,message="Skills must be between 5 and 300 characters")
	private String skills;
	@NotNull(message="Experience is required")
	private Double experience;
	@NotBlank(message="Location is required")
	private String location;
	@NotBlank(message="Company Name is required")
	private String companyName;
	@NotBlank(message="Status is Required")
	private String status;
	@NotBlank(message="Job Category is Required")
	private String category;
	@NotNull(message="Job Category is Required")
	private Double salPackage;
}
