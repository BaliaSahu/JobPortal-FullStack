package com.job.entity;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {
	private String institution;
	private String degree;
	private String startDate;
	private String endDate;
	private double cgpa;
	private boolean studying;
}
