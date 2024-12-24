import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Import Navigate for redirection
import Navbar from "./Navbar"; // Import the Navbar component
import HomePage from "./HomePage"; // Import the HomePage component
import LoginPage from "./LoginPage"; // Import the LoginPage component
import RegistrationPage from "./RegistrationPage"; // Import the RegistrationPage component
import UserAccount from "./UserAccount"; // Import the UserAccount component
import ForgotPassword from "./ForgotPassword"; // Import the ForgotPassword component
import UserDashboard from "./UserDashboard"; // Import the UserDashboard component
import CategoryList from "./CategoryList"; // Import the CategoryList component
import CategoryPage from "./CategoryPage"; // Import the CategoryPage component
import BookDetails from "./BookDetails"; // Import the BookDetails component
import UserForm from "./UserForm"; // Import the UserForm component

function App() {
  const [user, setUser] = useState(null); // Track the authenticated user

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Restore user data from localStorage if available
    }
  }, []);

  // Login function to authenticate the user
  const login = (userData) => {
    setUser(userData); // Set user data after successful login
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
  };

  // Logout function to clear the user state
  const logout = () => {
    setUser(null); // Clear the user data
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <Router>
      <div className="App">
        {/* Pass user state and login/logout functions to Navbar */}
        <Navbar user={user} login={login} logout={logout} />

        {/* Define routes for the application */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />
          {/* Login page route */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" /> // Redirect to home if already logged in
              ) : (
                <LoginPage onAuthSuccess={login} />
              )
            }
          />
          {/* Registration page route */}
          <Route path="/register" element={<RegistrationPage />} />
          {/* Forgot password route */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* User account route */}
          <Route
            path="/account"
            element={user ? <UserAccount /> : <Navigate to="/login" />} // Redirect to login if not authenticated
          />
          {/* User dashboard route */}
          <Route
            path="/dashboard"
            element={user ? <UserDashboard /> : <Navigate to="/login" />} // Redirect to login if not authenticated
          />
          {/* Categories and CategoryPage route */}
          <Route path="/category" element={<CategoryList />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          {/* Book details page route */}
          <Route path="/book/:id" element={<BookDetails />} />
          {/* User form route */}
          <Route path="/userform" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
