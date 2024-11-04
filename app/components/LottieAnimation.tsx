"use client"; // Necessary if using Next.js 13 with React Server Components

import Lottie from 'react-lottie';
import { useEffect, useState } from 'react';

const Animater = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation data from the public folder
    fetch('/animation2.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error loading animation:', error));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Include animationData here
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="relative mt-5 h-screen z-1 p-1 text-white text-center">
      {animationData ? (
        <div className="absolute top-0 left-0 w-full h-full">
          <Lottie
            options={defaultOptions}
            height={400}
            width={500}
          />
        </div>
      ) : (
        <p>Loading animation...</p> // Show a loading message until the animation is ready
      )}
    </div>
  );
};

export default Animater;
