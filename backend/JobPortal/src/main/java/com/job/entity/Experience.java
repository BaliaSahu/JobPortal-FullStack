package com.job.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
	private String companyName;
	private String role;
	private String startDate;
	private String endDate;
	private String description;
	private boolean working;
}
