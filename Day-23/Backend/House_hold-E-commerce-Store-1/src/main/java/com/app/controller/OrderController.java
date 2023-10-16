// OrderController.java
package com.app.controller;

import com.app.dto.CountResponse;
import com.app.dto.OrderRequest;
import com.app.dto.OrderResponse;
import com.app.entity.Order;
import com.app.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<Order> saveOrder(@RequestBody OrderRequest request) {
        Order order = orderService.saveOrder(request);
        return order != null ? ResponseEntity.ok(order)
                : ResponseEntity.badRequest().build();
    }


    @GetMapping("/get/{uid}")
    public ResponseEntity<List<OrderResponse>> getOrders(@PathVariable Long uid) {
        List<OrderResponse> orderList = orderService.getOrders(uid);
        return !orderList.isEmpty() ? ResponseEntity.ok().body(orderList) : ResponseEntity.notFound().build();
    }

    @GetMapping("/getCount")
    public ResponseEntity<CountResponse> orderCount() {
        CountResponse countResponse = orderService.orderCount();
        return countResponse.getCount() != 0 ? ResponseEntity.ok().body(countResponse)
                : ResponseEntity.noContent().build();
    }

    @GetMapping("/getById/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long orderId) {
        OrderResponse order = orderService.getOrderById(orderId);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }



    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        boolean deleted = orderService.deleteOrder(orderId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<Void> deleteAllOrders() {
        orderService.deleteAllOrders();
        return ResponseEntity.noContent().build();
    }
}