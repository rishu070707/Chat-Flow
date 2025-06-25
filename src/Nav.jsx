import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -4, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <header className="bg-black text-white px-8 py-4 shadow-md w-full">
      <nav className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={floatingAnimation}
            className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </motion.div>
          <motion.h1
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
              backgroundSize: ['200% 200%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #6366f1)',
              backgroundSize: '200% 200%'
            }}
          >
            ChatFlow
          </motion.h1>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-6">
          <motion.button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
          >
            Get Started
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;