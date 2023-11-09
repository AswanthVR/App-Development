package com.app.service;

import com.app.dto.CountResponse;
import com.app.dto.OrderRequest;
import com.app.dto.OrderResponse;
import com.app.dto.ProductInfo;
import com.app.entity.Order;
import com.app.entity.OrderMapping;
import com.app.entity.Product;
import com.app.entity.User;
import com.app.repository.OrderRepository;
import com.app.repository.ProductRepository;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class  OrderService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ProductService productService;

    private final CartService cartService;

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll(); // Assuming you have a findAll() method in your repository.
        return convertToOrderResponse(orders);
    }

    public Order saveOrder(OrderRequest request) {
        User user = userRepository.findByUid(request.getUid());
        List<ProductInfo> productInfoList = request.getProducts();
        long orderTotal = calculateOrderTotal(productInfoList);

        if (orderTotal <= 0) {
            throw new IllegalArgumentException("Order total must be greater than zero.");
        }

        try {
            Order order = createOrder(request, user, orderTotal, productInfoList);
            return orderRepository.save(order);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    private Order createOrder(OrderRequest request, User user, long orderTotal, List<ProductInfo> productInfoList) {
        Order order = Order.builder()
                .orderDate(new Date())
                .orderAddress(request.getOrderAddress())
                .paymentMode(request.getPaymentMode())
                .user(user)
                .orderTotal(orderTotal)
                .orderMappings(request.getProducts().stream()
                        .map(productRequest -> {
                            Product product = productService.getProductById(productRequest.getProductId());
                            if (product != null) {
                                return OrderMapping.builder()
                                        .product(product)
                                .quantity(productRequest.getQuantity())
                                        .build();
                            } else {
                                throw new IllegalArgumentException("Invalid product ID: " + productRequest.getProductId());
                            }
                        })
                        .collect(Collectors.toList()))
                .build();

        updateProductQuantities(productInfoList);

        return order;
    }

    private List<Product> updateProductQuantities(List<ProductInfo> productInfoList) {
        List<Product> updatedProducts = new ArrayList<>();

        for (ProductInfo productInfo : productInfoList) {
            Long productId = productInfo.getProductId();
            Long quantity = productInfo.getQuantity();

            Product product = getProductOrThrow(productId);

            if (product.getQuantity() < quantity) {
                throw new IllegalArgumentException("Insufficient quantity for product ID: " + productId);
            }

            Product updatedProduct = createUpdatedProduct(product, quantity);
            productRepository.save(updatedProduct);
            updatedProducts.add(updatedProduct);
        }

        return updatedProducts;
    }

    private Product getProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found for ID: " + productId));
    }

    private Product createUpdatedProduct(Product product, Long quantity) {
        Product updatedProduct = new Product();
        updatedProduct.setProductId(product.getProductId());
        updatedProduct.setProductName(product.getProductName());
        updatedProduct.setProductPrice(product.getProductPrice());
        updatedProduct.setCategory(product.getCategory());
        updatedProduct.setImageURL(product.getImageURL());
        updatedProduct.setBrand(product.getBrand());
        updatedProduct.setQuantity((int) (product.getQuantity() - quantity));
        updatedProduct.setProductDescription(product.getProductDescription());
        return updatedProduct;
    }

    private long calculateOrderTotal(List<ProductInfo> productInfoList) {
        return productInfoList.stream()
                .mapToLong(productInfo -> {
                    Product product = getProductOrThrow(productInfo.getProductId());
                    if (product.getQuantity() < productInfo.getQuantity()) {
                        throw new IllegalArgumentException(
                                "Insufficient quantity for product ID: " + productInfo.getProductId());
                    }
                    return (long) (product.getProductPrice() * productInfo.getQuantity());
                })
                .sum();
    }

    public List<OrderResponse> getOrders(Long uid) {
        return convertToOrderResponse(orderRepository.findAllByUserUid(uid));
    }

    public List<OrderResponse> convertToOrderResponse(List<Order> orders) {
        return orders.stream()
                .map(order -> {
                    OrderResponse.OrderResponseBuilder builder = OrderResponse.builder()
                            .oid(order.getOid())
                            .orderDate(order.getOrderDate())
                            .orderTotal(order.getOrderTotal())
                            .orderAddress(order.getOrderAddress())
                            .paymentMode(order.getPaymentMode());

                    List<Product> products = order.getOrderMappings().stream()
                            .map(OrderMapping::getProduct)
                            .collect(Collectors.toList());

                    builder.products(products);

                    return builder.build();
                })
                .collect(Collectors.toList());
    }


    public CountResponse orderCount() {
        long count = orderRepository.count();
        return CountResponse.builder().count(count).build();
    }
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        return order != null ? convertOrderToOrderResponse(order) : null;
    }

    private OrderResponse convertOrderToOrderResponse(Order order) {
        OrderResponse.OrderResponseBuilder builder = OrderResponse.builder()
                .oid(order.getOid())
                .orderDate(order.getOrderDate())
                .orderTotal(order.getOrderTotal())
                .orderAddress(order.getOrderAddress())
                .paymentMode(order.getPaymentMode());

        User user = order.getUser();
        builder.name(user.getName());
        builder.uid(user.getUid());
        builder.email(user.getEmail());

        List<Product> products = order.getOrderMappings().stream()
                .map(OrderMapping::getProduct)
                .collect(Collectors.toList());

        builder.products(products);

        return builder.build();
    }


    public boolean deleteOrder(Long orderId) {
        try {
            orderRepository.deleteById(orderId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public void deleteAllOrders() {
        orderRepository.deleteAll();
    }

}