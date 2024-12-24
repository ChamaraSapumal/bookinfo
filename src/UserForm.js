import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, set, get } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const UserForm = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Get the authenticated user

  useEffect(() => {
    if (user) {
      // Fetch existing data from Firebase using get()
      const userRef = ref(database, "users/" + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data); // Update state with fetched data
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]); // Re-fetch data when user changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      // Save the new data to Firebase using set()
      const userRef = ref(database, "users/" + user.uid);
      await set(userRef, { ...userData });
      console.log("User data updated in Firebase");

      // Navigate to the dashboard
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          User Application Form
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={userData.firstName}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={userData.lastName}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={userData.address}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded mt-4 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
