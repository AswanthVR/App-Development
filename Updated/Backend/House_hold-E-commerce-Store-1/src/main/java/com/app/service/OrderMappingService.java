package com.app.service;

import com.app.entity.OrderMapping;
import com.app.repository.OrderMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderMappingService {


    @Autowired
    private OrderMappingRepository orderMappingRepository;


    public List<OrderMapping> getAllOrderMappings() {
        return orderMappingRepository.findAll();
    }


    public OrderMapping getOrderMappingById(Long id) {
        Optional<OrderMapping> optionalOrderMapping = orderMappingRepository.findById(id);
        return optionalOrderMapping.orElse(null);
    }
}
