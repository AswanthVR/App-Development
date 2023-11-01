package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    Product findByProductId(Long pid);

    void deleteByProductId(Long pid);


}
