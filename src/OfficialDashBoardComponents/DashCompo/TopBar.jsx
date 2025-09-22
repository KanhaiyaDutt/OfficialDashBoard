import React from 'react';
import {
    Bell, LifeBuoy, SlidersHorizontal, UserCircle,
    Sun, Moon, Menu, PanelRightOpen, RadioTower
} from 'lucide-react';

import Logo from '../../assets/logo.png';

// Component: TopBar
function TopBar({ theme, toggleTheme, onMenuClick, onDetailsClick }) {
    // A handler for the new button. For now, it will just log to the console.
    const handleSocialStreamClick = () => {
        console.log("Start Social Media Stream button clicked.");
        // In a real application, this would trigger the functionality to
        // start streaming and displaying Twitter feeds about ocean hazards.
    };

    return (
        <div className={`${theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-gray-200'} flex items-center justify-between p-3 shadow-md z-30 border-b`}>
            <div className="flex items-center">
                <button onClick={onMenuClick} className="lg:hidden p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                    <Menu size={24} />
                </button>
                <img src={Logo} alt="Logo" className="max-h-10 h-auto object-contain" />
                <div className='ml-2'>
                    <h1 className={`text-lg font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>INCOIS</h1>
                    <p className={`text-xs hidden sm:block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Indian National Centre for Ocean Information Services</p>
                </div>

                {/* NEW: Social Media Stream Button */}
                <div className={`hidden sm:flex items-center border-l ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} ml-6 pl-6`}>
                     <button 
                        onClick={handleSocialStreamClick} 
                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-700 hover:bg-indigo-600 text-slate-200' : 'bg-gray-100 hover:bg-indigo-600 hover:text-white text-slate-700'}`}
                    >
                        <RadioTower size={16} />
                        <span>Social Media Stream</span>
                    </button>
                </div>
            </div>

            {/* REMOVED: The search bar input field has been removed. */}

            <div className="flex items-center space-x-2 sm:space-x-4">
                 <div className="hidden lg:flex items-center space-x-2 text-sm">
                     <span className="relative flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </span>
                     <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>Live</span>
                 </div>
                <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-500 hover:bg-gray-200'}`}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative">
                    <Bell className={`h-6 w-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-500'} hover:text-indigo-500 cursor-pointer`} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-white text-xs items-center justify-center">4</span>
                    </span>
                </div>
                <div className={`hidden sm:flex items-center space-x-3 border-l ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} pl-4`}>
                    <UserCircle className={`h-8 w-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
                    <div className="hidden xl:block">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>Operator</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Admin</p>
                    </div>
                </div>
                <button onClick={onDetailsClick} className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
                    <PanelRightOpen size={24} />
                </button>
            </div>
        </div>
    );
}

export default React.memo(TopBar);
