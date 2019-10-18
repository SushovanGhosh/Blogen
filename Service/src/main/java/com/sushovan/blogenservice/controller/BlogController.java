package com.sushovan.blogenservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sushovan.blogenservice.dao.BlogDAO;
import com.sushovan.blogenservice.models.BlogPost;
import com.sushovan.blogenservice.payload.ApiResponse;

@CrossOrigin
@RestController
@RequestMapping("api/blogs")
public class BlogController {
	
	@Autowired
	private BlogDAO blogDao;

	@PostMapping(path="/saveBlog",consumes= {"multipart/form-data"})
	public ResponseEntity<?> postTheBlog(@ModelAttribute BlogPost blogPostEntity, 
			@RequestParam(value="image",required=false) MultipartFile file){

		if(blogPostEntity != null) {
			System.out.println(blogPostEntity.getBody());
		}
		
		try {
			if(null != file)
				blogPostEntity.setImageFile(file.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		blogDao.save(blogPostEntity);
		return new ResponseEntity(new ApiResponse(true, "posted successfully !!", null),HttpStatus.OK);
	}
}
