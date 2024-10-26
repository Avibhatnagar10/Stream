import React, { useEffect, useState } from "react";

const Loader = () => {
  


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-12 h-12 mx-auto">
        {/* Shadow element */}
        <div
          className="absolute top-14 left-0 w-12 h-1.5 bg-[#f0808050] rounded-full animate-shadow324"
        ></div>

        {/* Jumping box */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#f08080] rounded-sm animate-jump7456"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
