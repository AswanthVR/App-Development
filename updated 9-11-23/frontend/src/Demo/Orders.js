import React, { useState, useEffect } from 'react';
import { getAuthorizationHeaders } from '../Security/TokenManager';
import axios from 'axios';
import Sidebar from './AdminSideBar';
import Modal from 'react-modal'; // Import the modal library

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders/getAll', getAuthorizationHeaders());
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewProducts = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  return (
    <>
      <Sidebar />
      <div className="ml-[20%] p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 text-center">Order Details</h1>
        {orders.length > 0 && (
          <table className="min-w-full border border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-4">Order ID</th>
                <th className="p-4">Order Date</th>
                <th className="p-4">Order Total</th>
                <th className="p-4">Order Address</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Actions</th> {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.oid}>
                  <td className="border p-4">{order.oid}</td>
                  <td className="border p-4">{order.orderDate}</td>
                  <td className="border p-4">{order.orderTotal}</td>
                  <td className="border p-4">{order.orderAddress}</td>
                  <td className="border p-4">{order.paymentMode}</td>
                  <td className="border p-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleViewProducts(order)}
                    >
                      View Products
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {orders.length === 0 && (
          <p className="text-center mt-4">No orders available.</p>
        )}

        {/* Modal */}
        <Modal className="ml-[20%]"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="View Products Modal"
        >
          <h2 className="text-2xl mb-4">Products for Order ID: {selectedOrder?.oid}</h2>
          <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
          {selectedOrder && (
            <ul>
              {selectedOrder.products.map(product => (
                  <li key={product.id}>{product.productName} </li>
                  
              ))}
            </ul>
          )}
        </Modal>
      </div>
    </>
  )
}

export default CustomerOrders;
