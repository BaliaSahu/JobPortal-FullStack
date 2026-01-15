package com.job.request;

import org.hibernate.validator.constraints.Length;

import com.job.response.RecruiterResponse;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RecruiterRegisterRequest {
	@NotBlank(message="Name Cannot be blank")
	@Size(min=2, max=50,message="Name must be between 2 and 50")
	private String fullName;
	@NotBlank(message="Email Cannot be blank")
	@Email(message="Email format is not correct")
	private String email;
	@NotBlank(message="Mobile Number cannot be blank")
	private Long mobile;
	@NotBlank(message="Address Cannot be blank")
	@Size(min=5,max=150 ,message="Address must be between 5 to 150 characters")
	private String address;
	@NotBlank(message="Password cannot be empty")
	@Size(min=4,max=30,message="Password must be between 4 and 30 charcters")
	private String password;
	@NotNull(message="Experience Years is required")
	private Double experienceYears;
	@NotBlank(message="Company Cannot be blank")
	@Size(min=2,max=150 ,message="Company must be between 5 to 150 characters")
	private String company;
}
