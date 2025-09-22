import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF, MarkerClustererF } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

// --- IMPORTANT: API Key Configuration ---
// Please replace "YOUR_API_KEY_HERE" with your actual Google Maps API key.
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// --- Map Styling for Light and Dark Themes ---
const mapStyles = {
    light: [], // Default Google Maps style
    dark: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
        { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
        { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
        { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
    ]
};

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
};

// Helper to create custom colored markers based on urgency
const getMarkerIcon = (urgency) => {
    let color;
    switch (urgency) {
        case 'High': color = '#ef4444'; break;
        case 'Medium': color = '#f97316'; break;
        case 'Low': color = '#3b82f6'; break;
        default: color = '#6b7280';
    }

    if (window.google && window.google.maps) {
        return {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: color,
            fillOpacity: 1,
            strokeWeight: 1.5,
            strokeColor: '#ffffff',
            scale: 8,
        };
    }
    return {};
};

// --- Reusable Sliding Toggle Component ---
const SlidingToggle = ({ theme, options, selected, onChange }) => {
    const activeIndex = options.findIndex(option => option.value === selected);
    
    return (
        <div className={`relative flex items-center w-auto p-1 rounded-lg border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm`}>
            {/* The sliding "pill" background */}
            <div
                className="absolute top-1 bottom-1 bg-indigo-600 rounded-md shadow-md transition-transform duration-300 ease-in-out"
                style={{
                    width: `calc((100% - 8px) / ${options.length})`, // 8px for parent p-1
                    transform: `translateX(${activeIndex * 100}%)`
                }}
            />
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`relative z-10 w-full px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-300 ${
                        selected === option.value
                            ? 'text-white'
                            : (theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-black')
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};


// --- Main Map Component ---
function MapView({ theme, reports, selectedReport, onSelectReport, mapMarker, onClearMapMarker }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    });

    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [timeFilter, setTimeFilter] = useState('this_year');

    const center = useMemo(() => ({ lat: 15.3173, lng: 73.8184 }), []);

    const filteredReports = useMemo(() => {
        const now = new Date("2025-09-19T13:30:00.000+05:30"); // Use the specified current time
        const processed = Array.isArray(reports) ? reports.map(r => ({ ...r, timestamp: new Date(r.timestamp) })) : [];

        if (timeFilter === 'today') {
            return processed.filter(r => r.timestamp.toDateString() === now.toDateString());
        }
        if (timeFilter === 'this_week') {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            return processed.filter(r => r.timestamp >= startOfWeek);
        }
        if (timeFilter === 'this_year') {
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            return processed.filter(r => r.timestamp >= startOfYear);
        }
        return processed;
    }, [reports, timeFilter]);

    useEffect(() => {
        if (map && selectedReport) {
            map.panTo({ lat: selectedReport.location.latitude, lng: selectedReport.location.longitude });
            map.setZoom(14);
            setActiveMarker(selectedReport);
        }
    }, [selectedReport, map]);

    // Effect to pan to the temporary marker from the right panel
    useEffect(() => {
        if (map && mapMarker && mapMarker.length === 2) {
            const [lng, lat] = mapMarker;
            const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
            map.panTo(position);
            map.setZoom(15);
            // We don't set an active info window for this temporary marker
        }
    }, [mapMarker, map]);

    const onLoad = useCallback(mapInstance => setMap(mapInstance), []);
    const onUnmount = useCallback(() => setMap(null), []);

    const handleMarkerClick = (report) => {
        setActiveMarker(report);
        if (onSelectReport) onSelectReport(report);
    };

    // Handle time filter change and clear the temporary marker
    const handleTimeFilterChange = (value) => {
        setTimeFilter(value);
        if (onClearMapMarker) {
            onClearMapMarker();
        }
    };

    const timeFilterOptions = [
        { value: 'today', label: 'Today' },
        { value: 'this_week', label: 'This Week' },
        { value: 'this_year', label: 'This Year' },
    ];

    const renderMap = () => {
        if (!isLoaded) return <div className="flex items-center justify-center h-full">Loading Map...</div>;
        if (API_KEY === "YOUR_API_KEY_HERE") return <div className="flex items-center justify-center h-full text-center p-4">Please add your Google Maps API key<br/>in MapView.jsx to enable the map.</div>;
        
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ styles: theme === 'dark' ? mapStyles.dark : mapStyles.light, streetViewControl: false, mapTypeControl: false, fullscreenControl: false, zoomControl: false }}
            >
                <MarkerClustererF>
                    {(clusterer) =>
                        filteredReports.map((report) => (
                            <MarkerF
                                key={report.report_id}
                                position={{ lat: report.location.latitude, lng: report.location.longitude }}
                                onClick={() => handleMarkerClick(report)}
                                icon={getMarkerIcon(report.ai_tags.urgency)}
                                title={report.ai_tags.classification}
                                clusterer={clusterer}
                            />
                        ))
                    }
                </MarkerClustererF>
                {activeMarker && (
                    <InfoWindowF
                        position={{ lat: activeMarker.location.latitude + 0.002, lng: activeMarker.location.longitude }}
                        onCloseClick={() => setActiveMarker(null)}
                    >
                        <div className="p-1 font-sans">
                            <h4 className="font-bold text-md mb-1">{activeMarker.ai_tags.classification}</h4>
                            <p><strong>Urgency:</strong> {activeMarker.ai_tags.urgency}</p>
                        </div>
                    </InfoWindowF>
                )}
                {/* Render the temporary marker if it exists */}
                {isLoaded && mapMarker && mapMarker.length === 2 && (
                    <MarkerF
                        position={{ lng: parseFloat(mapMarker[0]), lat: parseFloat(mapMarker[1]) }}
                        icon={{
                            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', // SVG path for a map pin
                            fillColor: '#6366f1', // Indigo color
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: '#ffffff',
                            scale: 1.5,
                            anchor: new window.google.maps.Point(12, 24),
                        }}
                        zIndex={1000} // Ensure it's on top of other markers
                    />
                )}
            </GoogleMap>
        );
    };

    return (
        <div className={`flex-1 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-200'} p-10 relative flex flex-col`}>
            <div className={`flex-1  rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`}>
                {renderMap()}
            </div>
            
            {/* Time Filter Sliding Toggle - Moved to top right */}
            <div className={`absolute top-12 right-12 z-20 flex items-center space-x-2`}>
                <SlidingToggle 
                    theme={theme}
                    options={timeFilterOptions}
                    selected={timeFilter}
                    onChange={handleTimeFilterChange}
                />
            </div>
        </div>
    );
}

export default React.memo(MapView);

