package com.app.service;

import com.app.entity.SubCategory;
import com.app.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService {
    @Autowired
    private SubCategoryRepository subcategoryRepository;


    public List<SubCategory> getAllCategories() {
        return subcategoryRepository.findAll();
    }


    public SubCategory getCategoryById(Long id) {
        return subcategoryRepository.findById(id).orElse(null);
    }

    public void saveCategory(SubCategory subcategory) {
        subcategoryRepository.save(subcategory);
    }


    public void deleteCategoryById(Long id) {
        subcategoryRepository.deleteById(id);
    }
}
