package com.job.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.job.utils.JwtUtil;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException { 
		String d=request.getRequestURI();
		if(d.equals("/register/user")|| d.equals("/login") || d.equals("/register/hr") || d.equals("/login/hr")) {
			filterChain.doFilter(request, response);
			return;
		}
		String authHeader=request.getHeader("Authorization");
		String email="";
		String token="";
//		System.out.println("agaya ");
		try {
//			System.out.println("ASLA --2"+email);
			if(authHeader!=null && authHeader.startsWith("Bearer ") ) {
				token=authHeader.substring(7);
				email=jwtUtil.extractSubject(token);
//				System.out.println("ASLA "+email+" cycg");
			}
		System.out.println("ASLA --3"+email+" ccvcvcvc");
			if(email != null && SecurityContextHolder.getContext().getAuthentication()==null) {
				UserDetails userDetails=userDetailsService.loadUserByUsername(email);
			
				if(jwtUtil.validateToken(token,userDetails)) {
				
					UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
					SecurityContextHolder.getContext().setAuthentication(authToken);
//					System.out.print("Asla gala");
				}
			
			}
//			System.out.println("ASLA --4--filter"+email);
			filterChain.doFilter(request, response);
		}catch(Exception e) {
//			System.out.print(e.getMessage()+"\nfilter exception"); 
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write("""
					{
					"status":401,
					"message":"Session expired, Please login again."
					}
					""");
			
		}
	}

}
