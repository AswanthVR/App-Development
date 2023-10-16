package com.app.controller;

import com.app.entity.Product;
import com.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

	@Autowired
	ProductService productService;

	@GetMapping("/api/product/getProducts")
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}

	@PostMapping("/api/product/addProduct")
	public ResponseEntity<Product> addProduct(@RequestBody Product product) {
		return productService.addProduct(product);
	}


	@GetMapping("/api/product/getproduct/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id) {
		try {
			Product product = productService.getProductById(id);
			return ResponseEntity.ok(product);
		} catch (Exception e) {
			// Handle exception appropriately (e.g., log, return specific error message)
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/api/product/deleteProduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
		String message = productService.deleteProductById(id);
		return ResponseEntity.ok(message);
	}

	@PutMapping("/api/product/editProduct/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
		Product updatedProduct = productService.updateProduct(id, product);
		return ResponseEntity.ok(updatedProduct);
	}
}
