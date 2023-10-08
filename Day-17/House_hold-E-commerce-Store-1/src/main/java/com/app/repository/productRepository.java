package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface productRepository extends JpaRepository<Product, Long> {


}
