package com.app.repository;

import com.app.entity.Cart;
import com.app.entity.Product;
import com.app.entity.User;
import com.app.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {

    @Query("SELECT w FROM WishList w WHERE w.user.uid = :userId")
    List<WishList> findAllByUserId(@Param("userId") Long userId);
    @Query("SELECT w FROM WishList w WHERE w.user = :user AND w.product = :product")
    List<WishList> findAllByUserAndProduct(@Param("user") User user, @Param("product") Product product);

}
