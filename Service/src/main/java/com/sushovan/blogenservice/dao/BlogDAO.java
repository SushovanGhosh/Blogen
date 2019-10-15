package com.sushovan.blogenservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sushovan.blogenservice.models.BlogPost;

@Repository
public interface BlogDAO extends JpaRepository<BlogPost, Integer> {

}
