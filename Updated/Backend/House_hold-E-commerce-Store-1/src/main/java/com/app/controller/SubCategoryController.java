package com.app.controller;

import com.app.entity.SubCategory;
import com.app.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/subcategory")
public class SubCategoryController {

    @Autowired
    private SubCategoryService categoryService;

    @GetMapping("/getAll")
    public ResponseEntity<List<SubCategory>> getAllCategories() {
        List<SubCategory> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SubCategory> getCategoryById(@PathVariable Long id) {
        try {
            SubCategory category = categoryService.getCategoryById(id);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Void> saveCategory(@RequestBody SubCategory category) {
        categoryService.saveCategory(category);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategoryById(@PathVariable Long id) {
        try {
            categoryService.deleteCategoryById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/getByCategoryId/{categoryId}")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByCategoryId(@PathVariable Long categoryId) {
        try {
            List<SubCategory> subCategories = categoryService.getSubCategoriesByCategoryId(categoryId);
            return ResponseEntity.ok(subCategories);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
