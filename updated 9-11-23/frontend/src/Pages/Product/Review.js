import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../Security/TokenManager';

const ReviewModal = ({ product, isOpen ,  onClose }) => {
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue) => {
    setRating(starValue);
  };

  const handleStarLeave = () => {
    setRating(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewData = {
      headline,
      description,
      rating,
      product,  
    };

    axios
      .post('http://localhost:8080/api/review-ratings', 
      {
        headline: headline,
        description: description,
        rating: rating,
        date: new Date(),
        user:{
          uid: localStorage.getItem('uid') 
        },
        product:{
          productId: product.productId
        }

      }
      ,{
        headers: {
          'Authorization':`Bearer ${getToken('token')}` 
        }
      })  
      .then((response) => {
        console.log('Review submitted successfully:', response.data);
        // Close the modal or perform any other actions upon successful submission
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center mt-20 rounded-lg`}>
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <span className="close-btn text-xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="flex space-x-4">
            <img src={product.imageURL[0]} alt={product.name} className="w-32 mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
          </div>
          <div className="rating-section mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <svg
                  key={value}
                  className={`star-svg ${rating >= value ? 'fill-yellow-400' : ''}`}
                  stroke="currentColor"
                  fill="gray"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  width="40"
                  height="40"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => handleStarHover(value)}
                  // onMouseLeave={handleStarLeave}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
              ))}
            </div>
            <p className="font-semibold mb-2">Rate this product</p>
          </div>
          <div className="headline-section mb-4">
            <label className="block font-semibold mb-1">Add a headline</label>
            <input
              placeholder="Please summarize your review in one line"
              type="text"
              maxLength="50"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>
          <div className="review-section mb-4">
            <label className="block font-semibold mb-1">Share your review</label>
            <textarea
              placeholder="Write about your experience using this product & let others know."
              maxLength="1000"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700" onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
