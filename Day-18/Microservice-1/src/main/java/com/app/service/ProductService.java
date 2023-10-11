package com.app.service;

import com.app.entity.Product;
import com.app.repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
	@Autowired 
	productRepository productRepo;
	
	public  List<Product> getAllProducts()
	{
		return productRepo.findAll();
	}

	public ResponseEntity<Product> addProduct(Product product) {
		try {
			Product savedProduct = productRepo.save(product);
			return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
		} catch (Exception e) {
			// Handle the exception (e.g., log it, perform a rollback, etc.)
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
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




	public Product updateProduct(Long id, Product updatedProduct) {
		Product existingProduct = productRepo.findById(id).orElse(null);

		if (existingProduct != null) {
			existingProduct.setProductName(updatedProduct.getProductName());
			existingProduct.setProductPrice(updatedProduct.getProductPrice());
			existingProduct.setProductDescription(updatedProduct.getProductDescription());
			existingProduct.setProductPrice(updatedProduct.getProductPrice());
			existingProduct.setCategory(updatedProduct.getCategory());
			existingProduct.setImageURL(updatedProduct.getImageURL());
			// Set other attributes as needed

			return productRepo.save(existingProduct);
		}

		return null; // Or throw an exception indicating the product was not found
	}

}
