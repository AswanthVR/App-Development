package com.app.service;

import com.app.entity.Product;
import com.app.entity.ReviewRating;
import com.app.entity.User;
import com.app.repository.ReviewRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewRatingService {

    @Autowired
    private ReviewRatingRepository reviewRatingRepository;

    public List<ReviewRating> getAllReviewRatings() {
        return reviewRatingRepository.findAll();
    }

    public ReviewRating getReviewRatingById(Long id) {
        return reviewRatingRepository.findById(id).orElse(null);
    }

    public void saveReviewRating(ReviewRating reviewRating) {
        reviewRatingRepository.save(reviewRating);
    }

    public void deleteReviewRating(Long id) {
        reviewRatingRepository.deleteById(id);
    }


    public class ReviewAlreadyExistsException extends RuntimeException {
        public ReviewAlreadyExistsException(String message) {
            super(message);
        }
    }

    // In your service class
    public void checkIfReviewExists(User user, Product product) {
        if (reviewRatingRepository.existsByUserAndProduct(user, product)) {
            throw new ReviewAlreadyExistsException("User has already reviewed this product.");
        }
    }
    public List<ReviewRating> getAllReviewsByProductId(Long productId) {
        return reviewRatingRepository.findAllByProductProductId(productId);
    }


}
