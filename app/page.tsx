// /client/pages/HomePage.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import Navbar from "./components/Navbar";
import "./globals.css";
import { FaArrowRight, FaGoogle } from "react-icons/fa";
import { auth } from "./firebaseConfig";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import Contact from "./contact/page";
import LottieAnimation from './components/LottieAnimation';

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showCards, setShowCards] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [overflow, setOverflow] = useState("hidden");

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        const userName = currentUser.displayName || currentUser.email;
        const isNewUser =
          currentUser.metadata.creationTime ===
          currentUser.metadata.lastSignInTime;
        setWelcomeMessage(
          isNewUser ? `Hello, ${userName}` : `Welcome back, ${userName}`
        );
        setPopupVisible(false);
        setShowPopup(true);

        // Automatically hide the popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
          setTimeout(() => setPopupVisible(false), 500);
        }, 1000);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle the "Get Started" button click
  const handleGetStartedClick = () => {
    console.log("Get Started clicked", user); // Add this line
    if (!user) {
      setPopupVisible(true);
      setShowPopup(true);
    } else {
      setShowCards(true);
      setOverflow("auto");
      setTimeout(() => {
        const cardsSection = document.getElementById("cards-section");
        if (cardsSection) {
          cardsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Handle sign in with Google
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
        alert("Sign-in failed! Please try again.");
      });
  };

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle recorded stream and live stream button clicks
  const handleStreamAction = (path: string, alertMessage: string) => {
    if (user) {
      window.open(path);
    } else {
      alert(alertMessage);
      setPopupVisible(true);
      setShowPopup(true);
    }
  };

  return (
    <div className={` h-screen overflow-y-auto text-white hide-scrollbar `}>
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div>
          {/* Centered content */}
          <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-dark-pattern relative overflow-hidden">
            <h1 className="text-5xl font-extrabold mb-8 tracking-wide transition-transform duration-300 transform hover:scale-110">
              <p className="streamforge text-8xl font-extrabold transition-transform duration-300 transform hover:scale-100">
                <span className="relative title-light">StreamForge</span>
              </p>
              <span className="text-2xl mt-4 block">
                Your Way, Your Stream, Your Platform
              </span>
            </h1>

            <button
              className="bg-white flex items-center justify-center px-8 py-3 border-4 border-blue-600 text-blue-900 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50 focus:ring-3 focus:ring-blue-300 focus:outline-none"
              aria-label="Get Started with StreamForge"
              onClick={handleGetStartedClick}
            >
              <span className="flex items-center">
                Get Started
                <FaArrowRight className="ml-2" />
              </span>
            </button>

            {/* Glowing Line Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent h-0.5 w-full animate-glow-line"></div>
          </div>

          {/* Cards Section */}
          {showCards && (
            <div
              id="cards-section"
              className="tilt-card shadow-md rounded-lg p-14 flex justify-center space-x-4 w-full mt-10 mb-16 transition-opacity duration-500"
            >
              <div className="card bg(0 0% 9%) rounded-lg shadow-lg glow-card w-1/2 h-[70vh] p-8 flex flex-col items-center justify-center">
                <h2 className="card-title text-4xl mb-4">Record Your Stream</h2>
                <p className="card-text text-lg">
                  Connect with streamers and record the fun!
                </p>
                <button
                  className="relative mt-4 px-6 py-3 text-lg font-semibold text-[rgb(71,171,248)] border-2 border-[rgb(46,136,254)] rounded-full bg-transparent transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden group hover:text-[#212121] hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100"
                  onClick={() =>
                    handleStreamAction(
                      "/recordstreampage",
                      "Please sign in to start a recording."
                    )
                  }
                >
                  Record Now
                  <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[rgb(200,226,255)] scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[4] -z-10"></span>
                </button>
              </div>
              <div className="card bg(0 0% 9%) rounded-lg shadow-lg glow-card w-1/2 h-[70vh] p-8 flex flex-col items-center justify-center">
                <h2 className="card-title text-4xl mb-4">
                  Start Your Live Stream
                </h2>
                <p className="card-text text-lg">
                  Begin your streaming journey with StreamForge.
                </p>
                <button
                  className="relative mt-4 px-6 py-3 text-lg font-semibold text-[rgb(71,171,248)] border-2 border-[rgb(46,136,254)] rounded-full bg-transparent transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden group hover:text-[#212121] hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100"
                  onClick={() =>
                    handleStreamAction(
                      "/LivePage",
                      "Please sign in to start a live stream."
                    )
                  }
                >
                  Start Live!
                  <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[rgb(200,226,255)] scale-0 transition-all duration-[0.6s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[4] -z-10"></span>
                </button>
              </div>
            </div>
          )}

          {/* Parallax and remaining sections */}
          <div className="relative w-full h-screen">
            {/* Parallax Background Elements */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500 rounded-full parallax-1 animate-mic-bounce transform-gpu"></div>
            <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-500 rounded-full parallax-2 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-pink-500 rounded-full parallax-3 animate-pulse"></div>
            <div className="absolute bottom-1/6 right-1/4 w-28 h-28 bg-gradient-to-tl from-pink-500 to-orange-500 rounded-full flex justify-center items-center animate-camera-move transform-gpu"></div>
            <div className="absolute bottom-1 right-28 w-48 h-48 bg-gradient-to-tl from-blue-500 to-green-500 rounded-full flex justify-center items-center animate-camera-move transform-gpu"></div>
            {/* <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-tl from-pink-600 to-purple-600 rounded-full flex justify-center items-center animate-mic-bounce transform-gpu"></div> */}

            {/* Foreground Content */}
            <div className="relative z-10 p-5 text-white text-center">
              <h1 className="text-6xl  pt-24 font-extrabold text-center z-10 relative">
                 The Future of Live Streaming
              </h1>
              {/* <p className="mt-4 text-lg md:text-xl font-semibold tracking-wider text-gray-300">
                Where creativity meets technology. Stream live like never
                before!
              </p> */}
              <p className="mt-6 text-lg md:text-1xl text-center max-w-2xl mx-auto tracking-wide">
                StreamForge empowers creators with high-quality live streaming
                tools, dynamic interactive features, and a supportive community.
                Elevate your streaming experience and connect with your audience
                like never before.
              </p>
              <LottieAnimation />
             
            </div>
          </div>

          <div className="h-screen bg[24 9.8% 10% mt-8 text-white relative overflow-hidden">
            <h2 className="text-6xl pt-24 font-extrabold text-center z-10 relative">
              Engage with Your Audience
            </h2>
            <p className="mt-6 text-center text-xl max-w-3xl mx-auto z-10 relative">
              Take your live streaming to the next level with interactive
              features and seamless broadcasting. Keep your audience engaged
              with real-time chats, polls, and instant feedback mechanisms.
            </p>

            <div className="mt-10 text-lg text-gray-300 max-w-4xl mx-auto text-center">
              <p>
                Leverage the power of live interaction to create memorable
                experiences. Whether you are streaming a concert, a gaming
                session, or a corporate event, the right tools can transform
                passive viewers into active participants.
              </p>
              <p className="mt-4">
                Implement features such as on-screen questions, live reactions,
                and shoutouts to create a unique bond with your audience.
                Elevate your streaming game and make every event an engaging
                experience that keeps viewers coming back for more.
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
          <div className="h-screen mt-8 bg[24 9.8% 10%] text-white relative overflow-hidden">
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
                buttons, and paid content, enabling you to focus on creating
                content while growing your revenue. Start turning your live
                broadcasts into business opportunities today.
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
                StreamForge empowers you to easily start your live stream,
                engage with your audience, and record your sessions
                effortlessly. Whether you are a new streamer or an experienced
                one, our platform offers seamless tools to take your streaming
                experience to the next level.
              </p>
              <p className="text-lg">
                Get started today and become part of a growing community of
                streamers. StreamForge is designed for creators like you who
                want flexibility, simplicity, and high performance.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <div>
            <Contact />
          </div>
        </div>
      )}

      {/* Google Sign-in Popup */}
      {!user && popupVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            showPopup ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="popup bg-white rounded-lg shadow-lg p-8 w-80 max-w-full text-center flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Get Started
            </h2>
            <p className="text-gray-700 mb-6">
              Sign in with Google to begin your journey on StreamForge.
            </p>
            <button
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleSignIn}
            >
              <FaGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      )}

      {/* Welcome Popup */}
      {user && (
        <div
          className={`fixed top-0 w-full p-4 text-center bg-blue-600 text-white rounded-b-lg transition-transform duration-500 transform ${
            showPopup ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <p>{welcomeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
