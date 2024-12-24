import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User icon

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Categories", href: "/category", current: false },
  { name: "User", href: "/userform", current: false },
  { name: "Best Sellers", href: "/best-sellers", current: false },
  { name: "Contact Us", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user, login, logout }) {
  const navigate = useNavigate();

  // Handle navigation to login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Handle navigation to the dashboard (or user account page)
  const handleUserAccountClick = () => {
    navigate("/account");
  };

  // Handle logout action
  const handleLogout = () => {
    logout(); // Call logout function to clear user state
    navigate("/"); // Optionally navigate to the home page
  };

  // Render the user actions (Login, User icon or Logout)
  const renderUserActions = () => (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {user ? (
        <>
          <button
            onClick={handleUserAccountClick}
            className="text-white hover:bg-gray-700 rounded-full p-2"
          >
            <FaUserCircle className="h-6 w-6" />
          </button>
          <button
            onClick={handleLogout}
            className="ml-4 text-white bg-red-500 hover:bg-red-600 rounded-md px-3 py-2 text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLoginClick}
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 text-sm"
        >
          Login
        </button>
      )}
    </div>
  );

  // Render navigation links
  const renderNavigationLinks = () => (
    <div className="flex space-x-4">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </a>
      ))}
    </div>
  );

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>

          {/* Logo and Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              {renderNavigationLinks()}
            </div>
          </div>

          {/* User Actions (Login/Logout or User Icon) */}
          {renderUserActions()}
        </div>
      </div>

      {/* Mobile Navigation */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
