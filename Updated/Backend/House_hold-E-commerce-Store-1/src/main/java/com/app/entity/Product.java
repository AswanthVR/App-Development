package com.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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
	private double productPrice;

	private int quantity;
	private String[] imageURL;

	@ManyToOne
	@JoinColumn(name = "category_Id")
	private Category category;

	//new
	@ManyToOne
	@JoinColumn(name = "subCategory_Id")
	private SubCategory subCategory;

//	@ManyToOne
//	@JoinColumn(name = "order_id")
//	private Order order;







	
}
