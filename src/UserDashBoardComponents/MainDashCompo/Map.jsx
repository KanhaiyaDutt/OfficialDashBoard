import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon } from 'lucide-react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';

// Inlined mock data to resolve the previous import error.
const mockReports = [
    { "_id": "670f1a9a7b3e8c4d5f6a1b3d", "report_id": "REP-CHD-054", "report_url": "https://example.com/chandigarh_report/54", "location": { "latitude": 30.6493, "longitude": 76.8131 }, "timestamp": "2025-09-22T10:25:00Z", "ai_tags": { "classification": "Traffic Violation", "urgency": "Critical" }, "source": "traffic_camera" },
    { "_id": "670f1a9a7b3e8c4d5f6a1b3a", "report_id": "REP-CHD-051", "report_url": "https://example.com/chandigarh_report/51", "location": { "latitude": 30.7422, "longitude": 76.8185 }, "timestamp": "2025-09-22T09:15:00Z", "ai_tags": { "classification": "Unattended Object", "urgency": "Medium" }, "source": "citizen_report" },
    { "_id": "670f1a9a7b3e8c4d5f6a1b3b", "report_id": "REP-CHD-052", "report_url": "https://example.com/chandigarh_report/52", "location": { "latitude": 30.7176, "longitude": 76.8041 }, "timestamp": "2025-09-21T09:30:00Z", "ai_tags": { "classification": "Suspicious Activity", "urgency": "High" }, "source": "cctv_feed" },
    { "_id": "670f1a9a7b3e8c4d5f6a1b3c", "report_id": "REP-CHD-053", "report_url": "https://example.com/chandigarh_report/53", "location": { "latitude": 30.7602, "longitude": 76.7633 }, "timestamp": "2025-09-17T20:00:00Z", "ai_tags": { "classification": "Noise Complaint", "urgency": "Low" }, "source": "citizen_report" },
    { "_id": "670f1a9a7b3e8c4d5f6a1b3e", "report_id": "REP-PUN-055", "report_url": "https://example.com/punjab_report/55", "location": { "latitude": 31.6340, "longitude": 74.8723 }, "timestamp": "2025-08-10T11:00:00Z", "ai_tags": { "classification": "Suspicious Activity", "urgency": "High" }, "source": "drone_feed" },
    { "_id": "670f1a9a7b3e8c4d5f6a1b3f", "report_id": "REP-PUN-056", "report_url": "https://example.com/punjab_report/56", "location": { "latitude": 30.9010, "longitude": 75.8573 }, "timestamp": "2025-07-22T18:45:00Z", "ai_tags": { "classification": "Unattended Object", "urgency": "Medium" }, "source": "citizen_report" }
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Google Maps dark theme style
const mapDarkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
    { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
];

const getMarkerIcon = (urgency) => {
  let color;
  switch (urgency) {
    case 'Critical': color = '#dc2626'; break;
    case 'High': color = '#f97316'; break;
    case 'Medium': color = '#f59e0b'; break;
    case 'Low': color = '#3b82f6'; break;
    default: color = '#6b7280';
  }
  
  if (window.google && window.google.maps) {
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: '#ffffff',
      scale: 9,
      anchor: new window.google.maps.Point(0, 0),
    };
  }
  return {};
};

export default function MapComponent({ theme }) {
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [timeFilter, setTimeFilter] = React.useState('all'); 
  const isDark = theme === 'dark';

  const processedReports = React.useMemo(() => {
    return mockReports.map(report => ({
      ...report,
      timestamp: new Date(report.timestamp),
    }));
  }, []); 

  const filteredReports = React.useMemo(() => {
    const now = new Date("2025-09-22T11:21:00"); // Using a fixed 'now' for consistent filtering based on mock data

    if (timeFilter === 'today') {
      return processedReports.filter(report => 
        report.timestamp.toDateString() === now.toDateString()
      );
    }
    
    if (timeFilter === 'this_week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay()); 
      startOfWeek.setHours(0, 0, 0, 0);
      return processedReports.filter(report => report.timestamp >= startOfWeek);
    }

    if (timeFilter === 'this_month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return processedReports.filter(report => report.timestamp >= startOfMonth);
    }
    
    return processedReports; 
  }, [processedReports, timeFilter]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const center = React.useMemo(() => ({
    lat: 30.7333,
    lng: 76.7794
  }), []);

  if (!isLoaded) {
    return (
        <div className={`flex items-center justify-center h-[40rem] rounded-2xl ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
            Loading Map...
        </div>
    );
  }

  return (
    <motion.div 
      className={`p-4 sm:p-6 rounded-2xl h-[40rem] md:h-[40rem] lg:h-[44rem] flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold flex items-center ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          <MapIcon className="mr-3 text-blue-500" size={24} />
          Reports Heatmap
        </h3>
        
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className={`p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      <div className="flex-grow rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: isDark ? mapDarkStyle : [],
          }}
        >
          {filteredReports.map((report) => (
            <MarkerF
              key={report.report_id}
              position={{ lat: report.location.latitude, lng: report.location.longitude }}
              onClick={() => setSelectedReport(report)}
              icon={getMarkerIcon(report.ai_tags.urgency)}
            />
          ))}

          {selectedReport && (
            <InfoWindowF
              position={{ lat: selectedReport.location.latitude, lng: selectedReport.location.longitude }}
              onCloseClick={() => setSelectedReport(null)}
            >
              <div className={`p-1 font-sans ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <h4 className="font-bold text-md mb-1">{selectedReport.ai_tags.classification}</h4>
                <p><strong>Urgency:</strong> {selectedReport.ai_tags.urgency}</p>
                <p><strong>Source:</strong> {selectedReport.source.replace(/_/g, ' ')}</p>
                <p><strong>Time:</strong> {selectedReport.timestamp.toLocaleTimeString()}</p>
                  <a href={selectedReport.report_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Details
                  </a>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </div>
    </motion.div>
  );
}
