package com.app.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.entity.Product;
import com.app.entity.User;
import com.app.repository.productRepository;

import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
@Service
public class ProductService {
	@Autowired 
	productRepository productRepo;
	
	public  List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}
	
	public String addProduct(Product product) {
		productRepo.save(product);
		return "Product Successfully added";
	}
	
//	public String deleteProductById(Long id) {
//		if(productRepo.findById(id).isEmpty())
//			return "No product Found with the Id:"+id;
//		else {
//		productRepo.deleteById(id);
//		return "Delete Successfull";
//		}
//
//	}

	//mc
	public ResponseEntity<Product> deleteProductById(Long id) {
		System.out.println("going to make rest call:::");

		HashMap<String, Long> uriVariables = new HashMap<>();
		uriVariables.put("id", id);
		ResponseEntity<Product> responseEntity =  restTemplate().exchange("http://localhost:8081/api/product/deleteProduct/{id}", HttpMethod.DELETE, null, Product.class, uriVariables);

		//ResponseEntity<Product> responseEntity = new RestTemplate().delete("http://localhost:8081/api/deleteproduct/{id}", uriVariables);

		return responseEntity;
	}

 


	public Product getProductById(Long id) {
		return productRepo.findById(id).orElse(null);
	}
	
	public Product updateProduct(Product product) {
		return productRepo.save(product);
	}


	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
	
}
