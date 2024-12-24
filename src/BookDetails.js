// src/BookDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from URL parameters
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  // Fetch book details when component mounts
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch book details");
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!book) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="rounded-lg"
              />
            )}
          </div>
          <div className="md:w-2/3 p-4">
            <h1 className="text-3xl font-bold mb-2">{book.volumeInfo.title}</h1>
            <h2 className="text-xl mb-2">
              by {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
            </h2>
            <p className="mb-4">
              {book.volumeInfo.description || "No description available."}
            </p>
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
            >
              More Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
