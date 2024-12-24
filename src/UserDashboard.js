import React, { useState, useEffect } from "react";

// Example of fetching wishlist and reviews data
const fetchWishlist = async () => {
  // Fetch wishlist items from backend or Firebase
  return [
    {
      title: "Book 1",
      author: "Author 1",
      cover: "https://via.placeholder.com/150?text=Book+Cover+1",
    },
    {
      title: "Book 2",
      author: "Author 2",
      cover: "https://via.placeholder.com/150?text=Book+Cover+2",
    },
    // Add more books here
  ];
};

const fetchReviews = async () => {
  // Fetch reviews from backend or Firebase
  return [
    {
      title: "Amazing Read",
      content: "This is a review of the book. It was an amazing read!",
    },
    {
      title: "Great Experience",
      content: "I loved the characters and the storyline!",
    },
    // Add more reviews here
  ];
};

const UserDashboard = () => {
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch wishlist and reviews data when component mounts
    const getWishlist = async () => {
      const data = await fetchWishlist();
      setWishlist(data);
    };
    const getReviews = async () => {
      const data = await fetchReviews();
      setReviews(data);
    };

    getWishlist();
    getReviews();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>

      {/* Wishlist Section */}
      <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {wishlist.map((book, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            <img src={book.cover} alt={book.title} className="mt-2" />
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-bold text-lg">{review.title}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
