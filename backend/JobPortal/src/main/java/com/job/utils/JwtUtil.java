package com.job.utils;

import java.util.Date;
import java.util.HashMap;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtUtil {
	
	private String secretKey="bubdfbvuiu43708430909hfbi3b898901=okomNOIph9howehuybvwdebiujkfdvhebv8yrevf";
	
	public String generateJwtToken(String email) {
		
		HashMap<String,Object> claims=new HashMap<>();
		String t= generateToken(claims,email);
		return t;
		 
	}
	public String generateToken(HashMap<String,Object> claims,String email) {
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(email)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
				.signWith(SignatureAlgorithm.HS256,secretKey)
				.compact();
	}
	
	public String extractSubject(String token) {
		return Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
	
	public boolean validateToken(String token,UserDetails userDetails) {
		String email=extractSubject(token);
		return (!checkExpired(token) && email.equals(userDetails.getUsername()) );
	}
	private boolean checkExpired(String token) {
		return Jwts.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody()
				.getExpiration().before(new Date());
	}
}
