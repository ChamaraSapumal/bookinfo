import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL params
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const apiKey = "AIzaSyCFoUA0LXXDh_pySt20q48nHdAuYbob3tc"; // Replace with your API key

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}`
        );
        const data = await response.json();
        setBooks(data.items || []);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      }
      setLoading(false);
    };

    fetchBooks();
  }, [category]);

  const renderSkeletonLoader = () => (
    <div className="max-w-sm border border-gray-300 rounded-lg p-4 animate-pulse">
      {/* Placeholder for the image */}
      <div className="w-full bg-gray-300 h-48 rounded-lg mb-5 flex justify-center items-center">
        <svg
          className="w-8 h-8 stroke-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z"
            stroke="stroke-current"
            strokeWidth="1.6"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>

      {/* Placeholder for the book details */}
      <div className="w-full flex justify-between items-start animate-pulse">
        <div className="block">
          <h3 className="h-3 bg-gray-300 rounded-full w-48 mb-4"></h3>
          <p className="h-2 bg-gray-300 rounded-full w-32 mb-2.5"></p>
        </div>
        <span className="h-2 bg-gray-300 rounded-full w-16"></span>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 6 }).map((_, index) => renderSkeletonLoader())}
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white py-16 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-center mb-8">
          Books in {category}
        </h2>
        <button
          onClick={() => navigate("/category")} // Navigate back to category list using useNavigate
          className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all duration-300 ease-in-out"
        >
          Back to Categories
        </button>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id}
                className="max-w-sm border border-gray-300 rounded-lg p-4"
              >
                <img
                  alt={book.volumeInfo.title}
                  src={
                    book.volumeInfo.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/150"
                  }
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover"
                />
                <div className="w-full flex justify-between items-start">
                  <div className="block">
                    <h3 className="text-lg font-semibold mt-4">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {book.volumeInfo.authors?.join(", ")}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900 mt-2">
                    {book.volumeInfo.saleInfo?.listPrice?.amount
                      ? `$${book.volumeInfo.saleInfo.listPrice.amount}`
                      : "Price not available"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              No books found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
