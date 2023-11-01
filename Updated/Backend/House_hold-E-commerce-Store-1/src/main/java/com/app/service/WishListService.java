package com.app.service;

import com.app.entity.Cart;
import com.app.entity.WishList;
import com.app.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishListService {

    @Autowired
    private WishListRepository wishListRepo;

    public List<WishList> getAllWishlist(){
        return wishListRepo.findAll();
    }

    public WishList getWishListById(Long Id){
        Optional<WishList> optinalWishList = wishListRepo.findById(Id);
        return  optinalWishList.orElse(null);

    }

    public Boolean addWishList(WishList wishList){

        List<WishList> existingWishLists = wishListRepo.findAllByUserAndProduct(wishList.getUser() , wishList.getProduct());

        if(!existingWishLists.isEmpty()){
          return true;
        }
        else{
             wishListRepo.save(wishList);
             return true;
        }
    }

    public void deleteWishList(Long id) {
        wishListRepo.deleteById(id);
    }

    public List<WishList> getAllByUserId(Long userId) {
        return wishListRepo.findAllByUserId(userId);
    }



}
