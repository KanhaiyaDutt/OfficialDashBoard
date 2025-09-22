import React from 'react';
import MapComponent from './MainDashCompo/Map'; 
import AnalyticsComponent from './MainDashCompo/Analytics'; 
import TweetsComponent from './MainDashCompo/Tweets'; 

// Blob configurations for light theme
const lightBlobConfigurations = [
    { classes: 'w-[650px] h-[650px] top-[-10%] left-[-15%]', color: '#cfe0ff' },
    { classes: 'w-[700px] h-[700px] top-[10%] right-[-20%]', color: '#f1ddff' },
    { classes: 'w-[550px] h-[550px] bottom-[-20%] left-[10%]', color: '#dff7ee' },
    { classes: 'w-[500px] h-[500px] top-[30%] left-[20%]', color: '#e9e4ff' },
    { classes: 'w-[600px] h-[600px] top-[5%] left-[50%]', color: '#cfe0ff' },
    // Adding a few more for density from the original list
    { classes: 'w-[280px] h-[280px] top-[25%] left-[60%]', color: '#e9e4ff' },
    { classes: 'w-[240px] h-[240px] top-[70%] right-[15%]', color: '#dff7ee' },
];

// Blob configurations for dark theme
const darkBlobConfigurations = [
    { classes: 'w-[650px] h-[650px] top-[-10%] left-[-15%]', color: '#1e293b' },
    { classes: 'w-[700px] h-[700px] top-[10%] right-[-20%]', color: '#3b0764' },
    { classes: 'w-[550px] h-[550px] bottom-[-20%] left-[10%]', color: '#042f2e' },
    { classes: 'w-[500px] h-[500px] top-[30%] left-[20%]', color: '#1e1b4b' },
    { classes: 'w-[600px] h-[600px] top-[5%] left-[50%]', color: '#1e293b' },
    // Adding a few more for density
    { classes: 'w-[280px] h-[280px] top-[25%] left-[60%]', color: '#1e1b4b' },
    { classes: 'w-[240px] h-[240px] top-[70%] right-[15%]', color: '#042f2e' },
];

export default function MainDash({ theme }) {
    // Select the appropriate blob configuration based on the current theme
    const blobConfigurations = theme === 'dark' ? darkBlobConfigurations : lightBlobConfigurations;
    const blobOpacity = theme === 'dark' ? 'opacity-40' : 'opacity-70';

    return (
        <section className={`relative min-h-screen overflow-hidden w-full pt-28 pb-12 px-4 sm:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50/50'}`}>

            {/* Background Layer: Blobs and SVG Wave */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {blobConfigurations.map((blob, index) => (
                    <div
                        key={index}
                        className={`absolute rounded-full filter blur-xl ${blob.classes} ${blobOpacity} transition-opacity duration-500`}
                        style={{
                            background: `radial-gradient(circle, ${blob.color} 0%, transparent 80%)`,
                        }}
                    />
                ))}

                {/* Static concentric rings/shadow */}
                <div
                    className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 0%, transparent 60%)`,
                    }}
                />
                
                {/* SVG Wave at the bottom */}
                <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        // Set fill color to match the page background for a seamless look
                        fill={theme === 'dark' ? '#111827' : '#f3f4f6'}
                        fillOpacity="1"
                        d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <div className="container mx-auto max-w-screen-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main content area for the map */}
                    <div className="lg:col-span-2">
                        {/* Pass the theme prop to child components */}
                        <MapComponent theme={theme} />
                    </div>
                    
                    {/* Sidebar area for tweets */}
                    <div className="space-y-8">
                        <TweetsComponent theme={theme} />
                    </div>

                    {/* Full-width area for analytics at the bottom */}
                    <div className="lg:col-span-3">
                        <AnalyticsComponent theme={theme} />
                    </div>
                </div>
            </div>
        </section>
    );
}