package com.app.controller;

import com.app.entity.Product;
import com.app.entity.ReviewRating;
import com.app.entity.User;
import com.app.service.ReviewRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review-ratings")
public class ReviewRatingController {

    @Autowired
    private ReviewRatingService reviewRatingService;

    @GetMapping
    public ResponseEntity<List<ReviewRating>> getAllReviewRatings() {
        List<ReviewRating> reviewRatings = reviewRatingService.getAllReviewRatings();
        return new ResponseEntity<>(reviewRatings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewRating> getReviewRatingById(@PathVariable Long id) {
        ReviewRating reviewRating = reviewRatingService.getReviewRatingById(id);
        if (reviewRating != null) {
            return new ResponseEntity<>(reviewRating, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public void saveReviewRating(@RequestBody ReviewRating reviewRating) {
        User user = reviewRating.getUser();
        Product product = reviewRating.getProduct();
        reviewRatingService.checkIfReviewExists(user, product);
        reviewRatingService.saveReviewRating(reviewRating);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReviewRating(@PathVariable Long id) {
        if (reviewRatingService.getReviewRatingById(id) != null) {
            reviewRatingService.deleteReviewRating(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewRating>> getReviewsByProductId(@PathVariable Long productId) {
        List<ReviewRating> reviews = reviewRatingService.getAllReviewsByProductId(productId);
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

}
