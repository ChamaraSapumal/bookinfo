import React from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUserAlt,
  FaFlask,
  FaHistory,
  FaLaptopCode,
  FaPalette,
  FaUserTie,
  FaSearch,
  FaMagic,
  FaHeartbeat,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    icon: <FaBookOpen />,
    imageUrl: "https://via.placeholder.com/150?text=Fiction",
  },
  {
    name: "Non-Fiction",
    icon: <FaUserAlt />,
    imageUrl: "https://via.placeholder.com/150?text=Non-Fiction",
  },
  {
    name: "Science",
    icon: <FaFlask />,
    imageUrl: "https://via.placeholder.com/150?text=Science",
  },
  {
    name: "History",
    icon: <FaHistory />,
    imageUrl: "https://via.placeholder.com/150?text=History",
  },
  {
    name: "Technology",
    icon: <FaLaptopCode />,
    imageUrl: "https://via.placeholder.com/150?text=Technology",
  },
  {
    name: "Art",
    icon: <FaPalette />,
    imageUrl: "https://via.placeholder.com/150?text=Art",
  },
  {
    name: "Biography",
    icon: <FaUserTie />,
    imageUrl: "https://via.placeholder.com/150?text=Biography",
  },
  {
    name: "Mystery",
    icon: <FaSearch />,
    imageUrl: "https://via.placeholder.com/150?text=Mystery",
  },
  {
    name: "Fantasy",
    icon: <FaMagic />,
    imageUrl: "https://via.placeholder.com/150?text=Fantasy",
  },
  {
    name: "Health",
    icon: <FaHeartbeat />,
    imageUrl: "https://via.placeholder.com/150?text=Health",
  },
];

const CategoryList = () => {
  return (
    <div className="bg-white py-16 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
          Explore Categories
        </h2>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {categories.map(({ name, icon, imageUrl }) => (
            <li
              key={name}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden shadow-lg">
                <img
                  src={imageUrl}
                  alt={name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center text-white">
                  <div className="text-3xl">{icon}</div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <Link
                  to={`/category/${name.toLowerCase()}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View Category
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
