package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com"})

@EntityScan({"com.app.entity"})
public class HouseHoldECommerceStore1Application {

	public static void main(String[] args) {
		SpringApplication.run(HouseHoldECommerceStore1Application.class, args);
	}

}
