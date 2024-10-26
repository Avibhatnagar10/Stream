// components/Loader.js
const Loader = () => {
    return (
      <div className="h-1 bg-gray-800 relative overflow-hidden w-72">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/14 via-black/14"></div>
        <div className="absolute h-full w-20 bg-gradient-to-r from-transparent cyan-400 via-cyan-400 to-transparent animate-loader"></div>
      </div>
    );
  };
  
  export default Loader;
  