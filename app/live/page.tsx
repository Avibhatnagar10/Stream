// components/Sidebar.tsx
"use client";
// components/Sidebar.tsx
import React, { useState } from 'react';
import { FaTachometerAlt, FaMapMarkerAlt, FaUserCog, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar Toggle Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-4 left-4 z-50 p-2 bg-black/70 backdrop-blur-lg text-white rounded-full cursor-pointer hover:bg-gray-700 transition-colors duration-300"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 70, damping: 15 }}
        className={`fixed left-0 top-0 h-full w-64 bg-black/70 backdrop-blur-lg shadow-2xl border-r border-gray-700 flex flex-col justify-between z-40 transform transition-transform duration-500 ease-in-out`}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full justify-between">
          {/* Top Buttons */}
          <div className="mt-8 space-y-6 px-6">
            {/* Dashboard Button */}
            <motion.button
              whileHover={{ scale: 0.65 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4 p-3 hover:bg-black/80 rounded-lg backdrop-blur-md transition-all duration-300"
            >
              <FaTachometerAlt className="text-xl text-white" />
              <span className="text-lg font-semibold">Dashboard</span>
            </motion.button>

            {/* Destination Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4 p-3 hover:bg-black/80 rounded-lg backdrop-blur-md transition-all duration-300"
            >
              <FaMapMarkerAlt className="text-xl text-white" />
              <span className="text-lg font-semibold">Destination</span>
            </motion.button>
          </div>

          {/* Account Settings at Bottom */}
          <div className="mb-8 px-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4 p-3 hover:bg-black/80 rounded-lg backdrop-blur-md transition-all duration-300"
            >
              <FaUserCog className="text-xl text-white" />
              <span className="text-lg font-semibold">Account Settings</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className={`flex-1 transition-all duration-500 p-10 ${
          isOpen ? 'ml-64' : 'ml-0'
        } bg-gradient-to-r from-black to-gray-900`}
        animate={{ opacity: isOpen ? 0.8 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold">Live Streaming Page</h1>
        <p className="mt-2 text-gray-400 text-lg">
          Select an option from the sidebar to manage your live streaming setup.
        </p>
        {/* Add your live streaming components/content here */}
      </motion.div>
      
      {/* Glowing Effect Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-70 animate-glow"></div>
      </div>

      <style jsx>{`
        @keyframes glow {
          0% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }
        .animate-glow {
          animation: glow 3s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;

