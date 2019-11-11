package com.sushovan.blogenservice.controller;


import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sushovan.blogenservice.dao.BlogCategoryDAO;
import com.sushovan.blogenservice.dao.BlogDAO;
import com.sushovan.blogenservice.exception.BadRequestException;
import com.sushovan.blogenservice.models.BlogCategory;
import com.sushovan.blogenservice.models.BlogComment;
import com.sushovan.blogenservice.models.BlogPost;
import com.sushovan.blogenservice.payload.ApiResponse;

@CrossOrigin
@RestController
@RequestMapping("api/blogs")
public class BlogController {
	
	@Autowired
	private BlogDAO blogDao;
	
	@Autowired BlogCategoryDAO blogCategoryDao;

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
	
	@GetMapping(value="/getCategories")
	public List<BlogCategory> fetchAllCategories(){
		
		List<BlogCategory> categories = blogCategoryDao.findAll();
		for(BlogCategory category: categories) {
			InputStream imageIcon = getClass().getResourceAsStream("/images/icons/"+category.getImageName());
			InputStream timelineImage = getClass().getResourceAsStream("/images/timelines/"+category.getTimelineImage());
			try {
				category.setImageByte(IOUtils.toByteArray(imageIcon));
				category.setTimelineImageByte(IOUtils.toByteArray(timelineImage));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return categories;
	}
	
	@GetMapping("/getBlog/{id}")
		public BlogPost fetchBlog(@PathVariable int id) {
			
			Optional<BlogPost> result = blogDao.findById(id);
			result.orElseThrow(
					()-> new BadRequestException("Blog with id - "+ id +"is not found"));
			return result.get();
		}
	
	@GetMapping("/getBlogsByCategory/{id}")
	public List<BlogPost> fetchRandomBlogsByCategory(@PathVariable String id){
		
		List<BlogPost> result = blogDao.findRandomBlogsByCategory(Integer.parseInt(id));
		return result;
	}
	
	@GetMapping("/getFilteredBlogsByCategory/{category}")
	public List<BlogPost> fetchBlogsFilteredByCategory(@PathVariable String category){
		
		List<BlogPost> result = blogDao.findBlogsByCategory(category);
		return result;
	}
	
	@GetMapping("/getCommentsByBlog/{id}")
	public List<BlogComment> fetchCommentsByBlog(@PathVariable int id){
		
		Optional<BlogPost> blog = blogDao.findById(id);
		blog.orElseThrow(()-> new BadRequestException("Blog with id - "+ id +"is not found"));
		List<BlogComment> comments = blog.get().getComments();
		return comments;
	}
}






