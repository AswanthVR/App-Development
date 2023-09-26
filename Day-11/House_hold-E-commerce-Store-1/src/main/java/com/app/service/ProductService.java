package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Product;
import com.app.repository.productRepository;

@Service
public class ProductService {
	@Autowired 
	productRepository productRepo;
	
	public  List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}
	
	public void addProduct(Product product) {
		productRepo.save(product);
	}
	
	public void deleteProductById(Long id) {
		productRepo.deleteById(id);
	}

	public Product getProductById(Long id) {
		return productRepo.findById(id).orElse(null);
	}
	
}
