package com.app.controller;

import com.app.entity.Cart;
import com.app.entity.WishList;
import com.app.service.CartService;
import com.app.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/wishlist")
public class WishListController {

@Autowired
private WishListService wishListSrvice;

    @GetMapping
    public List<WishList> getAllCarts() {
        return wishListSrvice.getAllWishlist();
    }

    @GetMapping("/{id}")
    public WishList getWishListById(@PathVariable Long id) {
        return wishListSrvice.getWishListById(id);
    }

    @PostMapping
    public Boolean addwishList(@RequestBody WishList wishList) {
        return wishListSrvice.addWishList(wishList);
    }

    @DeleteMapping("/{id}")
    public void deleteWishList(@PathVariable Long id) {
        wishListSrvice.deleteWishList(id);
    }
    @GetMapping("/user/{userId}")
    public List<WishList> getAllCartsByUserId(@PathVariable Long userId) {
        return wishListSrvice.getAllByUserId(userId);
    }


}
