package com.sushovan.blogenservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sushovan.blogenservice.models.BlogCategory;

@Repository
public interface BlogCategoryDAO extends JpaRepository<BlogCategory, Integer> {

}
