import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { MessageCircle } from 'lucide-react'; // Import the icon

const Navbar = () => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -4, 0], // Slightly less aggressive floating for a smaller element
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <header className="bg-black text-white px-8 py-4 shadow-md w-full">
      <nav className="flex items-center justify-between w-full"> {/* Changed justify-end to justify-between */}
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={floatingAnimation}
            className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg" // Smaller padding and rounded corners
          >
            <MessageCircle className="w-5 h-5 text-white" /> {/* Smaller icon size */}
          </motion.div>
          <motion.h1
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent" // Adjusted font size
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ChatFlow
          </motion.h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-6">
          {/* Add other navigation links here if needed */}
          {/* <Link to="/about" className="hover:text-gray-300">About</Link> */}
          {/* <Link to="/contact" className="hover:text-gray-300">Contact</Link> */}

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded " onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;