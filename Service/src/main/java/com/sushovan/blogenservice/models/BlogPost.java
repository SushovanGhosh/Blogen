package com.sushovan.blogenservice.models;

import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="blog_posts")
public class BlogPost {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private int id;
	
	private String title;
	
	private String category;
	
	@Lob
	@JsonInclude(Include.NON_NULL)
	private String image;
	
	@Lob
	private String body;
	
	private String username;
	
	private String createdDate;
	
	private String updatedDate;
	
	public BlogPost() {
		
	}

	public BlogPost(String title, String category, String image, String body, String username, String createdDate,
			String updatedDate) {

		this.title = title;
		this.category = category;
		this.image = image;
		this.body = body;
		this.username = username;
		this.createdDate = createdDate;
		this.updatedDate = updatedDate;
	}
	
	

	public BlogPost(String title, String category, String body, String username, String createdDate,
			String updatedDate) {
		
		this.title = title;
		this.category = category;
		this.body = body;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
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
