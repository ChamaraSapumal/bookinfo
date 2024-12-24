import React, { useState } from "react";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

const BookSearch = ({ user }) => {
  const [isbn, setIsbn] = useState("");
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchBookDetails = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `http://openlibrary.org/search.json?isbn=${isbn}`
      );
      const data = await response.json();
      if (data.numFound > 0) {
        setBookDetails(data.docs[0]);
      } else {
        setError("Book not found");
      }
    } catch (err) {
      setError("Error fetching book details");
    }
  };

  const addFavoriteBook = async () => {
    if (!user) return; // Ensure user is logged in
    try {
      await setDoc(doc(db, "users", user.uid, "favorites", isbn), bookDetails);
      alert("Book added to favorites!");
    } catch (err) {
      console.error("Error adding favorite book:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for a Book by ISBN</h1>
      <form onSubmit={fetchBookDetails} className="mb-4">
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Enter ISBN"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 w-full"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {bookDetails && (
        <div className="border p-4 mt-4">
          <h2 className="font-bold">{bookDetails.title}</h2>
          <p>
            <strong>Authors:</strong> {bookDetails.author_name?.join(", ")}
          </p>
          <p>
            <strong>Published Date:</strong> {bookDetails.first_publish_year}
          </p>
          <img
            src={`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
            alt={bookDetails.title}
          />
          <button
            onClick={addFavoriteBook}
            className="mt-2 bg-green-500 text-white p-2"
          >
            Add to Favorites
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
