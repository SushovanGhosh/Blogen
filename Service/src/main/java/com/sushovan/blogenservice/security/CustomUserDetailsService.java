package com.sushovan.blogenservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sushovan.blogenservice.dao.UsersDAO;
import com.sushovan.blogenservice.models.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UsersDAO usersDao;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
		
		User user = usersDao.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail)
				.orElseThrow(() -> 
				new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail));
		return UserPrincipal.create(user);
	}
	
	@Transactional
	public UserDetails loadUserById(Long id) {
		User user = usersDao.findById(id).orElseThrow(
				()-> new UsernameNotFoundException("User not found with id: "+ id));
		return UserPrincipal.create(user);
	}

}










