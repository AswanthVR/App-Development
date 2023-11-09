package com.app.repository;

import com.app.entity.Product;
import com.app.entity.ReviewRating;
import com.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRatingRepository extends JpaRepository<ReviewRating, Long> {
    boolean existsByUserAndProduct(User user, Product product);
    List<ReviewRating> findAllByProductProductId(Long productId);
}
