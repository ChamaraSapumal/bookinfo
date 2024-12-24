// src/RegistrationPage.js
import React from "react";
import { useForm } from "react-hook-form";
import { auth, database, set, ref } from "./firebase"; // Import Firebase services
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; // For navigation

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Navigation hook

  const onSubmit = async (data) => {
    try {
      console.log("Attempting to create user...");

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("User created:", user);

      // Store the user data in Firebase Realtime Database
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, {
        email: user.email,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
      });
      console.log("User data added to Firebase Realtime Database");

      // Navigate to the user form page after successful registration
      navigate("/userform");
    } catch (error) {
      console.error("Error creating user:", error);

      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please try another email.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak. Please choose a stronger password.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-2 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`mt-2 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords don't match",
              })}
              className={`mt-2 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded mt-4 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
