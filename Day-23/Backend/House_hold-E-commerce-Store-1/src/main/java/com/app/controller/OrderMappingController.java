package com.app.controller;

import com.app.entity.OrderMapping;
import com.app.service.OrderMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orderMapping")
public class OrderMappingController {

    @Autowired
    private OrderMappingService orderMappingService;

    @GetMapping("/getAll")
    public ResponseEntity<List<OrderMapping>> getAllOrderMappings() {
        List<OrderMapping> orderMappings = orderMappingService.getAllOrderMappings();
        return ResponseEntity.ok(orderMappings);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrderMapping> getOrderMappingById(@PathVariable Long id) {
        try {
            OrderMapping orderMapping = orderMappingService.getOrderMappingById(id);
            return ResponseEntity.ok(orderMapping);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
