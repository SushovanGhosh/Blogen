package com.sushovan.blogenservice.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sushovan.blogenservice.dao.BlogDAO;
import com.sushovan.blogenservice.models.BlogPost;
import com.sushovan.blogenservice.models.BlogPostEntity;
import com.sushovan.blogenservice.payload.ApiResponse;

@CrossOrigin
@RestController
@RequestMapping("api/blogs")
public class BlogController {
	
	@Autowired
	private BlogDAO blogDao;

	@PostMapping("/saveBlog")
	public ResponseEntity<?> postTheBlog(@RequestBody BlogPostEntity blogPostEntity){
		
		BlogPost blogPost = null;
		try {
			System.out.println("Hi");
			if(blogPostEntity.getImage() !=null && !blogPostEntity.getImage().isEmpty()) {
				blogPost = new BlogPost(blogPostEntity.getTitle(), blogPostEntity.getCategory(),
						blogPostEntity.getImage().getOriginalFilename(), blogPostEntity.getBody(),
						blogPostEntity.getUsername(), blogPostEntity.getCreatedDate(), 
						blogPostEntity.getUpdatedDate());
			}
			else {
				blogPost = new BlogPost(blogPostEntity.getTitle(), blogPostEntity.getCategory(),
						 blogPostEntity.getBody(),blogPostEntity.getUsername(), 
						 blogPostEntity.getCreatedDate(), 
						 blogPostEntity.getUpdatedDate());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		//System.out.println(blogPost.);
		blogDao.save(blogPost);
		return new ResponseEntity(new ApiResponse(true, "posted successfully !!", null),HttpStatus.OK);
	}
}
