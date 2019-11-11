package com.sushovan.blogenservice.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="blog_categories")
public class BlogCategory {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="category")
	private String category;
	
	@Column(name="image_name")
	private String imageName;
	
	@Transient
	private byte[] imageByte;
	
	@Column(name="timeline_image")
	private String timelineImage;
	
	@Transient
	private byte[] timelineImageByte;
	
	public BlogCategory() {
		
	}

	public BlogCategory(String category, String imageName, String timelineImage) {
		this.category = category;
		this.imageName = imageName;
		this.timelineImage = timelineImage;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public byte[] getImageByte() {
		return imageByte;
	}

	public void setImageByte(byte[] imageByte) {
		this.imageByte = imageByte;
	}

	public String getTimelineImage() {
		return timelineImage;
	}

	public void setTimelineImage(String timelineImage) {
		this.timelineImage = timelineImage;
	}

	public byte[] getTimelineImageByte() {
		return timelineImageByte;
	}

	public void setTimelineImageByte(byte[] timelineImageByte) {
		this.timelineImageByte = timelineImageByte;
	}
		
}
