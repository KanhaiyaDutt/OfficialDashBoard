import React, { useState, useCallback } from 'react';
import { Map, BarChart2 } from 'lucide-react';
import unverifiedReports from '../utils/MockData/mockreport.json'

// Assuming these components are now wrapped in React.memo in their respective files
import TopBar from './DashCompo/TopBar'
import LeftPanel from './DashCompo/LiveReports'
import RightPanel from './DashCompo/CurrentReport'
import CenterMap from './DashCompo/MapView'
import AnalyticsDashboard from './DashCompo/Analytics'

function Dashboard({theme, toggleTheme}) {
    const [activeView, setActiveView] = useState('map');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [rightPanelState, setRightPanelState] = useState('open');
    const [selectedReport, setSelectedReport] = useState(unverifiedReports[0]);
    const [selectedMapView, setSelectMapView] = useState([]);

    // FIX: Memoize handler functions with useCallback to prevent re-creating them on every render.
    // This is essential for React.memo to work on the child components.
    const handleSelectReport = useCallback((report) => {
        setSelectedReport(report);
        // The 'rightPanelState' dependency is needed if you read it inside the function.
        // A functional update for setRightPanelState avoids this dependency.
        setRightPanelState(currentState => {
            if (currentState !== 'open') {
                return 'open';
            }
            return currentState;
        });
    }, []); // Empty dependency array means this function is created only once.

    

    const handleViewOnMap = useCallback((coordinates) => {
        console.log("Received coordinates in parent:", coordinates);
        setSelectMapView(coordinates); // This will be passed to your MapView component
    }, []);

    const handleMenuClick = useCallback(() => setIsMenuOpen(true), []);
    const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);
    const handleDetailsClick = useCallback(() => setIsDetailsOpen(true), []);
    const handleDetailsClose = useCallback(() => setIsDetailsOpen(false), []);

    const ToggleButton = ({ label, icon: Icon, isActive, onClick }) => (
        <button onClick={onClick} className={`flex items-center px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-200 ${isActive ? 'bg-indigo-600 text-white shadow' : `${theme === 'dark' ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-gray-200'}`}`}>
            <Icon size={16} className="mr-2" />
            {label}
        </button>
    );

    return (
        <div className={`h-screen w-screen flex flex-col font-sans overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
            <TopBar 
                theme={theme} 
                toggleTheme={toggleTheme} 
                onMenuClick={handleMenuClick} 
                onDetailsClick={handleDetailsClick} 
            />
            <div className="flex flex-1 overflow-hidden">
                <LeftPanel 
                    theme={theme} 
                    reports={unverifiedReports} 
                    onSelectReport={handleSelectReport} 
                    selectedReportId={selectedReport?.report_id} 
                    isOpen={isMenuOpen} 
                    onClose={handleMenuClose} 
                />
                <main className="flex-1 flex flex-col relative">
                    <div className={`absolute top-4 left-4 z-20 p-1 rounded-lg border flex items-center space-x-1 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                        <ToggleButton label="Map" icon={Map} isActive={activeView === 'map'} onClick={() => setActiveView('map')} />
                        <ToggleButton label="Analytics" icon={BarChart2} isActive={activeView === 'analytics'} onClick={() => setActiveView('analytics')} />
                    </div>
                    {activeView === 'map' 
                        ? <CenterMap theme={theme} reports={unverifiedReports} mapMarker={selectedMapView}/> 
                        : <AnalyticsDashboard theme={theme} oceanReports={unverifiedReports} />
                    }
                </main>
                <RightPanel 
                    theme={theme} 
                    report={selectedReport} 
                    isOpen={isDetailsOpen} 
                    onClose={handleDetailsClose} 
                    panelState={rightPanelState} 
                    setPanelState={setRightPanelState} 
                    viewMapHandler={handleViewOnMap}
                />
            </div>
        </div>
    );
}

export default React.memo(Dashboard);