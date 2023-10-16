package com.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.entity.Product;
import com.app.repository.productRepository;

import org.springframework.web.client.RestTemplate;
@Service
public class ProductService {
	@Autowired 
	productRepository productRepo;

	public  List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}
	


	public Product getProductById(Long id) {
		return productRepo.findById(id).orElse(null);
	}
	
//	public Product updateProduct(Product product) {
//		return productRepo.save(product);
//	}
//

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

	private final String PRODUCT_SERVICE_URL = "http://localhost:8081/api/product/editProduct  ";

	public ResponseEntity<Product> updateProduct(Product updatedProduct) {
		String url = PRODUCT_SERVICE_URL + "/" + updatedProduct.getProductId();

		ResponseEntity<Product> responseEntity = restTemplate().exchange(
				url,
				HttpMethod.PUT,
				new HttpEntity<>(updatedProduct),
				Product.class
		);

		return responseEntity;
	}

//	public ResponseEntity<Product> updateProduct(Product updatedProduct) {
//		String url = PRODUCT_SERVICE_URL + "/" + updatedProduct.getId();
//
//		ResponseEntity<Product> responseEntity = restTemplate.exchange(
//				url,
//				HttpMethod.PUT,
//				new HttpEntity<>(updatedProduct),
//				Product.class
//		);
//
//		return responseEntity;
//	}

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


}
