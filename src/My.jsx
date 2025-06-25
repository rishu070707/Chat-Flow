import React, { useRef } from 'react';
import video from './130940-748595980_medium.mp4';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
function My() {
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  return (
      <div className="min-h-screen bg-brand-gradient">
   

      {/* Hero Section */}
      <section className="min-h-screen bg-brand-gradient flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 w-full text-center lg:text-left"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 text-white font-serif">
                Express Your {''}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 block sm:inline mt-2 sm:mt-0">
                  Thoughts
                </span>
              </h1>

              <div className="mb-8">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-500">
                  Feel Free to talk
                </p>
                
              </div>
<div className="flex flex-col items-center justify-center mt-6 sm:mt-8">
  <button
    className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 text-blue-100 font-semibold rounded-full sm:rounded-2xl transition-all duration-300 hover:bg-blue-50 hover:scale-105 text-center hover:text-black"
    onClick={() => navigate('./login')}
  >
    Start Journey
  </button>
</div>

            </motion.div>

            {/* Right: Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 w-full max-w-xl lg:max-w-none mt-8 lg:mt-0"
            >
              <div className="relative group">
                <div className="absolute -inset-2 sm:inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <video
                  className="relative w-full rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl border border-white/20"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
  );
}

export default My;
