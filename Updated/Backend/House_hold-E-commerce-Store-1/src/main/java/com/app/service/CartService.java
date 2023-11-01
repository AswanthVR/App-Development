package com.app.service;

import com.app.entity.Cart;
import com.app.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Cart getCartById(Long id) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        return optionalCart.orElse(null);
    }

    public Cart addCart(Cart cart) {
        // Check if the same product is already in the cart for the same user
        List<Cart> existingCarts = cartRepository.findAllByUserAndProduct(cart.getUser(), cart.getProduct());

        if (!existingCarts.isEmpty()) {
            // If the product is already in the cart, increase the quantity
            Cart existingCart = existingCarts.get(0);
            existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
            return cartRepository.save(existingCart);
        } else {
            // If not, add a new cart entry
            return cartRepository.save(cart);
        }
    }


    public Cart updateCart(Long id, Cart updatedCart) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isPresent()) {
            Cart existingCart = optionalCart.get();
            existingCart.setCreatedDate(updatedCart.getCreatedDate());
            existingCart.setProduct(updatedCart.getProduct());
            existingCart.setUser(updatedCart.getUser());
            existingCart.setQuantity(updatedCart.getQuantity());
            return cartRepository.save(existingCart);
        }
        return null;
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    public List<Cart> getAllCartsByUserId(Long userId) {
        return cartRepository.findAllByUserId(userId);
    }

    public Cart increaseQuantity(Long id) {
        Optional<Cart> optionalCart = cartRepository.findById(id);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(cart.getQuantity() + 1);
            return cartRepository.save(cart);
        }

        return null;
    }

    public Cart decreaseQuantity(Long id) {
        Optional<Cart> optionalCart = cartRepository.findById(id);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            int newQuantity = cart.getQuantity() - 1;
            if (newQuantity > 0) {
                cart.setQuantity(newQuantity);
                return cartRepository.save(cart);
            } else {
                cartRepository.delete(cart);
                return null;
            }
        }

        return null; // Handle not found scenario
    }

    public void deleteAllItemsByUserId(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

}
