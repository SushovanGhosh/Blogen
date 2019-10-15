package com.sushovan.blogenservice.models;

import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;



public class BlogPostEntity {
	
	private int id;
	
	private String title;
	
	private String category;
		
	private String body;
	
//	@JsonDeserialize(as=CommonsMultipartFile.class)
	private CommonsMultipartFile image;
	
	private String username;
	
	private String createdDate;
	
	private String updatedDate;
	
	public BlogPostEntity() {
		
	}
	
	public BlogPostEntity(String title, String category, String body, CommonsMultipartFile image, String username, String createdDate,
			String updatedDate) {
		
		this.title = title;
		this.category = category;
		this.body = body;
		this.image = image;
		this.username = username;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public CommonsMultipartFile getImage() {
		return image;
	}


	public void setImage(CommonsMultipartFile image) {
		this.image = image;
	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	@Override
	public String toString() {
		return "BlogPost [id=" + id + ", title=" + title + ", category=" + category + ", image="
				 + ", body=" + body + ", username=" + username + ", createdDate=" + createdDate
				+ ", updateDate=" + updatedDate + "]";
	}
	
}
