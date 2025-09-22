import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSmartphone, FiGrid, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

// Component accepts the 't' prop for translations
const InteractiveServicesSection = ({ t }) => {
  const blobConfigurations = [
    // ... (blob configuration array remains the same)
    { classes: 'w-[600px] h-[600px] top-[-5%] left-[-10%] opacity-60', color: '#cfe0ff' },
    { classes: 'w-[700px] h-[700px] top-[20%] right-[-15%] opacity-50', color: '#f1ddff' },
    { classes: 'w-[600px] h-[600px] bottom-[-15%] left-[5%] opacity-50', color: '#dff7ee' },
    { classes: 'w-[400px] h-[400px] top-[5%] right-[15%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[350px] h-[350px] top-[45%] left-[30%] opacity-40', color: '#cfe0ff' },
    { classes: 'w-[450px] h-[450px] bottom-[5%] right-[10%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[200px] h-[200px] top-[15%] left-[40%] opacity-50', color: '#dff7ee' },
    { classes: 'w-[250px] h-[250px] top-[70%] left-[50%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[220px] h-[220px] bottom-[20%] left-[25%] opacity-50', color: '#cfe0ff' },
    { classes: 'w-[180px] h-[180px] top-[25%] right-[35%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[300px] h-[300px] bottom-[5%] right-[40%] opacity-40', color: '#cfe0ff' },
    { classes: 'w-[250px] h-[250px] top-[-10%] right-[30%] opacity-50', color: '#f1ddff' },
    { classes: 'w-[200px] h-[200px] bottom-[-5%] left-[45%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[150px] h-[150px] top-[50%] left-[5%] opacity-70', color: '#cfe0ff' },
    { classes: 'w-[280px] h-[280px] top-[80%] right-[20%] opacity-50', color: '#f1ddff' },
    { classes: 'w-[190px] h-[190px] top-[5%] left-[15%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[210px] h-[210px] bottom-[30%] right-[-5%] opacity-70', color: '#cfe0ff' },
    { classes: 'w-[260px] h-[260px] top-[60%] left-[70%] opacity-50', color: '#f1ddff' },
    { classes: 'w-[180px] h-[180px] top-[90%] left-[30%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[240px] h-[240px] top-[35%] left-[5%] opacity-50', color: '#cfe0ff' },
    { classes: 'w-[200px] h-[200px] top-[-5%] left-[50%] opacity-60', color: '#f1ddff' },
    { classes: 'w-[300px] h-[300px] bottom-[40%] right-[25%] opacity-40', color: '#dff7ee' },
    { classes: 'w-[150px] h-[150px] top-[75%] left-[15%] opacity-70', color: '#cfe0ff' },
    { classes: 'w-[250px] h-[250px] top-[55%] right-[45%] opacity-50', color: '#f1ddff' },
    { classes: 'w-[220px] h-[220px] bottom-[15%] left-[65%] opacity-60', color: '#dff7ee' },
    { classes: 'w-[190px] h-[190px] top-[40%] right-[5%] opacity-70', color: '#cfe0ff' },
  ];
  const [activeTab, setActiveTab] = useState('citizens');

  const servicesData = {
    citizens: {
      title: t('services.content.citizens.title'),
      subtitle: t('services.content.citizens.subtitle'),
      icon: <FiSmartphone size={40} className="text-[#0d47a1]" />,
      features: t('services.content.citizens.features', { returnObjects: true }) || [],
    },
    agencies: {
      title: t('services.content.agencies.title'),
      subtitle: t('services.content.agencies.subtitle'),
      icon: <FiGrid size={40} className="text-[#0d47a1]" />,
      features: t('services.content.agencies.features', { returnObjects: true }) || [],
    },
    researchers: {
      title: t('services.content.researchers.title'),
      subtitle: t('services.content.researchers.subtitle'),
      icon: <FiBarChart2 size={40} className="text-[#0d47a1]" />,
      features: t('services.content.researchers.features', { returnObjects: true }) || [],
    }
  };
  
  const selectedService = servicesData[activeTab];

  // Animation variants for staggered list items
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="services" 
      className="relative isolate text-gray-800 py-24 px-4 overflow-hidden bg-gray-50"
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        {blobConfigurations.map((blob, index) => (
          <div
            key={index}
            className={`absolute filter blur-2xl rounded-full ${blob.classes}`}
            style={{
              background: `radial-gradient(circle, ${blob.color} 0%, transparent 80%)`,
            }}
          />
        ))}
        {/* Top wave SVG */}
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e9e4ff" fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
        {/* Bottom wave SVG */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e9e4ff" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,154.7C672,160,768,192,864,218.7C960,245,1056,267,1152,256C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto max-w-6xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
        >
          {t('services.title')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 mb-12"
        >
          {t('services.subtitle')}
        </motion.p>

        {/* Tab Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-2 md:space-x-8 mb-10 border-b border-gray-200"
        >
          {Object.keys(servicesData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative font-semibold px-4 py-3 transition-colors duration-300 ${
                activeTab === key ? 'text-[#0d47a1]' : 'text-gray-500 hover:text-[#0d47a1]'
              }`}
            >
              {t(`services.tabs.${key}`)}
              {activeTab === key && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a]"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // This key is crucial for AnimatePresence to detect changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-200 shadow-xl text-left"
          >
            <div className="flex flex-col md:flex-row items-center text-center md:text-left md:space-x-6 mb-8">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1}} 
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }} 
                className="bg-blue-50 p-4 rounded-full mb-4 md:mb-0 flex-shrink-0"
              >
                {selectedService.icon}
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedService.title}</h3>
                <p className="text-gray-600 mt-1">{selectedService.subtitle}</p>
              </div>
            </div>
            
            <motion.div 
              className="space-y-4"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible" // Re-triggers animation when key changes
            >
              {selectedService.features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start p-2 rounded-lg"
                  variants={listItemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 15 } 
                  }}
                >
                  <FiCheckCircle className="text-[#0d47a1] mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveServicesSection;