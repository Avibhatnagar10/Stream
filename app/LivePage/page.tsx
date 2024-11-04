"use client";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const StreamforgeLanding = () => {
  const router = useRouter();

  useEffect(() => {
    // Placeholder for additional JS logic, if needed
  }, []);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles the stream action button click. Plays a sound effect and navigates
   * to the live stream page after a brief delay to allow the sound to play.
   * @function
   * @since v0.1.0
   */
  /******  785f48fd-d128-4ff4-be24-e9725c97e406  *******/ const handleStreamAction =
    () => {
      // Play sound
      const audio = new Audio("/streamSound.mp3");
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });

      // Navigate to live stream page after a slight delay to allow sound to play
      setTimeout(() => {
        router.push("/livestreampage");
      }, 500); // Adjust the delay as needed
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 items-center justify-center h-screen hide-scrollbar overflow-hidden text-white">
      <Navbar/>
      
      {/* Moving Glowing Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="particle top-1/3 left-1/4 w-48 h-48 bg-purple-700 opacity-30 rounded-full filter blur-2xl animate-particle-float delay-2000" />
        <div className="particle top-1/4 right-1/3 w-56 h-56 bg-blue-500 opacity-30 rounded-full filter blur-3xl animate-particle-float delay-4000" />
        <div className="particle bottom-1/4 left-1/5 w-40 h-40 bg-pink-600 opacity-30 rounded-full filter blur-2xl animate-particle-float delay-6000" />
        <div className="particle bottom-1/3 right-1/4 w-60 h-60 bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-particle-float delay-8000" />
        
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4 space-y-10">
        {/* Heading */}
        <h1 className="text-6xl font-extrabold text-white mb-6 animate-fadeIn tracking-wide text-center">
          StreamForge
        </h1>

        {/* Button */}
        <button
          className="px-5 py-2.5 uppercase rounded-lg text-[17px] font-medium text-white/80 shadow-none border border-white/80 transition-all duration-500 cursor-pointer select-none hover:text-white hover:bg-[#008cff] hover:border-[#008cff] hover:shadow-[0_0_5px_#008cff,0_0_20px_#008cff,0_0_50px_#008cff,0_0_100px_#008cff] hover:text-shadow-[0_0_5px_#ffffff,0_0_10px_#ffffff,0_0_20px_#ffffff]"
          onClick={handleStreamAction}
        >
          Lets Go!
        </button>
        

        {/* Description */}
        <p className="text-center text-gray-300 text-lg max-w-2xl animate-fadeIn mt-6">
          <span className="font-bold text-purple-400">
            Connect with the world
          </span>
          , share unforgettable moments, and experience the power of live
          streaming with <span className="text-blue-400">Streamforge</span>.
          Join a global community, reach viewers everywhere, and make your mark
          with every stream.
        </p>

      </div>
      
    </div>
  );
};

export default StreamforgeLanding;
