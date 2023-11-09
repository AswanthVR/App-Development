package com.app.repository;


import com.app.entity.OrderMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderMappingRepository extends JpaRepository<OrderMapping, Long> {
    List<OrderMapping> findAll();

}