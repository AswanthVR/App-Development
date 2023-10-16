import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toast,Toaster } from 'react-hot-toast';
import { DefaultSidebar } from './SideB';
import {getToken} from '../Security/TokenManager'
import { Token } from '@mui/icons-material';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brand:'',
    productDescription: '',
    productPrice: 0, 
    imageURL:[],
    category: {
      id: '',
      name: ''
    }
  });

const apitoken = getToken('token');


  const [imageURL, setImageURL] = useState(''); 

  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    formData.category.id = categoryId;
    const selectedCategory = categories.find(category => category.id == categoryId);
    console.log(selectedCategory);
    setFormData({
      ...formData,
      category: selectedCategory
    });
    handleChange(e);
  };

   
  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.productName === '' || formData.productDescription === '' || formData.productPrice === 0  || formData.imageURL === '') {
      toast.error('Please fill all fields!');
      return;
    }
    if( formData.productCategory === ''){
      toast.error('Please select a category!');
      return;
    }

    const imageURLString = imageURL;
    const imageURLArray = imageURLString.split(' ');
    const trimmedImageURLArray = imageURLArray.map(url => url.trim());
    formData.imageURL = trimmedImageURLArray;
 

    axios.post('http://localhost:8080/api/product/addProduct', formData, {
      headers: {
        'Authorization':`Bearer ${apitoken}`
      }
    })
    .then(response => {
      
      toast.success('Product added successfully!');
    })
    .catch(error => {
      console.error('Error adding product:', error);
    });
  };

  useEffect(() => { 
    console.log(apitoken);
    axios.get('http://localhost:8080/category/getAll',{
      headers: {
        'Authorization':`Bearer ${apitoken}` 
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="flex">
    <DefaultSidebar />
    <div className=" flex-grow pl-[20rem]"> 
    <div>
   
<div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
  <Toaster/>
  <h1 className="text-2xl font-bold mb-4">Add Product</h1>

  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Product Name:</label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Product Brand:</label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Product Description:</label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="productDescription"
        value={formData.productDescription}
        onChange={handleChange}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Product Price:</label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        type="number"
        name="productPrice"
        value={formData.productPrice}
        onChange={handleChange}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Product Category:</label>
      <select
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        name="productCategory"
        value={formData.productCategory}
        onChange={handleCategoryChange}
        
      >
        <option value="">Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">Image URLs (comma separated):</label>
      <input
        className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="imageURL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
    </div>

    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add Product
    </button>
  </form>
</div>
</div>
</div>
</div>

  );
};

export default AddProductPage;
