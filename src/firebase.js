import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, get, update } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB4YVcO0-v1ojNwDWxLkRCAdD-tE9WMpc",
  authDomain: "book-search-f5145.firebaseapp.com",
  projectId: "book-search-f5145",
  storageBucket: "book-search-f5145.appspot.com",
  messagingSenderId: "190338019227",
  appId: "1:190338019227:web:549c8f3c7971201ab4fb3e",
  databaseURL:
    "https://book-search-f5145-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

// Function to sanitize email for database path
export const sanitizeEmailForDatabase = (email) => {
  return email.replace(/[.#$\[\]]/g, "_").replace("@", "_at_");
};

// Function to create a user and save data
export const addUserToDatabase = async (userId, formData) => {
  const userRef = ref(database, "users/" + userId); // Store user data under "users/userId"
  try {
    await set(userRef, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      email: formData.email,
    });
    console.log("User data added successfully!");
  } catch (error) {
    console.error("Error adding user data: ", error.message);
    throw new Error("Error adding user data: " + error.message);
  }
};

// Function to retrieve user data from the database
export const getUserFromDatabase = async (userId) => {
  const sanitizedUserId = sanitizeEmailForDatabase(userId);
  const userRef = ref(database, "users/" + sanitizedUserId);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("No data available for this user.");
    }
  } catch (error) {
    console.error("Error fetching user data: ", error.message);
    throw new Error("Error fetching user data: " + error.message);
  }
};

// Authentication functions
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Login error: ", error.message);
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error: ", error.message);
    throw new Error(error.message);
  }
};

// Export the necessary functions
export { database, ref, set, get, update };
