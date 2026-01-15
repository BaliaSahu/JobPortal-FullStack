package com.job.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<Map<String,String>> dataNotFound(DataNotFoundException e){
		
		Map<String,String> error=new HashMap<>();
		error.put("message",e.getMessage());
		return new ResponseEntity<Map<String,String>>(error,HttpStatus.BAD_REQUEST);
		
	}
	@ExceptionHandler(InternalServerException.class)
	public ResponseEntity<Map<String,String>> exception(InternalServerException e){
		
		Map<String,String> error=new HashMap<>();
		error.put("message",e.getMessage());
		return new ResponseEntity<Map<String,String>>(error,HttpStatus.BAD_REQUEST);
		
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Map<String,String>> exception(Exception e){
		
		Map<String,String> error=new HashMap<>();
		error.put("message",e.getMessage());
		System.out.println(e.getMessage()+"jdvirnvu9v9uvr");
		return new ResponseEntity<Map<String,String>>(error,HttpStatus.BAD_REQUEST);
		
	}
}
