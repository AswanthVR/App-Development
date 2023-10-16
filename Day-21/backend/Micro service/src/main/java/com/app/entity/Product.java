package com.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	@Id	
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long productId;
	private String productName;
	private String productDescription;
	private String brand;
	private int quantity;
	private double productPrice;

	private String[] imageURL;



	@ManyToOne
	@JoinColumn(name = "category_Id")
	private Category category;
	//new
	@ManyToOne
	@JoinColumn(name = "subCategory_Id")
	private SubCategory subCategory;

//	@JsonIgnore
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
//	private List<WishList> wishListList;


//	@JsonIgnore
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
//	private List<Cart> carts;

//
//	public Category getCategory() {
//		return category;
//	}
//
//	public void setCategory(Category category) {
//		this.category = category;
//	}
//
//	public Product(Long productId, String productName, String productDescription, double productPrice, String[] imageURL, Category category) {
//		this.productId = productId;
//		this.productName = productName;
//		this.productDescription = productDescription;
//		this.productPrice = productPrice;
//		this.imageURL = imageURL;
//		this.category = category;
//	}
//
//	public Long getProductId() {
//		return productId;
//	}
//	public void setProductId(Long productId) {
//		this.productId = productId;
//	}
//	public String getProductName() {
//		return productName;
//	}
//	public void setProductName(String productName) {
//		this.productName = productName;
//	}
//	public String getProductDescription() {
//		return productDescription;
//	}
//	public void setProductDescription(String productDescription) {
//		this.productDescription = productDescription;
//	}
//	public double getProductPrice() {
//		return productPrice;
//	}
//	public void setProductPrice(double productPrice) {
//		this.productPrice = productPrice;
//	}
//
//	public String[] getImageURL() {
//		return imageURL;
//	}
//	public void setImageURL(String[] imageURL) {
//		this.imageURL = imageURL;
//	}
//	public Product() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//
	
	
}
