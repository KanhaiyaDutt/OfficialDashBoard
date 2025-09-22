import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const Toggle = ({ isBgBlack, toggleBackground }) => {
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div
      onClick={toggleBackground}
      className={`flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-500 ${
        isBgBlack ? 'bg-gray-800/80 justify-end' : 'bg-gray-200/80 justify-start'
      }`}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        layout
        transition={spring}
      >
        {isBgBlack ? <FiMoon size={14} className="text-gray-800" /> : <FiSun size={14} className="text-yellow-500" />}
      </motion.div>
    </div>
  );
};

export default Toggle;