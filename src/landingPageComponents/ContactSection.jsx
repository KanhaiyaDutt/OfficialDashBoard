import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiGlobe, FiSend } from 'react-icons/fi';

// 1. Component now accepts the 't' prop for translations
const ContactSection = ({ t }) => {
  // Styling configurations are preserved
  const blobConfigurations = [
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

  // 2. 'agencies' array is now built using the 't' function
  const agencies = [
    { name: t('contact.agencies.incois.name'), relevance: t('contact.agencies.incois.relevance'), phone: "+91-40-23895000", email: "director@incois.gov.in", website: "https://www.incois.gov.in/" },
    { name: t('contact.agencies.ndma.name'), relevance: t('contact.agencies.ndma.relevance'), helpline: "1078 (Toll-Free)", email: "controlroom@ndma.gov.in", website: "https://ndma.gov.in/" },
    { name: t('contact.agencies.imd.name'), relevance: t('contact.agencies.imd.relevance'), phone: "+91-11-24611068", website: "https://mausam.imd.gov.in/" },
    { name: t('contact.agencies.icg.name'), relevance: t('contact.agencies.icg.relevance'), helpline: "1554 (Toll-Free)", website: "https://indiancoastguard.gov.in/" }
  ];

  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const interactiveCardAnimation = {
    scale: 1.03,
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <section 
      id="contact" 
      className="relative isolate text-gray-800 py-24 px-4 overflow-hidden bg-gray-50"
    >
      <div className="absolute inset-0 -z-10 w-full h-full">
        {blobConfigurations.map((blob, index) => (
          <div
            key={index}
            className={`absolute filter blur-2xl rounded-full ${blob.classes}`}
            style={{ background: `radial-gradient(circle, ${blob.color} 0%, transparent 80%)` }}
          />
        ))}
        <svg
          className="absolute top-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#e9e4ff" 
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,133.3C672,117,768,139,864,165.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Contact Form */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 shadow-xl"
            initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants} whileHover={interactiveCardAnimation}
          >
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-transparent bg-clip-text">{t('contact.formTitle')}</h3>
            <form className="space-y-6">
              <input type="text" placeholder={t('contact.formNamePlaceholder')} className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              <input type="email" placeholder={t('contact.formEmailPlaceholder')} className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
              <textarea placeholder={t('contact.formMessagePlaceholder')} rows="5" className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"></textarea>
              <button type="submit" className="w-full flex items-center justify-center font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white hover:scale-105 shadow-lg hover:shadow-indigo-500/40">
                {t('contact.formSubmitButton')} <FiSend className="ml-2" />
              </button>
            </form>
          </motion.div>
          
          {/* Right Column: Agency List */}
          <div className="space-y-8">
            {agencies.map((agency, index) => (
              <motion.div 
                key={agency.name}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
                initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants} transition={{ delay: index * 0.1 }} whileHover={interactiveCardAnimation}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">{agency.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{agency.relevance}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  {agency.phone && <a href={`tel:${agency.phone}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium"><FiPhone className="mr-2"/>{agency.phone}</a>}
                  {agency.helpline && <span className="flex items-center text-blue-600 font-medium"><FiPhone className="mr-2"/>{agency.helpline}</span>}
                  {agency.email && <a href={`mailto:${agency.email}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium"><FiMail className="mr-2"/>{t('contact.emailLinkText')}</a>}
                  {agency.website && <a href={agency.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 font-medium"><FiGlobe className="mr-2"/>{t('contact.websiteLinkText')}</a>}
                </div>
              </motion.div>
            ))}
            
            {/* State Agencies Card */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg"
              initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants} whileHover={interactiveCardAnimation}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t('contact.sdmaTitle')}</h4>
              <p className="text-gray-600">{t('contact.sdmaDescription')}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;