import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, ExternalLink, Clock, MapPin, Database } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

// Blob configurations for both light and dark themes
const lightBlobConfigurations = [
    { classes: 'w-[650px] h-[650px] top-[-10%] left-[-15%] opacity-80', color: '#cfe0ff' },
    { classes: 'w-[700px] h-[700px] top-[10%] right-[-20%] opacity-70', color: '#f1ddff' },
    { classes: 'w-[550px] h-[550px] bottom-[-20%] left-[10%] opacity-70', color: '#dff7ee' },
    { classes: 'w-[600px] h-[600px] top-[5%] left-[50%] opacity-70', color: '#cfe0ff' },
];

const darkBlobConfigurations = [
    { classes: 'w-[650px] h-[650px] top-[-10%] left-[-15%] opacity-40', color: '#1e293b' },
    { classes: 'w-[700px] h-[700px] top-[10%] right-[-20%] opacity-30', color: '#3b0764' },
    { classes: 'w-[550px] h-[550px] bottom-[-20%] left-[10%] opacity-30', color: '#042f2e' },
    { classes: 'w-[600px] h-[600px] top-[5%] left-[50%] opacity-30', color: '#1e1b4b' },
];

export default function MyReports({ theme }) {
    // Determine which blob configuration to use based on the theme
    const blobConfigurations = theme === 'dark' ? darkBlobConfigurations : lightBlobConfigurations;

    const myMockReports = [
        {
            "_id": "670f1a9a7b3e8c4d5f6a1b3d",
            "report_id": "REP-CHD-054",
            "report_url": "https://example.com/chandigarh_report/54",
            "location": { "latitude": 30.6493, "longitude": 76.8131 },
            "timestamp": "2025-09-18T14:25:00Z",
            "ai_tags": { "classification": "Traffic Violation", "urgency": "Critical" },
            "source": "traffic_camera"
        },
        {
            "_id": "670f1a9a7b3e8c4d5f6a1b3b",
            "report_id": "REP-CHD-052",
            "report_url": "https://example.com/chandigarh_report/52",
            "location": { "latitude": 30.7176, "longitude": 76.8041 },
            "timestamp": "2025-09-18T09:30:00Z",
            "ai_tags": { "classification": "Suspicious Activity", "urgency": "High" },
            "source": "cctv_feed"
        },
        {
            "_id": "670f1a9a7b3e8c4d5f6a1b3a",
            "report_id": "REP-CHD-051",
            "report_url": "https://example.com/chandigarh_report/51",
            "location": { "latitude": 30.7422, "longitude": 76.8185 },
            "timestamp": "2025-09-18T12:15:00Z",
            "ai_tags": { "classification": "Unattended Object", "urgency": "Medium" },
            "source": "citizen_report"
        },
        {
            "_id": "670f1a9a7b3e8c4d5f6a1b3c",
            "report_id": "REP-CHD-053",
            "report_url": "https://example.com/chandigarh_report/53",
            "location": { "latitude": 30.7602, "longitude": 76.7633 },
            "timestamp": "2025-09-17T20:00:00Z",
            "ai_tags": { "classification": "Noise Complaint", "urgency": "Low" },
            "source": "citizen_report"
        },
    ];

    const getUrgencyStyles = (urgency) => {
        const styles = {
            light: {
                Critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', ring: 'focus:ring-red-500' },
                High: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', ring: 'focus:ring-orange-500' },
                Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', ring: 'focus:ring-yellow-500' },
                Low: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', ring: 'focus:ring-blue-500' },
                default: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', ring: 'focus:ring-gray-500' }
            },
            dark: {
                Critical: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/30', ring: 'focus:ring-red-500' },
                High: { bg: 'bg-orange-900/50', text: 'text-orange-300', border: 'border-orange-500/30', ring: 'focus:ring-orange-500' },
                Medium: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/30', ring: 'focus:ring-yellow-500' },
                Low: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500/30', ring: 'focus:ring-blue-500' },
                default: { bg: 'bg-gray-700/50', text: 'text-gray-300', border: 'border-gray-500/30', ring: 'focus:ring-gray-500' }
            }
        };
        return styles[theme][urgency] || styles[theme].default;
    };

    return (
        <section className={`relative h-screen overflow-y-auto w-full pt-28 pb-12 px-4 sm:px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50/50'}`}>
            {/* Background Layer: Blobs and SVG Wave */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {blobConfigurations.map((blob, index) => (
                    <div
                        key={index}
                        className={`absolute rounded-full filter blur-2xl transition-all duration-500 ${blob.classes}`}
                        style={{
                            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
                        }}
                    />
                ))}
                <div
                    className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 0%, transparent 60%)`,
                    }}
                />
                <svg
                    className="absolute bottom-0 left-0 w-full"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        fill={theme === 'dark' ? '#111827' : '#f3f4f6'}
                        fillOpacity="1"
                        d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,208C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <motion.div
                className="max-w-7xl mx-auto w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-12">
                    <h3 className={`text-3xl font-bold flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        <ClipboardList className="mr-3 text-indigo-500" size={32} />
                        My Submitted Reports
                    </h3>
                    <p className={`mt-2 max-w-2xl mx-auto transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Here is a list of your recently filed reports. You can track their status and view details below.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {myMockReports
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((report) => {
                            const urgency = getUrgencyStyles(report.ai_tags.urgency);
                            return (
                                <motion.div
                                    key={report._id}
                                    className={`backdrop-blur-sm border ${urgency.border} p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ${theme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'}`}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className={`font-bold text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{report.ai_tags.classification}</h4>
                                            <p className={`text-xs mt-1 font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{report.report_id}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${urgency.bg} ${urgency.text}`}>
                                            {report.ai_tags.urgency}
                                        </span>
                                    </div>

                                    <div className={`space-y-3 text-sm flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className="flex items-center">
                                            <Database size={14} className={`mr-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                            Source: <strong className={`ml-1 capitalize ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{report.source.replace(/_/g, ' ')}</strong>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin size={14} className={`mr-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                            Location: <strong className={`ml-1 font-mono ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{report.location.latitude}, {report.location.longitude}</strong>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock size={14} className={`mr-3 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                                            Time:{' '}
                                            <strong className={`ml-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} title={format(new Date(report.timestamp), 'PPpp')}>
                                                {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true })}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className={`mt-5 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                        <a
                                            href={report.report_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-full flex items-center justify-center px-4 py-2 font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ${urgency.ring} transition-all duration-300 ${theme === 'dark' ? 'focus:ring-offset-gray-800 bg-indigo-500 hover:bg-indigo-600' : 'focus:ring-offset-white'}`}
                                        >
                                            <ExternalLink size={16} className="mr-2" />
                                            View Full Report
                                        </a>
                                    </div>
                                </motion.div>
                            )
                        })}
                </div>
            </motion.div>
        </section>
    );
}