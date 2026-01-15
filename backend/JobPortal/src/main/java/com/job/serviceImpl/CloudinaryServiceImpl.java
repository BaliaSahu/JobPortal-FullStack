package com.job.serviceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.job.exceptions.InternalServerException;
import com.job.service.CloudinaryService;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

	@Autowired
	private Cloudinary cloudinary;

	@Override
	public Map uploadImage(MultipartFile file) {
		try {
			Map in=this.cloudinary.uploader().upload(file.getBytes(),Map.of());
			return in;
		}catch(Exception e) {
			throw new InternalServerException(e.getMessage());
		}
	}

	@Override
	public String deleteImage(String public_id) {
		// TODO Auto-generated method stub
		try {
			Map m=this.cloudinary.uploader().destroy(public_id, ObjectUtils.emptyMap());
			String result=(String)m.get("result");
			return result;
		}catch(Exception e) {
			throw new InternalServerException(e.getMessage());
		}
	}

	@Override
	public Map uploadResume(MultipartFile file) {
		try {
	        Map uploadResult = cloudinary.uploader().upload(
	            file.getBytes(),
	            ObjectUtils.asMap(
	                "resource_type", "image",     // 🔴 VERY IMPORTANT
	                "folder", "resumes",
	                "use_filename", true,
	                "unique_filename", true,
	                "format", "pdf"
	            )
	        );
	        return uploadResult;
	    } catch (Exception e) {
	        throw new RuntimeException("Resume upload failed");
	    }
	}

	@Override
	public String deleteResume(String public_id) {
		try {
			Map m=this.cloudinary.uploader().destroy(public_id, ObjectUtils.emptyMap());
			String s =(String) m.get("result");
			return s;
		}catch(Exception e) {
			throw new InternalServerException(e.getMessage());
		}
	}
	
	
	
}
