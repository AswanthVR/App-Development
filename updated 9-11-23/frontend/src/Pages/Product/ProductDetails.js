import React from 'react'
import { addToWishList, fetchCartCount } from '../../API/Server';
import { getToken } from '../../Security/TokenManager';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Navbar12 from '../../components/Navbar/Navbar';
import { useEffect } from 'react';
import { LiaStar } from 'react-icons/lia';
import { IoIosStarOutline, IoMdStarOutline } from 'react-icons/io';
import ReviewModal from './Review';
import { CgProfile } from 'react-icons/cg';


export default function ProductDetails() {
    const { id } = useParams();
   
    const [product , setProduct] = useState('');
    const [available , setAvailable] = useState(false);
    const [Quantity , setQuantity] = useState(1);
    const [image , setImage] = useState('');

    const [rating, setRating] = useState(0);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);



  

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

    const handleStarClick = (starValue) => {
      setRating(starValue);
    };
    const handleStarHover = (starValue) => {
        setRating(starValue);
      };
    
      const handleStarLeave = () => { 
        setRating(0);
      };



    useEffect(() => {
        axios.get(`http://localhost:8080/api/product/getproduct/${id}`, {
          headers: {
            'Authorization': `Bearer ${getToken('token')}`
          }
        })
        .then((response) => {
          console.log(response.data)
          setProduct(response.data)
          setImage(response.data.imageURL[0])
        })
        .catch((error) => {
          console.log(error);
        });
      }, [id]); // Make sure 'id' is the correct dependency
      
   
     const handleAddToCart = (product) => {
       console.log(product) 
       axios.post("http://localhost:8080/api/carts",
   
       {
        
         quantity:Quantity,
        
         product:{
             productId:product.productId
         },
         user:{
             uid:localStorage.getItem('uid'),
             role:"USER"
         }},
       {
         headers: {
           'Authorization':`Bearer ${getToken('token')}` 
         }
       }
       ).then((response)=>{
           console.log(response.data);
           toast.success('Added to cart');
       fetchCartCount()
   
         
       })
       .catch((error)=>{
         console.log(error);
       })
         
       // dispatch(addToCart(product)); 
     };

     const [review, setReview] = useState([]);
     useEffect(() => { 
        axios.get(`http://localhost:8080/api/review-ratings/product/${id}`, {
            headers: {
                'Authorization':`Bearer ${getToken('token')}` 
              }
        })
          .then(response => {
            setReview(response.data); 
            console.log(response.data)})
          .catch(error => console.error('Error fetching data:', error));
      }, [id]); 

const totalReviews = review.length;

let cumulativeRating = 0;
let starCounts = [0, 0, 0, 0, 0];

review.forEach((review) => {
  cumulativeRating += review.rating;
  starCounts[review.rating - 1] += 1;
});

const averageRating = (cumulativeRating / totalReviews).toFixed(0);
const starPercentages = starCounts.map((count) => ((count / totalReviews) * 100).toFixed(0));
const roundedAvgRating = Math.round(averageRating);



  return (
    <div>
        <Navbar12/>
        <section class="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div class="max-w-6xl px-4 py-4 mx-auto md:px-0 md:py-0">
            <div class="flex flex-wrap -mx-4">
                <div class="w-full px-4 md:px-0 md:w-1/2 ">
                    <div class=" top-0  h-full ">
                        <div class="relative mb-6 lg:mb-10 lg:h-2/4   z-0">
                            <img src={image} alt=""
                                class="object-contain w-full lg:h-full "/>
                        </div>
                        <div class="flex-wrap hidden md:flex ">
                            {
                                product.imageURL && product.imageURL.map((image)=>(
                            <div class="w-1/2 p-2 sm:w-1/4">
                                <button  onClick={()=>{setImage(image)}}    
                                    class="block border border-yellow-500 border-2dark:border-transparent   hover:border-yellow-300">
                                    <img onClick={()=>{setImage(image)}} src={image} alt=""
                                        class="object-cover w-full lg:h-20"/>
                                </button>
                            </div>

                                ))
                            }
                   
                        </div>
                    </div>
                </div>

                <div class="w-full px-4 md:w-1/2 md:px-0">
                    <div class="lg:pl-20">
                        <div class="mb-0 ">
                            <span class="text-lg font-medium text-yellow-600 dark:text-rose-200">{product.brand}</span>
                            <span className='flex justify-between'>
                            <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                {product.productName}
                                </h2>
                                {/* shareicon */}
                                <div className=" -mt-4 ">
                                                            <a 
                                                            className="whatsapp_share_button addthis_button_whatsapp at300b external_link " 
                                                            target="_blank" 
                                                            title="WhatsApp" 
                                                            href={`https://api.whatsapp.com/send/?text=Buy%20${encodeURIComponent(product.productName)}%20Online%20at%20Best%20Prices%20in%20%20-%20ESSENTIA.%20${window.location.href}`} 
                                                            rel="noopener"
                                                            style={{ margin: '15px' }}
                                                            >
                                                            <span className="at-icon-wrapper">
                                                            <img className='hover:bg-yellow-100 rounded-full  p-1' src="https://www.jiomart.com/assets/ds2web/jds-icons/share-desktop-icon.svg" alt=""/>
                                                            </span>
                                                            </a>
                                </div>
                                {/* shareicon */}
                                </span>

                            <div class="flex items-center mb-6">
                                <ul class="flex mr-2">
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                class="w-4 mr-1 text-yellow-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                class="w-4 mr-1 text-yellow-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor"
                                                class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                                <p class="text-xs dark:text-gray-400 ">(2 customer reviews)</p>
                            </div>
                            <p class="max-w-md mb-4 text-gray-700 dark:text-gray-400">
                            {product.productDescription}   
                            </p>
                            <p class="inline-block mb-4 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                <span> ₹ {product.productPrice}</span>
                                <span
                                    class="text-base font-normal text-gray-500 line-through dark:text-gray-400"> ₹ {(product.productPrice + product.productPrice/80).toFixed(2)}</span>
                            </p>
                            <p class="text-green-600 dark:text-green-300 "></p>
                            {product.quantity>0 ?(
                       <p class="text-green-600 dark:text-green-300 ">In Stock</p>):
                       <p class="text-red-600 dark:text-green-300 ">Out of Stock</p>
                        }
                        </div>
                     
                        <div class="w-32 mb-8 ">
                            <label for=""
                                class="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
                            <div class="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                <button onClick={()=>setQuantity(Quantity-1)}
                                    class="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                    <span class="m-auto text-2xl font-thin">-</span>
                                </button>
                             
                                    <h3  class="border-l-2 border-r-2 px-4 flex items-center font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 
                                    focus:outline-none text-md hover:text-black">{Quantity}</h3>
                                <button onClick={()=>setQuantity(Quantity+1)}
                                    class="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                    <span class="m-auto text-2xl font-thin">+</span>
                                </button>
                            </div>
                        </div>
                        <div class="flex flex-wrap items-center -mx-4 ">
                            <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                                <button onClick={()=>handleAddToCart(product)} 
                                    class="flex items-center justify-center w-full p-4 text-yellow-500 border border-yellow-500 rounded-md dark:text-gray-200 dark:border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 hover:text-gray-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:hover:border-yellow-500 dark:hover:text-gray-300">
                                    Add to Cart
                                </button>
                            </div>
                            <div class="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                <button onClick={()=>addToWishList(product)}
                                    class="flex items-center justify-center w-full p-4 text-pink-500 border border-pink-500 rounded-md dark:text-gray-200 dark:border-yellow-500 hover:bg-pink-500 hover:border-pink-600 hover:text-gray-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:hover:border-yellow-500 dark:hover:text-gray-300">
                                    Add to wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


{/* //line */}
                <div class='h-1 bg-gray-600 w-full my-4'></div>
                <div className='w-full'><h1 className='font-semibold text-center md:text-3xl text-2xl mb-10'>Ratings & Reviews</h1></div>


        
    <div className="w-full px-4 md:px-0 md:w-1/2">
    <div className="flex items-center mb-2">
      {/* ... Star icons ... */}
      <div className="flex items-center mb-2">
  {Array.from({ length: Math.floor(roundedAvgRating) }).map((_, index) => (
    <span key={index}>
      <svg
        className="w-4 h-4 text-yellow-300 mr-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
      </svg>
    </span>
  ))}
  <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
    {averageRating} out of 5
  </p>
</div>
 
    </div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {totalReviews} global ratings
    </p>

    {/* Render star ratings and percentages */}
    {[1,2,3,4,5].map((rating, index) => (
      <div className="flex items-center mt-4" key={rating}>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {rating} star
        </a>
        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
          <div
            className="h-5 bg-yellow-300 rounded"
            style={{ width: `${starPercentages[index]}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {starPercentages[index]}%
        </span>
      </div>
    ))}
 

                                <div>
                                    <h1 className='font-bold text-2xl mt-5'>Review this product</h1>
                                    <p>Help others make an informed <br></br>
                                decision!</p>
                                <div className='flex'>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                    <svg onClick={openReviewModal}
                                        key={value}
                                        className={`star-svg ${rating >= value ? 'fill-yellow-400' : ''}`}
                                        stroke="currentColor"
                                        fill='gray'
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
                                {/* <button >Submit Review</button> */}
                            </div>
                            {product && (
                                <>
                                    {/* <button onClick={openReviewModal}>Write Review</button> */}
                                    <div class="w-full  mb-4 lg:mb-0 lg:w-2/6 lg:mt-5 ,g:mb-5">
                                <button onClick={openReviewModal}
                                    class="flex items-center justify-center w-full p-4 text-yellow-500 border border-yellow-500 rounded-md dark:text-gray-200 dark:border-yellow-500 hover:bg-yellow-500 hover:border-yellow-600 hover:text-gray-100 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:hover:border-yellow-500 dark:hover:text-gray-300">
                                  Write Review
                                </button>
                            </div>
                                    {isReviewModalOpen && (
                                    <ReviewModal product={product} isOpen={isReviewModalOpen} onClose={closeReviewModal} />
                                    )}
                                </>
                                )}



                </div>

 {/* //customer reviews      */}
    <div className="w-full px-4 md:w-1/2">
      {review.map((review) => (
        <div key={review.reviewRatingId} className="">
          <span className="flex justify-between">
            <span className="flex space-x-3 mb-3">
              <span>
                <CgProfile className="text-4xl font-thin" />
              </span>
              <span className="-space-y-1">
                <h1 className="text-base">{review.user.name}</h1>
                <p className="text-xs text-gray-500">{review.date}</p>
              </span>
            </span>
            <span className="flex">
              <span>
                <h1>Rating: {review.rating}.0</h1>
              </span>
              <span className="flex flex-row">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    className={`star-svg ${
                      review.rating >= value ? 'fill-yellow-400' : ''
                    }`}
                    stroke="currentColor"
                    fill="gray"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                  </svg>
                ))}
              </span>
            </span>
          </span>
          <div className="md:-mt-0 -mt-2">
            <h1 className="md:font-bold font-bold text-sm">{review.headline}</h1>
            <p className="md:font-thin md:text-base text-xs font-thin">{review.description}</p>
          </div>
          <div className="h-[1px] text-gray-500 w-full bg-gray-400 mb-3 mt-3"></div>
        </div>
      ))}
    </div>

            </div>
        </div>
    </section>
    </div>
  )
}
