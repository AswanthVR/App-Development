package com.app.repository;

import com.app.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address , Long> {
    @Query("SELECT w FROM Address w WHERE w.user.uid = :userId")
    List<Address> findByUserId(Long userId);
}
