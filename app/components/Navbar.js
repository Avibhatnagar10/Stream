"use client"; // Use this if you're using useState in any components

import React, { useState, useEffect, useRef } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleHomeRedirect = () => {
    router.push("/");
  };

  const handleProfileRedirect = () => {
    router.push("/userprofile");
  };

  const handleSettingsRedirect = () => {
    router.push("/settings");
  };

  const handlecotact = () => {
    router.push("/contact");
  }

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    console.log("User signed out");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <h1
        className="text-3xl font-bold text-white cursor-pointer tracking-wide transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={handleHomeRedirect}
      >
        StreamForge
      </h1>
      <div className="flex items-center space-x-6">
        

        <button
          className="text-sm font-medium text-white bg-transparent px-5 py-3 rounded-md 
          hover:bg-gray-700 hover:bg-opacity-50 hover:border-gray-700 transition duration-300 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handlecotact}
        >
          Contact Us
        </button>



        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-sm font-medium text-white px-4 py-2 hover:underline focus:outline-none"
              onClick={toggleDropdown}
            >
              {user.displayName || "Profile"}
            </button>
            <div
              className={`absolute right-0 mt-2 w-48 bg-opacity-90 bg-gray-800 border border-gray-700 shadow-lg rounded-md 
              transition-all duration-500 ease-in-out transform origin-top ${dropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
            >
              <button
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 transition duration-300"
                onClick={handleProfileRedirect}
              >
                User Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:bg-opacity-50 transition duration-300"
                onClick={handleSettingsRedirect}
              >
                Settings
              </button>
             
            </div>
          </div>
        ) : (
          <button
            className="text-sm font-medium text-white bg-transparent px-5 py-3 rounded-md 
            hover:bg-gray-700 hover:bg-opacity-50 hover:border-gray-700 transition duration-300 ease-in-out 
            focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleLogin}
          >
            Sign in
          </button>


        )}

        <button
          className="flex items-center justify-start w-12 h-12 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg bg-red-500 hover:w-32 hover:rounded-xl"
          onClick={handleLogout}
        >
          <div className="flex items-center justify-center w-full transition-all duration-300">
            <svg viewBox="0 0 512 512" className="w-5 h-5">
              <path
                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                fill="white"
              />
            </svg>
          </div>

          <div className="absolute right-0 w-0 opacity-0 text-white text-lg font-semibold transition-all duration-300 hover:opacity-100 hover:w-auto pr-2">
            Logout
          </div>
        </button>

      </div>

    </nav>
  );
};

export default Navbar;
