package com.job.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RecruiterUpdate {
	@Size(min=2, max=50,message="Name must be between 2 and 50")
	private String fullName;
	
	@Size(min=10,max=10)
	private String mobile;
	
	@Size(min=5,max=150 ,message="Address must be between 5 to 150 characters")
	private String address;
	
	
	private Double experienceYears;
	
	@Size(min=2,max=150 ,message="Company must be between 5 to 150 characters")
	private String company;
}
