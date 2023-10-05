package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Product;
import com.app.entity.Users;
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
	
	public String deleteProductById(Long id) {
		if(productRepo.findById(id).isEmpty())
			return "No product Found with the Id:"+id;
		else {
		productRepo.deleteById(id);
		return "Delete Successfull";
		}
		
	}

	public Product getProductById(Long id) {
		return productRepo.findById(id).orElse(null);
	}
	
	public Product updateProduct(Product product) {
		return productRepo.save(product);
	}
	
}
