package com.sushovan.blogenservice.controller;

import java.net.URI;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sushovan.blogenservice.dao.UsersDAO;
import com.sushovan.blogenservice.models.User;
import com.sushovan.blogenservice.payload.ApiResponse;
import com.sushovan.blogenservice.payload.JwtAuthenticationResponse;
import com.sushovan.blogenservice.payload.LoginRequest;
import com.sushovan.blogenservice.payload.SignUpRequest;
import com.sushovan.blogenservice.security.JwtTokenProvider;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UsersDAO usersDao;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String username = null; 
		
		User user = usersDao.findByUsernameOrEmail(loginRequest.getUsernameOrEmail(), 
				loginRequest.getUsernameOrEmail()).orElse(null);
		
		username = user.getUsername();
		
		String jwt = jwtTokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,username));
	}

	@PostMapping("/signup")
	    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
	        if(usersDao.existsByUsername(signUpRequest.getUsername())) {
	            return new ResponseEntity(new ApiResponse(false, "Username is already taken!","username"),
	                    HttpStatus.BAD_REQUEST);
	        }

	        if(usersDao.existsByEmail(signUpRequest.getEmail())) {
	            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!","email"),
	                    HttpStatus.BAD_REQUEST);
	        }

	        // Creating user's account
	        
	        
	        
	        User user = new User(signUpRequest.getUsername(),
	                signUpRequest.getEmail(), signUpRequest.getPassword());

	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        
	        User result = usersDao.save(user);
	        
	        Authentication authentication = authenticationManager.authenticate(
	        		new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));
	        
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        URI location = ServletUriComponentsBuilder
	        		.fromCurrentContextPath().path("/api/users/{username}")
	        		.buildAndExpand(result.getUsername()).toUri();
	        
	        String jwt = jwtTokenProvider.generateToken(authentication);
//	        return ResponseEntity.created(location).body(new ApiResponse(true,jwt,null));
	        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,signUpRequest.getUsername()));
	}
}













