package com.app.entity;
import com.app.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.nio.MappedByteBuffer;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private long addressId;

    @Column(name = "address_line_1")
    private String addressLine1;

    @Column(name = "address_line_2" , nullable = true)
    private String addressLine2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "country")
    private String country;

    @Column(name = "type")
    private String type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;






}
