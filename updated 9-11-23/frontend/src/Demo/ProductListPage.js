import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {toast,Toaster} from 'react-hot-toast';
import {getToken} from '../Security/TokenManager'
import Sidebar from './AdminSideBar';

const Card = ({ product, handleEdit, handleRemove }) => {
  return (
    <div className=''>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
          {product.imageURL ? (
            <img
              src={product.imageURL[0]}
              alt="Product"
              className="h-80 w-72 object-cover rounded-t-xl"
            />
          ) : (
            <p className="mb-2">Category: Not specified</p>
          )}

          <div className="px-4 py-3 w-72">
            <p className="text-lg font-bold text-black truncate block capitalize ">
              {product.productName}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ₹{product.productPrice}
              </p>
              <div className='ml-10 space-x-2 justify-end items-end'>
              <button onClick={() => handleEdit(product)} className='bg-blue-400  pl-3 pr-3 rounded-md'>Edit</button>
              <button onClick={() => handleRemove(product.productId)} className='bg-red-400  pl-3 pr-3 rounded-md'>
                Remove
              </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

const ProductListPage = () => {
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const apitoken = getToken('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/product/getProducts',
          {
            headers: {
              'Authorization':`Bearer ${apitoken}` 
            }
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSaveChanges = async (editedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/product/editProduct/${editedProduct.productId}`,
        editedProduct,
        {
          headers: {
            'Authorization':`Bearer ${apitoken}` 
          },
        }
      );

      // Update state after successful edit
      setProducts(prevProducts => prevProducts.map(product =>
        product.productId === editedProduct.productId ? response.data : product
      ));

      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }

   
    handleCloseModal();
  };

  const handleRemove = async (productId) => {
    try { 
      await axios.delete(`http://localhost:8080/api/product/deleteProduct/${productId}`, {
        headers: {
          'Authorization':`Bearer ${apitoken}` 
        },
      })
      toast.success('Product deleted successfully!');
      
      // Update state after successful removal
      setProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <Toaster />
      <div className="flex-grow pl-[22rem]">
        <div>
          <section
            id="Projects"
            className="w-fit mx-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-10 mt-10 mb-5"
          >
            {products.map((product) => (
              <Card
                key={product.productId}
                product={product}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
          </section>
        </div>
      </div>
{selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <div className='w-[600px] '>
          <div className="bg-white p-4 shadow-lg rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges(selectedProduct);
              }}
            >
              
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={selectedProduct.productName}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productName: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  BRAND
                </label>
                <input
                  type="text"
                  id="productbrand"
                  name="productbrand"
                  value={selectedProduct.brand}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      brand: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 ">
                  Product Description
                </label>
                <textarea  
                  type="text"
                  id="productDescription"
                  name="productDescription"
                  value={selectedProduct.productDescription}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                    productDescription: e.target.value
                    })
                  }
                  required
                  className="mt-5. h-[100px] w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={selectedProduct.productName}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productName: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  value={selectedProduct.productPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productPrice: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Product Stock
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={selectedProduct.quantity}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageURL"
                  name="imageURL"
                  value={selectedProduct.imageURL}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      imageURL: e.target.value
                    })
                  }
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mr-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductListPage;