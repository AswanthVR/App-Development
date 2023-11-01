package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String orderAddress;
    private String paymentMode;
    private Long uid;
    private String orderStatus;
    private List<ProductInfo> products;
}