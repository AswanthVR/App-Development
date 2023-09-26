package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Product;
import com.app.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	ProductService productService;
		
	@GetMapping("/api/product/getproducts")
	public List<Product> getProducts(){
		return productService.getAllProducts();
	}
	
	@PostMapping("/api/product/addProduct")
	public void addProduct(@RequestBody Product product) {
		productService.addProduct(product);
	}
	
	@GetMapping("/api/product/getproduct/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id){
		Product product = productService.getProductById(id);
		return ResponseEntity.ok(product);
		
		
	}
	@DeleteMapping("/api/product/delete/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProductById(id);
	}
	
	
	
}
