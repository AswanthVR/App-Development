package com.app.service;

import com.app.entity.Address;
import com.app.repository.AddressRepository;
import com.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AddressService {

    @Autowired
    private  AddressRepository addressRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Address getAddressById(long addressId) {
        return addressRepository.findById(addressId).orElse(null);
    }

    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    public Address updateAddress(long addressId, Address updatedAddress) {
        Address existingAddress = getAddressById(addressId);

        if (existingAddress != null) {
            existingAddress.setAddressLine1(updatedAddress.getAddressLine1());
            existingAddress.setAddressLine2(updatedAddress.getAddressLine2());
            existingAddress.setCity(updatedAddress.getCity());
            existingAddress.setState(updatedAddress.getState());
            existingAddress.setPostalCode(updatedAddress.getPostalCode());
            existingAddress.setCountry(updatedAddress.getCountry());
            existingAddress.setType(updatedAddress.getType());

            return addressRepository.save(existingAddress);
        }

        return null; // Handle case where address with given ID does not exist
    }

    public void deleteAddress(long addressId) {
        addressRepository.deleteById(addressId);
    }

    public List<Address> getByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }
}
