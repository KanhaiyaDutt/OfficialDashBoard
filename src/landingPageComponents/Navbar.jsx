import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../assets/logo.png';

export default function Navbar({ t, i18n, changeLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Array for all supported languages
  const languages = [
    // International Languages
    { code: 'en', name: 'English' },
    { code: 'ml', name: 'മലയാളം' },
{ code: 'or', name: 'ଓଡ଼ିଆ' },
{ code: 'kok', name: 'कोंकणी' },
{ code: 'ur', name: 'اردو', dir: 'rtl' },
{ code: 'sd', name: 'سنڌي', dir: 'rtl' },
{ code: 'as', name: 'অসমীয়া' },
{ code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    // Indian Languages
    { code: 'hi', name: 'हिन्दी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const handleSectionScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleSectionScroll);
    return () => window.removeEventListener("scroll", handleSectionScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { id: "home" },
    { id: "about" },
    { id: "services" },
    { id: "contact" },
  ];

  const authItems = [
    { id: "signIn", path: "/signin" },
    { id: "signUp", path: "/signup" },
  ];

  const mobileMenuVariants = {
    open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { opacity: 0, y: "-100%", transition: { when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } }
  };
  
  const mobileLinkVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -20, opacity: 0 }
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setIsLangOpen(false);
    // Set document direction for RTL languages like Arabic
    const selectedLang = languages.find(l => l.code === lng);
    document.documentElement.dir = selectedLang?.dir || 'ltr';
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-['Noto_Sans'] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-gray-700">
        <a href="/#home" className="flex items-center hover:scale-110 transition-transform">
          <img src={Logo} alt={t('navbar.logoAlt')} className="max-h-10 h-auto object-contain" />
        </a>

        {/* Desktop Menu: Main Links (Center) */}
        <ul className="hidden lg:flex gap-8 text-lg">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a href={`/#${item.id}`} className={`transition font-medium ${activeSection === item.id ? "text-[#0d47a1]" : "hover:text-[#0d47a1]"}`}>
                {t(`navbar.${item.id}`)}
              </a>
              {activeSection === item.id && (
                <motion.div
                  className="absolute w-full left-0 -bottom-2 h-1 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] rounded-full"
                  layoutId="active-underline"
                />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Menu: Auth Links & Language Switcher (Right) */}
        <div className="hidden lg:flex items-center gap-6 text-lg">
          {authItems.map((item) => (
            item.id === 'signUp' ? (
              <Link
                key={item.id}
                to={item.path}
                className="px-5 py-2 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/60"
              >
                {t(`navbar.${item.id}`)}
              </Link>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                className="transition font-medium hover:text-[#0d47a1]"
              >
                {t(`navbar.${item.id}`)}
              </Link>
            )
          ))}

          {/* Language Switcher Dropdown */}
          <div ref={langDropdownRef} className="relative border-l border-gray-300 pl-4 ml-4">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-600 font-medium rounded hover:bg-gray-100 transition-colors"
            >
              <span>{i18n.language.split('-')[0].toUpperCase()}</span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-40 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5"
                >
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm ${i18n.language === lang.code ? 'bg-[#0d47a1] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="lg:hidden text-gray-800 hover:scale-110 transition-transform" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg"
            variants={mobileMenuVariants} initial="closed" animate="open" exit="closed"
          >
            <ul className="flex flex-col items-center gap-6 py-8 text-lg text-gray-700">
              {navItems.map((item) => (
                <motion.li key={item.id} variants={mobileLinkVariants}>
                  <a 
                    href={`/#${item.id}`} 
                    className={`transition font-medium ${activeSection === item.id ? "text-[#0d47a1]" : "hover:text-[#0d47a1]"}`} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t(`navbar.${item.id}`)}
                  </a>
                </motion.li>
              ))}
              {authItems.map((item) => (
                <motion.li key={item.id} variants={mobileLinkVariants}>
                  <Link 
                    to={item.path} 
                    className={`transition font-medium hover:text-[#0d47a1]`} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t(`navbar.${item.id}`)}
                  </Link>
                </motion.li>
              ))}
              
              <motion.li ref={langDropdownRef} variants={mobileLinkVariants} className="w-full text-center pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center justify-center w-full gap-2 font-medium py-2"
                >
                  <span>Language</span>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="flex flex-col items-center gap-2 mt-2 max-h-48 overflow-y-auto w-full">
                    {languages.map((lang) => (
                       <button 
                        key={lang.code}
                        onClick={() => { handleLanguageChange(lang.code); setIsOpen(false); }} 
                        className={`px-4 py-2 text-base rounded w-3/4 ${i18n.language === lang.code ? 'font-bold bg-indigo-50 text-[#0d47a1]' : 'text-gray-600'}`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}