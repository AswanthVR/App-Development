package com.app.controller;

import com.app.entity.Cart;
import com.app.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }

    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable Long id) {
        return cartService.getCartById(id);
    }

    @PostMapping
    public Cart addCart(@RequestBody Cart cart) {
        return cartService.addCart(cart);
    }

    @PutMapping("/{id}")
    public Cart updateCart(@PathVariable Long id, @RequestBody Cart cart) {
        return cartService.updateCart(id, cart);
    }

    @DeleteMapping("/{id}")
    public void deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getAllCartsByUserId(@PathVariable Long userId) {
        return cartService.getAllCartsByUserId(userId);
    }

    @PutMapping("/increase/{id}")
    public Cart increaseQuantity(@PathVariable Long id) {
        return cartService.increaseQuantity(id);
    }

    @PutMapping("/decrease/{id}")
    public Cart decreaseQuantity(@PathVariable Long id) {
        return cartService.decreaseQuantity(id);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteAllItemsByUserId(@PathVariable Long userId) {
        cartService.deleteAllItemsByUserId(userId);
    }

}
