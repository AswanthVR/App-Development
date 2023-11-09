package com.app.repository;
import com.app.entity.Cart;
import com.app.entity.Product;
import com.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT c FROM Cart c WHERE c.user.uid = :userId")
    List<Cart> findAllByUserId(@Param("userId") Long userId);
    @Query("SELECT c FROM Cart c WHERE c.user = :user AND c.product = :product")
    List<Cart> findAllByUserAndProduct(@Param("user") User user, @Param("product") Product product);

    @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}
