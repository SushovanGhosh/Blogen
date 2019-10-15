package com.sushovan.blogenservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.sushovan.blogenservice.dao.BlogDAO;
import com.sushovan.blogenservice.models.BlogPost;

@Service
public class ImageFileStorageService {

	@Autowired
	private BlogDAO blogDao;
	
	public BlogPost storeImage(MultipartFile file) {
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		return null;
	}
}
