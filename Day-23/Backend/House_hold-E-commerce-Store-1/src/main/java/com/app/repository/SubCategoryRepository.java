package com.app.repository;



import com.app.entity.Category;
import com.app.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository  extends JpaRepository<SubCategory, Long>{

    @Query("SELECT s FROM SubCategory s WHERE s.category.id = :categoryId")
    List<SubCategory> findByCategoryId(@Param("categoryId") Long categoryId);
}
