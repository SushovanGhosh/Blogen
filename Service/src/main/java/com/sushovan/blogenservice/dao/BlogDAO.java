package com.sushovan.blogenservice.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sushovan.blogenservice.models.BlogPost;

@Repository
public interface BlogDAO extends JpaRepository<BlogPost, Integer> {

	@Query("from BlogPost where category IN (select category from BlogPost where id = :id) and id != :id ORDER BY RAND()")
	public List<BlogPost> findRandomBlogsByCategory(@Param("id") int id);
	
	@Query("from BlogPost where category = :category")
	public List<BlogPost> findBlogsByCategory(@Param("category") String category );
}
