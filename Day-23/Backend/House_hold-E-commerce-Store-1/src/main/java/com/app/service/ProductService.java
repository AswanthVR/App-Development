package com.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import com.app.entity.Product;
import com.app.repository.ProductRepository;

import org.springframework.web.client.RestTemplate;
@Service
public class ProductService {
	@Autowired
    ProductRepository productRepo;

	public  List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}

	public Product getProductById(Long id) {
		return productRepo.findById(id).orElse(null);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}



	public ResponseEntity<String> deleteProductById(Long id) {
		System.out.println("going to make rest call:::");

		Map<String, Long> uriVariables = new HashMap<>();
		uriVariables.put("id", id);

		ResponseEntity<String> responseEntity = restTemplate().exchange(
				"http://localhost:8081/api/product/deleteProduct/{id}",
				HttpMethod.DELETE,  // HTTP method is DELETE
				null,  // No request body for a DELETE request
				String.class,  // The expected response type is String
				uriVariables
		);

		return responseEntity;
	}



	public ResponseEntity<Product> addProduct(Product product) {

		ResponseEntity<Product> responseEntity = restTemplate().postForEntity(
				"http://localhost:8081/api/product/addProduct",
				product,
				Product.class
		);

		return responseEntity;
      	}



	public Product updateProduct(Long id, Product product) {
		String microserviceUrl = "http://localhost:8081/api/product/editProduct/" + id;

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Product> requestEntity = new HttpEntity<>(product, headers);

		ResponseEntity<Product> responseEntity = restTemplate().exchange(
				microserviceUrl,
				HttpMethod.PUT,
				requestEntity,
				Product.class
		);

		return responseEntity.getBody();
	}


	public List<Product> findProductsByCategoryId(Long categoryId) {
		return productRepo.findByCategoryId(categoryId);
	}
//	public List<Product> findProductsByCategoryId(Long categoryId) {
//		return productRepo.findByCategoryId(categoryId);
//	}
}



//	public String addProduct(Product product) {
//		productRepo.save(product);
//		return "Product Successfully added";
//	}

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