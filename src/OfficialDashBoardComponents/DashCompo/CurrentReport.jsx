import React from 'react';
import { format } from 'date-fns';
import {
    FileText, Check, X, ChevronsRightLeft, PanelLeftOpen, 
    MapPin, Clock, AlertTriangle, Link as LinkIcon, Satellite, Camera as DroneIcon, Bot
} from 'lucide-react';

// --- HELPER MAPPINGS & FUNCTIONS ---

// Map urgency levels to Tailwind CSS classes for consistent styling
const urgencyStyles = {
    High: "bg-red-500/20 text-red-400 border border-red-500/30",
    Medium: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    Low: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

// Map source types to specific icons
const sourceIconMapping = {
    'drone_surveillance': <DroneIcon size={16} className="mr-2" />,
    'satellite_imagery': <Satellite size={16} className="mr-2" />,
    'on-site_sensor': <Bot size={16} className="mr-2" />,
};

// Format source names for display (e.g., 'drone_surveillance' -> 'Drone Surveillance')
const formatSourceName = (source = '') => source.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

// --- REFACTORED COMPONENT: RightPanel ---

function RightPanel({ theme, report, isOpen, onClose, panelState, setPanelState, viewMapHandler }) {

    const panelClasses = {
        open: 'lg:w-96',
        minimized: 'lg:w-12 lg:p-2',
        closed: 'lg:w-0 lg:p-0 lg:border-none'
    };

    const renderContent = () => {
        // --- State: No Report Selected ---
        if (!report && panelState === 'open') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <FileText size={48} className={`mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`} />
                    <h3 className="font-bold text-lg">No Report Selected</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Select a report from the list to view its details.
                    </p>
                </div>
            );
        }

        // --- Helper Sub-components for Report View ---
        const Section = ({ title, children }) => (
            <div className="mb-4">
                <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-2 px-1`}>{title}</h2>
                {children}
            </div>
        );

        const DetailItem = ({ icon: Icon, label, children }) => (
            <div className="flex items-start mb-2">
                <Icon size={16} className={`mt-1 mr-3 flex-shrink-0 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
                <div>
                    <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
                    <div className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{children}</div>
                </div>
            </div>
        );

        const ActionButton = ({ text, icon: Icon, color }) => {
            const colors = { 
                green: 'bg-green-600 hover:bg-green-500', 
                red: 'bg-red-600 hover:bg-red-500',
                gray: `${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300 text-slate-800'}`
            };
            return (
                <button className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold text-sm transition-colors duration-200 ${colors[color]}`}>
                    <Icon size={16} className="mr-2"/>{text}
                </button>
            );
        };
        
        const urgencyClass = urgencyStyles[report?.ai_tags?.urgency] || 'bg-gray-500/20 text-gray-400';

        // --- State: Report Selected ---
        return (
            <div className={`flex flex-col h-full ${panelState !== 'open' ? 'hidden' : ''}`}>
                {/* Panel Header */}
                <div className={`border-b ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} pb-3 mb-4`}>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-indigo-500 font-mono">{report?.report_id}</p>
                        <span className={`text-xs capitalize px-2 py-1 rounded-full flex items-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                            {sourceIconMapping[report?.source]} {formatSourceName(report?.source)}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold">{report?.ai_tags.classification}</h2>
                    <p className={`text-sm flex items-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Clock size={14} className="mr-2"/> {report?.timestamp ? format(new Date(report.timestamp), 'dd MMM yyyy, p') : 'N/A'}
                    </p>
                </div>
                
                {/* Panel Body (Scrollable) */}
                <div className="flex-grow overflow-y-auto  pr-1">
                    <Section title="AI ANALYSIS">
							<DetailItem icon={AlertTriangle} label="Urgency Level">
								<span className={`inline-flex items-center text-sm font-bold capitalize px-2 py-1 rounded ${urgencyClass}`}>
									{report?.ai_tags.urgency}
								</span>
							</DetailItem>
						</Section>

                    <Section title="DATA & LOCATION">
                        <div className={`${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} p-3 rounded-lg`}>
                            <DetailItem icon={MapPin} label="Coordinates">
                                <p className="font-mono text-xs">
                                    Lat: {report?.location.latitude.toFixed(6)}<br/>
                                    Lon: {report?.location.longitude.toFixed(6)}
                                </p>
                            </DetailItem>
                             <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                                <a  onClick={() => viewMapHandler([report?.location.longitude, report?.location.latitude])} className={`p-2 rounded-lg cursor-pointer flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-500`}>
                                    <MapPin size={16} className="mr-2"/> View on Map
                                </a>
                                <a href={report?.report_url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <LinkIcon size={16} className="mr-2"/> View Full Report
                                </a>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Panel Footer (Action Hub) */}
                <div className={`mt-auto pt-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                    <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-3 px-1`}>ACTION HUB</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <ActionButton text="Verify Incident" icon={Check} color="green" />
                        <ActionButton text="Dismiss Report" icon={X} color="red" />
                    </div>
                </div>
            </div>
        );
    }
    
    // --- COMPONENT RENDER ---
    return (
        <>
            <div className={`fixed lg:relative inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? 'opacity-100 lg:opacity-0' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            
            <div className={`fixed lg:relative z-50 lg:z-auto h-full flex flex-col border-l transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} right-0 lg:translate-x-0 ${panelClasses[panelState]} ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-gray-200'}`}>
                {/* Desktop Panel Controls */}
                <div className="absolute top-4 -left-10 hidden lg:flex flex-col space-y-2">
                    {panelState === 'open' && (
                        <>
                            <button onClick={() => setPanelState('minimized')} title="Minimize Panel" className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-indigo-600 hover:text-white backdrop-blur-sm"><ChevronsRightLeft size={16}/></button>
                            <button onClick={() => setPanelState('closed')} title="Close Panel" className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-red-600 hover:text-white backdrop-blur-sm"><X size={16}/></button>
                        </>
                    )}
                </div>
                {panelState === 'minimized' && (
                    <div className="h-full flex items-center justify-center">
                        <button onClick={() => setPanelState('open')} title="Open Panel" className={`p-2 rounded-full ${theme === 'dark' ? 'bg-slate-700 hover:bg-indigo-600' : 'bg-gray-200 hover:bg-indigo-600 hover:text-white'}`}>
                            <PanelLeftOpen size={20}/>
                        </button>
                    </div>
                )}
                
                {/* Content Area */}
                {panelState === 'open' ? <div className="p-4 h-full flex flex-col min-h-0">{renderContent()}</div> : null}
            </div>
        </>
    );
}


export default React.memo(RightPanel)