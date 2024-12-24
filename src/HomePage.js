import React, { useEffect, useState } from "react";
import { database, ref, get } from "./firebase"; // Import the correct database instance (Realtime Database)
import axios from "axios";

// Google Books API URL
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({ usersCount: 0, categoriesCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookCount, setBookCount] = useState(0); // State to hold the number of books
  const [categories, setCategories] = useState(new Set()); // Track unique categories

  // Fetch books and stats using Google Books API and Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBooks("bestsellers"); // Default search query for books
        await fetchStats(); // Fetch statistics from Firebase (users count only)
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch books from Google Books API
  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(GOOGLE_BOOKS_API_URL, {
        params: {
          q: query,
          maxResults: 10,
        },
      });
      setBooks(response.data.items || []); // Set fetched books
      setBookCount(response.data.totalItems || 0); // Set the total book count

      // Extract unique categories from the books and set them
      const fetchedCategories = new Set();
      response.data.items.forEach((book) => {
        if (book.volumeInfo.categories) {
          book.volumeInfo.categories.forEach((category) => {
            fetchedCategories.add(category);
          });
        }
      });

      // Set categories state
      setCategories(fetchedCategories); // Update categories

      // Directly update stats after categories are fetched
      setStats((prevStats) => ({
        ...prevStats,
        categoriesCount: fetchedCategories.size, // Update categoriesCount directly from API
      }));
    } catch (error) {
      console.error("Error fetching books:", error);
      throw new Error("Books fetch failed");
    }
  };

  // Fetch user stats from Firebase Realtime Database
  const fetchStats = async () => {
    try {
      const usersRef = ref(database, "users");

      // Fetch users data
      const usersSnapshot = await get(usersRef);

      // Update stats state, only setting usersCount
      setStats((prevStats) => ({
        ...prevStats,
        usersCount: usersSnapshot.exists()
          ? Object.keys(usersSnapshot.val()).length
          : 0,
      }));
    } catch (error) {
      console.error("Error fetching stats:", error.message);
      setError("Failed to fetch statistics from Firebase Realtime Database.");
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery) {
      fetchBooks(searchQuery); // Call fetchBooks with the search query
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gray-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">
            Discover Your Next Favorite Book
          </h1>
          <p className="mt-4 text-lg">
            Explore a world of knowledge and adventure with our curated book
            selection.
          </p>
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books..."
              className="px-4 py-2 rounded-l-md focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              {/* Displaying Stats like Users and Categories */}
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Users Registered</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stats.usersCount}
                </dd>
              </div>

              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">
                  Categories Available
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stats.categoriesCount}
                </dd>
              </div>

              {/* Displaying the total number of books */}
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Books Found</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {bookCount}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      {/* Book List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {searchQuery ? `Results for "${searchQuery}"` : "Popular Books"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => {
            const { title, categories, imageLinks } = book.volumeInfo;
            return (
              <div key={book.id} className="bg-white shadow rounded-lg p-4">
                <img
                  src={
                    imageLinks?.thumbnail || "https://via.placeholder.com/150"
                  }
                  alt={title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 font-bold text-lg">{title}</h3>
                <p className="text-gray-600">{categories?.join(", ")}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
