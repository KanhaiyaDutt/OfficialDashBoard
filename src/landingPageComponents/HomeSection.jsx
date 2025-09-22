import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FiMapPin, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

// 1. Accept the 't' function as a prop to enable translations
export default function CombinedHeroSection({ t }) {
  
  // blob configurations and styling 
  const blobConfigurations = [
    { classes: 'w-[650px] h-[650px] top-[-10%] left-[-15%] opacity-80', color: '#cfe0ff' },
    { classes: 'w-[700px] h-[700px] top-[10%] right-[-20%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[550px] h-[550px] bottom-[-20%] left-[10%] opacity-70', color: '#dff7ee' },
    { classes: 'w-[500px] h-[500px] top-[30%] left-[20%] opacity-60', color: '#e9e4ff' },
    { classes: 'w-[600px] h-[600px] top-[5%] left-[50%] opacity-70', color: '#cfe0ff' },
    { classes: 'w-[300px] h-[300px] top-[50%] right-[5%] opacity-80', color: '#f1ddff' },
    { classes: 'w-[350px] h-[350px] bottom-[10%] right-[30%] opacity-70', color: '#dff7ee' },
    { classes: 'w-[280px] h-[280px] top-[25%] left-[60%] opacity-80', color: '#e9e4ff' },
    { classes: 'w-[160px] h-[160px] top-[40%] left-[10%] opacity-90', color: '#cfe0ff' },
    { classes: 'w-[200px] h-[200px] bottom-[5%] left-[40%] opacity-90', color: '#f1ddff' },
    { classes: 'w-[140px] h-[140px] top-[-2%] right-[10%] opacity-80', color: '#dff7ee' },
    { classes: 'w-[240px] h-[240px] top-[70%] right-[15%] opacity-70', color: '#e9e4ff' },
    { classes: 'w-[180px] h-[180px] top-[15%] left-[5%] opacity-80', color: '#cfe0ff' },
    { classes: 'w-[220px] h-[220px] bottom-[-10%] right-[50%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[120px] h-[120px] top-[85%] left-[25%] opacity-90', color: '#dff7ee' },
    { classes: 'w-[210px] h-[210px] top-[60%] left-[75%] opacity-70', color: '#e9e4ff' },
    { classes: 'w-[150px] h-[150px] top-[5%] left-[80%] opacity-90', color: '#cfe0ff' },
    { classes: 'w-[190px] h-[190px] bottom-[25%] left-[-5%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[260px] h-[260px] top-[10%] right-[40%] opacity-60', color: '#dff7ee' },
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="home"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white text-center"
    >
      {/* Background Layer: Blobs and SVG Wave */}
      <div className="absolute inset-0 -z-10">
        {/* Programmatically generated blobs */}
        {blobConfigurations.map((blob, index) => (
          <div
            key={index}
            className={`absolute rounded-full filter blur-xl ${blob.classes}`}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 90%)`,
            }}
          />
        ))}

        {/* Static concentric rings/shadow */}
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",
          }}
        />
        
        {/* SVG Wave at the bottom, layered on top of blobs */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#e9e4ff"
            fillOpacity="1"
            d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Foreground Layer: Your Animated Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* 2. No  't' function for the animated title */}
        <TypeAnimation
          sequence={[
            "Guardians of the Coast", 
            3000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-4 tracking-wide bg-black text-transparent bg-clip-text"
        />

        {/* 3. Use the 't' function for the subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg lg:text-xl text-slate-700 mb-8 max-w-3xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* 4. Use the 't' function for the button text */}
          <motion.a 
            href="#signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white shadow-lg shadow-indigo-500/30 font-bold py-3 px-6 rounded-lg text-base lg:text-lg"
          >
            <FiSend className="mr-2" /> {t('hero.reportButton')}
          </motion.a>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-0.5 w-full sm:w-auto rounded-lg bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a]"
          >
            <a 
              href="#dashboard" 
              className="flex items-center justify-center w-full bg-gray-100 text-gray-800 hover:bg-transparent hover:text-white font-bold py-3 px-6 rounded-md text-base lg:text-lg transition-colors duration-300"
            >
              <FiMapPin className="mr-2" /> {t('hero.mapButton')}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}