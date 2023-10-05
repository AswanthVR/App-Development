package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Product;
import com.app.entity.Users;
import com.app.service.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	
	@Autowired
	ProductService productService;
		
	@GetMapping("/api/product/getProducts")
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
	@DeleteMapping("/api/product/deleteProduct/{id}")
	public String deleteProduct(@PathVariable Long id) {
		return productService.deleteProductById(id);
	}
	
	@PutMapping("/api/product/editProduct/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id , @RequestBody Product product){
		product.setProductId(id);
		Product updatedProduct = productService.updateProduct(product);
		return ResponseEntity.ok(updatedProduct);
	}
	
	
	
}
