package com.sushovan.blogenservice.models;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
	@JsonInclude(Include.NON_EMPTY)
	private byte[] imageFile;
	
	@JsonInclude(Include.NON_EMPTY)
	private String imageType;
	
	@JsonInclude(Include.NON_EMPTY)
	private String imageName;
	
	@Transient
	private MultipartFile image;
	
	@Lob
	private String body;
	
	private String username;
	
	private String createdDate;
	
	private String updatedDate;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="blogpost_id")
	private List<BlogComment> comments;
	
	public BlogPost() {
		
	}

	public BlogPost(String title, String category, byte[] imageFile, String imageType, String imageName, String body, String username, String createdDate,
			String updatedDate) {

		this.title = title;
		this.category = category;
		this.imageFile = imageFile;
		this.imageType = imageType;
		this.imageName = imageName;
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

	public byte[] getImageFile() {
		return imageFile;
	}

	public void setImageFile(byte[] imageFile) {
		this.imageFile = imageFile;
	}

	public String getImageType() {
		return imageType;
	}

	public void setImageType(String imageType) {
		this.imageType = imageType;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
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

	public List<BlogComment> getComments() {
		return comments;
	}

	public void setComments(List<BlogComment> comments) {
		this.comments = comments;
	}

	@Override
	public String toString() {
		return "BlogPost [id=" + id + ", title=" + title + ", category=" + category + ", image="
				 + ", body=" + body + ", username=" + username + ", createdDate=" + createdDate
				+ ", updateDate=" + updatedDate + "]";
	}
	
	
}
