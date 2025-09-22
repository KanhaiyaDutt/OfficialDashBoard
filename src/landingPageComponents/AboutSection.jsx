import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiMap, FiMessageSquare, FiSmartphone, FiArrowRight } from 'react-icons/fi';

// Component accepts the 't' prop for translations
const SuperInteractiveAbout = ({ t }) => {
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

  const features = [
    { icon: <FiUsers size={28} className="text-[#0d47a1]" />, ...t('about.solution.features.0', { returnObjects: true }) },
    { icon: <FiMap size={28} className="text-[#0d47a1]" />, ...t('about.solution.features.1', { returnObjects: true }) },
    { icon: <FiMessageSquare size={28} className="text-[#0d47a1]" />, ...t('about.solution.features.2', { returnObjects: true }) },
    { icon: <FiSmartphone size={28} className="text-[#0d47a1]" />, ...t('about.solution.features.3', { returnObjects: true }) }
  ];

  // Animation variant for single cards (Problem, Impact)
  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.4, duration: 1.2 }
    }
  };
  
  // Animation variant for the container of the feature cards to enable staggering
  const featureContainerVariants = {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  // Animation variant for individual feature cards
  const featureItemVariants = {
    offscreen: { opacity: 0, x: -30 },
    onscreen: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  // Shared hover animation for all interactive cards
  const interactiveCardAnimation = {
    scale: 1.03,
    boxShadow: "0px 15px 30px -5px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <section 
      id="about" 
      className="relative isolate text-gray-800 py-24 px-4 overflow-hidden bg-gray-50"
    >
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        {/* Top Wave */}
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e9e4ff" fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>

        {/* Animated Blobs */}
        {blobConfigurations.map((blob, index) => (
          <div
            key={index}
            className={`absolute filter blur-2xl rounded-full ${blob.classes}`}
            style={{ background: `radial-gradient(circle, ${blob.color} 0%, transparent 80%)` }}
          />
        ))}
        
        {/* Bottom Wave */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e9e4ff" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,186.7C384,171,480,149,576,154.7C672,160,768,192,864,218.7C960,245,1056,267,1152,256C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* CONTENT */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          >
            {t('about.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            className="text-lg md:text-xl text-gray-600"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16 mb-20">
          {/* PROBLEM CARD */}
          <div className="lg:sticky top-24 h-fit">
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-200"
              initial="offscreen" whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
              whileHover={interactiveCardAnimation}
            >
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-transparent bg-clip-text inline-block">{t('about.problem.title')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('about.problem.description')}
              </p>
            </motion.div>
          </div>

          {/* SOLUTION & FEATURES CARDS */}
          <motion.div 
            className="space-y-8 mt-12 lg:mt-0"
            initial="offscreen" whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureContainerVariants}
          >
            <h3 className="text-3xl font-bold mb-4 text-center lg:text-left">{t('about.solution.title')}</h3>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl flex items-start space-x-4 border border-gray-200 shadow-lg"
                variants={featureItemVariants} 
                whileHover={interactiveCardAnimation}
              >
                <div className="bg-blue-50 p-4 rounded-full mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* IMPACT CARD */}
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
        >
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-200"
            whileHover={interactiveCardAnimation}
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-transparent bg-clip-text inline-block">{t('about.impact.title')}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('about.impact.description')}
            </p>
          </motion.div>
        </motion.div>

        {/* CALL TO ACTION BUTTON */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.a
            href="#dashboard"
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px -5px rgba(76, 10, 150, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-xl font-semibold px-8 py-4 rounded-full bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white shadow-lg"
          >
            {t('about.ctaButton')} <FiArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuperInteractiveAbout;