// apiUrls.js
const BASE_URL = 'https://localhost:8080';

const API = {
  addProduct: `${BASE_URL}/api/product/addProduct`,
  listProduct: `${BASE_URL}/api/product/editProduct`,
  deleteProduct: `${BASE_URL}/api/product/deleteProduct`,
  getProductById: `${BASE_URL}/api/product/getProduct`,

  getAllCategories: `${BASE_URL}/category/getAll`,
  getAllSubCategories: `${BASE_URL}/subCategory/getAll`,
  getCartByUser: `${BASE_URL}/api/carts/user/1`,
  
  
};

export default API;
