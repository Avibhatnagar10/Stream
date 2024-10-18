// /client/pages/HomePage.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import Navbar from "./components/Navbar"; // Adjust the import path if necessary
import "./globals.css"; // Import global styles
import { FaArrowRight, FaGoogle } from "react-icons/fa"; // Icon import
import { auth } from "./firebaseConfig"; // Firebase auth import
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const HomePage = () => {
  // Explicitly set the user type to be either Firebase.User or null
  const [user, setUser] = useState<User | null>(null);
  const [showCards, setShowCards] = useState(false);
  const [overflow, setOverflow] = useState("hidden"); // Initial overflow state is hidden
  const [showPopup, setShowPopup] = useState(false); // Track popup visibility
  const [popupVisible, setPopupVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(""); // To store welcome message
  const [margindo, setMargindo] = useState("mt-16");
  const router = useRouter(); // Initialize the router

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null); // Set the user state (Firebase.User or null)
      if (currentUser) {
        const userName = currentUser.displayName || currentUser.email;
        const isNewUser =
          currentUser.metadata.creationTime ===
          currentUser.metadata.lastSignInTime;
        setWelcomeMessage(
          isNewUser ? `Hello, ${userName}` : `Welcome back, ${userName}`
        );
        setMargindo("-mt-80");
        setPopupVisible(true); // Show popup with animation
        setShowPopup(true);

        // Automatically hide the popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false); // Trigger exit animation
          setTimeout(() => setPopupVisible(false), 500); // Wait for animation to finish before hiding completely
        }, 1000); // Extended time to 5 seconds
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGetStartedClick = () => {
    if (!user) {
      setPopupVisible(true); // Show sign-in popup if not signed in
      setShowPopup(true);
    } else {
      setShowCards(true); // Show cards if signed in
      setOverflow("auto");
      setTimeout(() => {
        const cardsSection = document.getElementById("cards-section");
        if (cardsSection) {
          cardsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user); // result.user is of type Firebase.User
        setShowPopup(false); // Trigger exit animation
        setTimeout(() => setPopupVisible(false), 500); // Hide popup after animation
        setShowCards(true);
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
  };

  const handleStartLiveStream = () => {
    if (user) {
      window.open("/livestreampage", "_blank"); // Open live stream in a new tab
    } else {
      alert("Please sign in to start a live stream.");
      setPopupVisible(true); // Show sign-in popup if not signed in
      setShowPopup(true);
    }
  };

  return (
    <div
      className={`relative h-screen overflow-y-${overflow} text-white hide-scrollbar background`}
    >
      <Navbar />
      {/* Navbar at the top */}

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="relative text-5xl font-extrabold mb-8 tracking-wide">
      {/* <div className="h-2 bg-gradient-to-r from-gray-700 via-white to-gray-500 w-1/3 mx-auto mt-2 relative glow-light"></div> */}

      {/* Light effect on the title */}
      <p className="streamforge text-8xl font-extrabold relative z-10">
        <span className="relative title-light">StreamForge</span>
      </p>
          <span className="text-2xl mt-4 block">
            Your Way, Your Stream, Your Platform
          </span>
        </h1>

        <button
          className="bg-white flex items-center justify-center px-8 py-3 border-4 border-blue-600 text-blue-900 rounded-full 
          hover:bg-blue-600 hover:text-white 
          transition duration-300 transform 
          hover:scale-105 shadow-lg shadow-blue-500/50 
          focus:ring-3 focus:ring-blue-300 focus:outline-none"
          aria-label="Get Started with StreamForge"
          onClick={handleGetStartedClick}
        >
          <span className="flex items-center">
            Get Started
            <FaArrowRight className="ml-2" /> {/* Arrow icon */}
          </span>
        </button>
      </div>

      <div className="relative w-full h-screen">
        {/* Parallax Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full parallax-1"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-500 rounded-full parallax-2"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-pink-500 rounded-full parallax-3"></div>

        {/* Foreground Content */}
        <div className="relative z-10 p-12 text-white">
          <h1 className="text-5xl font-bold text-center">
            Welcome to the Future of Live Streaming
          </h1>
          <p className="mt-4 text-lg text-center">
            Scroll down for better experience.
          </p>
        </div>
      </div>

      <div className="h-screen bg[24 9.8% 10%] text-white relative overflow-hidden">
        <h2 className="text-6xl pt-24 font-extrabold text-center z-10 relative">
          Engage with Your Audience
        </h2>
        <p className="mt-6 text-center text-xl max-w-3xl mx-auto z-10 relative">
          Take your live streaming to the next level with interactive features
          and seamless broadcasting. Keep your audience engaged with real-time
          chats, polls, and instant feedback mechanisms.
        </p>

        <div className="mt-10 text-lg text-gray-300 max-w-4xl mx-auto text-center">
          <p>
            Leverage the power of live interaction to create memorable
            experiences. Whether you are streaming a concert, a gaming session,
            or a corporate event, the right tools can transform passive viewers
            into active participants.
          </p>
          <p className="mt-4">
            Implement features such as on-screen questions, live reactions, and
            shoutouts to create a unique bond with your audience. Elevate your
            streaming game and make every event an engaging experience that
            keeps viewers coming back for more.
          </p>
        </div>

        {/* Live Streaming Themed 3D Moving Elements */}
        {/* Camera Icon */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full flex justify-center items-center animate-camera-move transform-gpu">
          <i className="fas fa-video text-white text-4xl"></i>
        </div>

        {/* Microphone Icon */}
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-gradient-to-b from-green-500 to-teal-500 rounded-full flex justify-center items-center animate-mic-bounce transform-gpu">
          <i className="fas fa-microphone-alt text-white text-3xl"></i>
        </div>

        {/* Signal Wave */}
        <div className="absolute bottom-16 left-1/5 w-32 h-32 bg-gradient-to-tr from-pink-400 to-red-500 rounded-full flex justify-center items-center animate-signal-wave transform-gpu">
          <i className="fas fa-signal text-white text-4xl"></i>
        </div>

        {/* Play Button */}
        <div className="absolute bottom-1/6 right-1/4 w-28 h-28 bg-gradient-to-tl from-yellow-500 to-orange-500 rounded-full flex justify-center items-center animate-camera-move transform-gpu">
          <i className="fas fa-play text-white text-4xl"></i>
        </div>
      </div>

      {/* Monetize Your Stream  */}
      <div className="h-screen bg[24 9.8% 10%] text-white relative overflow-hidden">
        {/* Title */}
        <h2 className="text-6xl font-extrabold pt-24 text-center text-gray-100">
          Monetize Your Stream
        </h2>

        {/* Description */}
        <p className="mt-4 text-center text-2xl max-w-3xl mx-auto text-gray-300">
          Unlock new revenue streams and engage with your viewers like never
          before.
        </p>

        {/* Feature Explanation */}
        <div className="mt-10 text-lg text-gray-400 max-w-4xl mx-auto text-center">
          <p>
            Live streaming offers numerous monetization options—from ad
            placements to paid subscriptions and viewer donations. It allows
            creators to connect with their audience while generating income
            directly from the stream.
          </p>
          <p className="mt-4">
            Our platform provides seamless integration for ads, donation
            buttons, and paid content, enabling you to focus on creating content
            while growing your revenue. Start turning your live broadcasts into
            business opportunities today.
          </p>
        </div>

        {/* Moving Elements */}
        <div className="absolute left-10 top-1/2 transform -translate-y-1/2 animate-pulse">
          <div className="bg-indigo-500 rounded-full w-16 h-16 opacity-75"></div>
        </div>
        <div className="absolute right-10 top-1/3 transform -translate-y-1/2 animate-bounce">
          <div className="bg-teal-500 rounded-full w-10 h-10 opacity-50"></div>
        </div>
        <div className="absolute left-1/3 bottom-10 transform -translate-x-1/ animate-pulse">
          <div className="bg-yellow-400 rounded-full w-14 h-14 opacity-50"></div>
        </div>

        {/* Camera and Mic Icon */}
        <div className="absolute right-1/4 bottom-1/3 transform rotate-12 animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-200 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v14m7-7H5"
            />
          </svg>
        </div>
      </div>

      {/* Video and Live Streaming Info Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between mt-16 px-8 lg:px-16 gap-8">
        {/* Video on the left */}
        <div className="flex-1 w-full lg:w-1/2">
          <video
            src="/live.mp4"
            controls
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ maxWidth: "100%" }}
          ></video>
        </div>

        {/* Live streaming brief on the right */}
        <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center items-start text-left">
          <h2 className="text-4xl font-bold mb-4">
            Live Streaming with StreamForge
          </h2>
          <p className="text-lg mb-4">
            StreamForge empowers you to easily start your live stream, engage
            with your audience, and record your sessions effortlessly. Whether
            you are a new streamer or an experienced one, our platform offers
            seamless tools to take your streaming experience to the next level.
          </p>
          <p className="text-lg">
            Get started today and become part of a growing community of
            streamers. StreamForge is designed for creators like you who want
            flexibility, simplicity, and high performance.
          </p>
        </div>
      </section>

      {/* Below the existing video section */}

      {/* Cards Section */}
      {showCards && (
        <div
          id="cards-section"
          className="tilt-card shadow-md rounded-lg p-4 flex justify-center space-x-4 w-full mt-8 px-4 transition-opacity duration-500"
        >
          <div className="card bg(0 0% 9%) rounded-lg shadow-lg glow-card w-1/2 h-[70vh] p-8 flex flex-col items-center justify-center">
            <h2 className="card-title text-4xl mb-4">Record Your Stream</h2>
            <p className="card-text text-lg ">
              Connect with streamers and record the fun!
            </p>
            <button
              className="button mt-4 px-6 py-3 text-lg font-extrabold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg relative overflow-hidden group"
              onClick={handleStartLiveStream} // Update to use navigation function
            >
              <span className="relative z-10">Record Now</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 transform group-hover:scale-110"></span>
            </button>
          </div>
          <div className="card bg(0 0% 9%) rounded-lg shadow-lg glow-card w-1/2 h-[70vh] p-8 flex flex-col items-center justify-center">
            <h2 className="card-title text-4xl mb-4">Start Your Live Stream</h2>
            <p className="card-text text-lg">
              Begin your streaming journey with StreamForge.
            </p>
            <button className="button mt-4 px-6 py-3 text-lg font-extrabold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg relative overflow-hidden group">
              <span className="relative z-10">Start Live! 🔴</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 transform group-hover:scale-110"></span>
            </button>
          </div>
        </div>
      )}

      {/* Sign-In Popup */}
      {popupVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${margindo} bg-black bg-opacity-50`}
        >
          <div
            className={`bg-white rounded-lg p-8 shadow-lg transform transition-all duration-200 ${
              showPopup ? "animate-fade-in" : "animate-fade-out"
            } glow-popup`}
          >
            {user ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold ">{welcomeMessage}</h2>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
                <p className="mb-4">Please sign in to continue.</p>
                <button
                  onClick={handleSignIn}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  <FaGoogle className="mr-2" />
                  Sign In with Google
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
