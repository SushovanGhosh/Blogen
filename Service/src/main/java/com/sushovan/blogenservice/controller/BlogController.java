package com.sushovan.blogenservice.controller;


import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

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
	public BlogPost postTheBlog(@ModelAttribute BlogPost blogPostEntity, 
			@RequestParam(value="image",required=false) MultipartFile file){

		if(blogPostEntity != null) {
			System.out.println(blogPostEntity.getBody());
		}
		
		try {
			if(null != file) {
				
				blogPostEntity.setImageFile(file.getBytes());
				blogPostEntity.setImageType(file.getContentType());
				blogPostEntity.setImageName(file.getOriginalFilename());
			}
				
				
		} catch (Exception e) {
			e.printStackTrace();
		}
		blogDao.save(blogPostEntity);
//		BufferedImage buffImage;
//		try {
//			buffImage = ImageIO.read(new ByteArrayInputStream(blogPostEntity.getImageFile()));
//			ImageIO.write(buffImage, blogPostEntity.getImageType(), new File(blogPostEntity.getId()+"."+blogPostEntity.getImageType()));
//		}catch (Exception e) {
//			e.printStackTrace();
//		}
		return blogPostEntity;
	}
	
	@GetMapping("/getBlogs")
	public List<BlogPost> fetchAllBlogs(){
		List<BlogPost> myBlogs = blogDao.findAll(Sort.by(Sort.Direction.DESC,"id"));
//		for( BlogPost blog: myBlogs) {
//			if(blog.getImageFile() != null) {
//				System.out.println("Hi");
//				byte[] encoded = Base64.getEncoder().encode(blog.getImageFile());
//				System.out.println(new String(encoded));	
////				blog.setImageBase64(new String(encoded));
//			}
//		}
		return myBlogs;
	}
}
