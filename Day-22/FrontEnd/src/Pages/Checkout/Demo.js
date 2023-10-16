import React, { useState } from 'react';
import axios from 'axios';

const AddressDetails = () => {
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');

  const fetchAddressDetails = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json`
      );

      if (response.data && response.data.length > 0) {
        const firstResult = response.data[0];
        console.log(response.data)
        setAddress(firstResult.display_name);
      } else {
        setAddress('Address not found for this pincode');
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
      setAddress('Error fetching address details');
    }
  };

  return (
    <div>
      <h1>Fetch Address Details by Pincode</h1>
      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter Pincode"
      />
      <button onClick={fetchAddressDetails}>Fetch Address</button>
      <p>{address}</p>
    </div>
  );
};

export default AddressDetails;
