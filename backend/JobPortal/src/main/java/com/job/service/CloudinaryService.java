package com.job.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

	public Map  uploadImage(MultipartFile file);
	
	public String deleteImage(String public_id);
	
	public Map uploadResume(MultipartFile file);
	
	public String deleteResume(String public_id);
}
