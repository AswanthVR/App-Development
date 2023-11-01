package com.app.controller;

import com.app.entity.Address;
import com.app.entity.WishList;
import com.app.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/getAll")
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @GetMapping("/{addressId}")
    public Address getAddressById(@PathVariable int addressId) {
        return addressService.getAddressById(addressId);
    }

    @PostMapping("/addAddress")
    public Address addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    @PutMapping("/{addressId}")
    public Address updateAddress(@PathVariable int addressId, @RequestBody Address address) {
        return addressService.updateAddress(addressId, address);
    }

    @DeleteMapping("/{addressId}")
    public void deleteAddress(@PathVariable int addressId) {
        addressService.deleteAddress(addressId);
    }

    @GetMapping("/user/{userId}")
    public List<Address> getByUserId(@PathVariable Long userId) {
        return addressService.getByUserId(userId);
    }

}
