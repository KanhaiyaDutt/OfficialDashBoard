import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LayoutDashboard, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from '../assets/logo.png'; 

// Props now include `theme` and `toggleTheme` to manage the dark mode state
export default function DashboardNavbar({ id, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  // Effect to handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to handle closing profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const navItems = [];
  
  const mobileMenuVariants = {
    open: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    closed: { opacity: 0, y: "-100%", transition: { when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } }
  };
  
  const mobileLinkVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -20, opacity: 0 }
  };

  
  
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-['Noto_Sans'] transition-all duration-300 ${
        isScrolled 
          ? `backdrop-blur-sm ${theme === 'dark' ? 'bg-gray-900/95 shadow-black/20' : 'bg-white/95 shadow-md'}`
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center text-gray-700 dark:text-gray-200">
        <Link to={`/dashboard/${id}`} className="flex items-center hover:scale-110 transition-transform">
          <img src={Logo} alt="Logo" className="max-h-10 h-auto object-contain" />
        </Link>

        {/* Desktop Menu: Actions & Profile (Right) */}
        <div className="hidden lg:flex items-center gap-6 text-lg">
          
          {location.pathname.includes !== '/dashboard' && (
            <Link
              to={`/dashboard`}
              className="px-5 py-2 flex items-center gap-2 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/60"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          )}

          {!location.pathname.endsWith('/new-report') && (
            <Link
              to={`/dashboard/new-report`}
              className="px-5 py-2 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/60"
            >
              New Report
            </Link>
          )}
          
          {/* THEME TOGGLE BUTTON - DESKTOP */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          
          {/* Profile Dropdown */}
          <div ref={profileDropdownRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1.5 p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User size={24} />
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10"
                >
                  <Link
                    to={`/dashboard/my-reports`}
                    onClick={() => setIsProfileOpen(false)}
                    className = {`block w-full text-left px-4 py-3 text-sm transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    My Reports
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="lg:hidden text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      className={`lg:hidden absolute top-full left-0 w-full shadow-lg ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
      variants={mobileMenuVariants} initial="closed" animate="open" exit="closed"
    >
      <ul className={`flex flex-col items-center gap-6 py-8 text-lg ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
      }`}>
        
        <motion.li variants={mobileLinkVariants}>
          <Link 
            to={`/dashboard/my-reports`} 
            className={`transition font-medium ${
              theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-[#0d47a1]'
            }`} 
            onClick={() => setIsOpen(false)}
          >
            My Reports
          </Link>
        </motion.li>
        
        {(
          <motion.li variants={mobileLinkVariants}>
            <Link
              to={`/dashboard/`}
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              Dashboard
            </Link>
          </motion.li>
        )}
        
        {!location.pathname.endsWith('/new-report') && (
          <motion.li variants={mobileLinkVariants}>
            <Link
              to={`/dashboard/new-report`}
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#0d47a1] to-[#6a1b9a] text-white"
            >
              New Report
            </Link>
          </motion.li>
        )}

        {/* THEME TOGGLE BUTTON - MOBILE */}
        <motion.li 
          variants={mobileLinkVariants} 
          className={`pt-4 border-t w-1/2 text-center ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            aria-label="Toggle theme"
            className={`flex items-center justify-center gap-3 mx-auto font-medium transition ${
              theme === 'dark' ? 'hover:text-cyan-400' : 'hover:text-[#0d47a1]'
            }`}
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </motion.li>

      </ul>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}