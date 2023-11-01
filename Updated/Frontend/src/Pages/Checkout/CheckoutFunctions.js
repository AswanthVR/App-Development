// apiFunctions.js

import axios from 'axios';
import { getAuthorizationHeaders, getToken } from '../../Security/TokenManager';

export const getAddressData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/address/user/1', getAuthorizationHeaders());
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const getCartItemsData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/carts/user/${localStorage.getItem('uid')}`, {
      headers: {
        'Authorization': `Bearer ${getToken('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/user/getUser/${localStorage.getItem('uid')}`, {
      headers: {
        'Authorization': `Bearer ${getToken('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
