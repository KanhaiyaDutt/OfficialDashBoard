import React, { useState } from 'react';
import { format } from 'date-fns';
import {
    Layers, AlertTriangle, Droplets, Wind, FileText, CheckCircle, PieChart, Activity
} from 'lucide-react';

// --- HELPER MAPPINGS & FUNCTIONS ---

const hazardIconMapping = {
    "Oil Spill Detected": <Droplets className="inline-block mr-2" />,
    "Oil Sheen Observed": <Droplets className="inline-block mr-2" />,
    "Marine Debris Accumulation": <Layers className="inline-block mr-2" />,
    "Sargassum Bloom Detected": <Wind className="inline-block mr-2" />,
    "Illegal Fishing Activity": <AlertTriangle className="inline-block mr-2 text-red-500" />,
    "Algal Bloom Detected": <Activity className="inline-block mr-2 text-orange-500" />,
    "Illegal Vessel Sighting": <AlertTriangle className="inline-block mr-2 text-red-500" />,
    "Red Tide Alert": <AlertTriangle className="inline-block mr-2 text-red-500" />,
    "default": <FileText className="inline-block mr-2" />
};

const urgencyStyles = {
    High: "bg-red-500/20 text-red-400",
    Medium: "bg-orange-500/20 text-orange-400",
    Low: "bg-blue-500/20 text-blue-400",
};

const formatSourceName = (source) => source.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

// --- UPDATED COMPONENT: LeftPanel ---

function LeftPanel({ theme, reports, onSelectReport, selectedReportId, isOpen, onClose }) {
    // --- STATE FOR FILTERS ---
    const [activeFilters, setActiveFilters] = useState({
        source: [],
        urgency: [],
    });

    // --- DYNAMIC DATA DERIVATION ---
    const kpiData = {
        totalActive: reports.length,
        highUrgency: reports.filter(r => r.ai_tags.urgency === 'High').length,
        verifiedIncidents: 19,
        hazardTypes: new Set(reports.map(r => r.ai_tags.classification)).size,
    };
    const trendingTopics = ['#oilspill', '#illegalfishing', '#redtide', '#marinedebris', '#sargassum'];
    const sourceOptions = [...new Set(reports.map(r => r.source))];
    const urgencyOptions = [...new Set(reports.map(r => r.ai_tags.urgency))].sort((a, b) => b.length - a.length);

    // --- FILTER HANDLING ---
    const handleFilterChange = (category, value) => {
        setActiveFilters(prevFilters => {
            const currentCategoryFilters = prevFilters[category];
            const newCategoryFilters = currentCategoryFilters.includes(value)
                ? currentCategoryFilters.filter(item => item !== value) // Remove if already present
                : [...currentCategoryFilters, value]; // Add if not present
            
            return { ...prevFilters, [category]: newCategoryFilters };
        });
    };

    const filteredReports = reports.filter(report => {
        const sourceMatch = activeFilters.source.length === 0 || activeFilters.source.includes(report.source);
        const urgencyMatch = activeFilters.urgency.length === 0 || activeFilters.urgency.includes(report.ai_tags.urgency);
        return sourceMatch && urgencyMatch;
    });

    // --- REUSABLE SUB-COMPONENTS ---
    const StatCard = ({ title, value, icon: Icon }) => (
        <div className={`${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} p-3 rounded-lg flex items-center`}>
            <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} p-2 rounded-md mr-3 shadow-inner`}><Icon className="h-6 w-6 text-indigo-500" /></div>
            <div>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
                <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{value}</p>
            </div>
        </div>
    );

    const FilterSection = ({ title, children, defaultOpen = false }) => (
        <details className={`${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} rounded-lg overflow-hidden`} open={defaultOpen}>
            <summary className={`font-semibold text-sm cursor-pointer p-3 ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>{title}</summary>
            <div className={`p-3 space-y-2 border-t ${theme === 'dark' ? 'border-slate-600' : 'border-gray-200'}`}>{children}</div>
        </details>
    );
    
    const Checkbox = ({ id, label, checked, onChange }) => (
        <div className="flex items-center">
            <input id={id} type="checkbox" checked={checked} onChange={onChange} className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-600' : 'bg-white'}`} />
            <label htmlFor={id} className={`ml-2 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
        </div>
    );
    
    return (
        <>
            {/* FIX: Moved the style block here, inside the main return statement */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background-color: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'};
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: ${theme === 'dark' ? '#475569' : '#94a3b8'};
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: ${theme === 'dark' ? '#64748b' : '#64748b'};
                }
            `}</style>

            <div className={`fixed lg:relative inset-0 bg-black/50 z-40 transition-opacity ${isOpen ? 'opacity-100 lg:opacity-0' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed lg:relative z-50 lg:z-auto h-full w-80 lg:w-96 flex flex-col p-4 border-r transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-gray-200'}`}>
                
                {/* Section: Operational Overview */}
                <div className="mb-4 flex-shrink-0">
                    <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-3 px-2`}>OCEAN HAZARD OVERVIEW</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <StatCard title="Total Active Reports" value={kpiData.totalActive} icon={FileText} />
                        <StatCard title="High Urgency Alerts" value={kpiData.highUrgency} icon={AlertTriangle} />
                        <StatCard title="Verified Incidents" value={kpiData.verifiedIncidents} icon={CheckCircle} />
                        <StatCard title="Unique Hazard Types" value={kpiData.hazardTypes} icon={PieChart} />
                    </div>
                </div>

                {/* Section: Filters */}
                <div className="mb-4 flex-shrink-0">
                    <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-3 px-2`}>FILTERS</h2>
                    <div className="space-y-3">
                        <FilterSection title="Source" defaultOpen={true}>
                            {sourceOptions.map(source => (
                                <Checkbox 
                                    key={source} 
                                    label={formatSourceName(source)} 
                                    id={`src-${source}`}
                                    checked={activeFilters.source.includes(source)}
                                    onChange={() => handleFilterChange('source', source)}
                                />
                            ))}
                        </FilterSection>
                        <FilterSection title="Urgency Level" defaultOpen={true}>
                            {urgencyOptions.map(urgency => (
                                <Checkbox 
                                    key={urgency} 
                                    label={urgency} 
                                    id={`urgency-${urgency.toLowerCase()}`}
                                    checked={activeFilters.urgency.includes(urgency)}
                                    onChange={() => handleFilterChange('urgency', urgency)}
                                />
                            ))}
                        </FilterSection>
                    </div>
                </div>

                {/* Section: Live Reports (Scrollable and Filtered) */}
                <div className="flex-grow flex flex-col overflow-hidden min-h-0 ">
                    <h2 className={`text-sm font-semibold flex-shrink-0 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-3 px-2`}>LIVE REPORTS ({filteredReports.length})</h2>
                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-1 space-y-2">
                        {filteredReports.length > 0 ? (
                            filteredReports.map(report => {
                                const isSelected = report.report_id === selectedReportId;
                                const icon = hazardIconMapping[report.ai_tags.classification] || hazardIconMapping.default;
                                const urgencyClass = urgencyStyles[report.ai_tags.urgency] || 'bg-gray-500/20 text-gray-400';
                                
                                return (
                                    <div
                                        key={report.report_id}
                                        onClick={() => { onSelectReport(report); onClose(); }}
                                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border ${isSelected ? 'bg-indigo-500/20 border-indigo-500' : `${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600/80 border-transparent' : 'bg-gray-100 hover:bg-gray-200 border-transparent'}`}`}>
                                        
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-sm font-bold truncate ${isSelected ? 'text-white' : ''}`}>
                                                {icon}
                                                {report.ai_tags.classification}
                                            </span>
                                            <span className={`text-xs font-mono px-2 py-1 rounded ${urgencyClass}`}>{report.ai_tags.urgency}</span>
                                        </div>
                                        <p className={`text-xs truncate ${isSelected ? 'text-indigo-200' : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {report.report_id} | {format(new Date(report.timestamp), 'dd MMM yyyy, p')}
                                        </p>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center py-10 px-4">
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    No reports match the current filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Section: Trending Topics */}
                <div className="mt-4 flex-shrink-0">
                    <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-3 px-2`}>TRENDING TOPICS</h2>
                    <div className="flex flex-wrap gap-2">
                        {trendingTopics.map(topic => (
                            <button key={topic} className={`text-xs transition-colors duration-200 px-3 py-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white' : 'bg-gray-200 hover:bg-indigo-600 text-slate-700 hover:text-white'}`}>{topic}</button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default React.memo(LeftPanel)