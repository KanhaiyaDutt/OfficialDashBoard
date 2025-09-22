import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Hash, AlertTriangle, TrendingUp } from 'lucide-react';

// Import Chart.js components and the React wrapper
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Registering Chart.js components that we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler
);

// Mock data is used as a fallback or for components not covered by the API
import reportsData from '../../utils/MockData/mockreport.json';
import postsData from '../../utils/MockData/mockPosts.json';



export default function Analytics({ theme }) {

  // --- Theme-Aware Chart Options ---
  const commonOptions = useMemo(() => {
    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : '#e7e5e4';
    const textColor = isDark ? 'rgba(209, 213, 219, 1)' : 'rgba(55, 65, 81, 1)';

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 10 },
            boxWidth: 12,
            color: textColor, // Dynamic text color
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 }, color: textColor } // Dynamic text color
        },
        y: {
          grid: { color: gridColor }, // Dynamic grid color
          ticks: { font: { size: 10 }, color: textColor } // Dynamic text color
        }
      }
    };
  }, [theme]);

  // --- Data Processing with Theme-Aware Colors ---
  const reportsByCategoryData = useMemo(() => {
    const counts = reportsData.reduce((acc, report) => {
      const category = report.ai_tags.classification;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? 'rgba(129, 140, 248, 0.7)' : 'rgba(79, 70, 229, 0.7)';
    const borderColor = isDark ? 'rgba(129, 140, 248, 1)' : 'rgba(79, 70, 229, 1)';

    return {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Report Count',
        data: Object.values(counts),
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderRadius: 4,
      }],
    };
  }, [theme]);

  const reportsByUrgencyData = useMemo(() => {
    const counts = reportsData.reduce((acc, report) => {
      const urgency = report.ai_tags.urgency;
      acc[urgency] = (acc[urgency] || 0) + 1;
      return acc;
    }, {});
    
    const isDark = theme === 'dark';
    const pieColors = isDark 
      ? ['#ef4444', '#f97316', '#eab308', '#3b82f6']
      : ['#dc2626', '#ea580c', '#f59e0b', '#2563eb'];

    return {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Urgency',
        data: Object.values(counts),
        backgroundColor: pieColors,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
      }],
    };
  }, [theme]);

  const reportsOverTimeData = useMemo(() => {
    const counts = reportsData.reduce((acc, report) => {
      const month = new Date(report.timestamp).toLocaleString('default', { month: 'short', year: '2-digit' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});
    const sortedLabels = Object.keys(counts).sort((a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`));
    const sortedData = sortedLabels.map(label => counts[label]);

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? 'rgba(167, 139, 250, 0.2)' : 'rgba(124, 58, 237, 0.2)';
    const borderColor = isDark ? 'rgba(167, 139, 250, 1)' : 'rgba(124, 58, 237, 1)';

    return {
      labels: sortedLabels,
      datasets: [{
        label: 'Reports',
        data: sortedData,
        fill: true,
        backgroundColor,
        borderColor,
        tension: 0.3,
      }],
    };
  }, [theme]);
  
  const hashtagEngagementData = useMemo(() => {
    const engagement = {};
    const hashtagRegex = /#\w+/g;
    postsData.forEach(post => {
      const hashtags = post.text.match(hashtagRegex);
      if (hashtags) {
        hashtags.forEach(hashtag => {
          if (!engagement[hashtag]) engagement[hashtag] = 0;
          engagement[hashtag] += (post.likes + post.retweets + post.replies);
        });
      }
    });
    const sorted = Object.entries(engagement).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? 'rgba(196, 181, 253, 0.7)' : 'rgba(167, 139, 250, 0.7)';
    const borderColor = isDark ? 'rgba(196, 181, 253, 1)' : 'rgba(167, 139, 250, 1)';
    
    return {
      labels: sorted.map(item => item[0]),
      datasets: [{
        label: 'Total Engagement',
        data: sorted.map(item => item[1]),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      }],
    };
  }, [theme]);

  return (
    <motion.div 
      className={`p-4 sm:p-6 rounded-2xl shadow-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className={`text-xl font-bold mb-6 flex items-center transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
        <BarChart2 className="mr-3 text-indigo-500" size={24} />
        Ocean Health Analytics
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Graph 1: Bar Chart */}
        <div className={`p-4 rounded-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <p className={`text-sm font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}><BarChart2 size={16} className="mr-2"/>Reports by Classification</p>
          <div className="relative h-64">
             <Bar options={{...commonOptions, plugins: { legend: { display: false }}}} data={reportsByCategoryData} />
          </div>
        </div>

        {/* Graph 2: Pie Chart */}
        <div className={`p-4 rounded-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <p className={`text-sm font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}><AlertTriangle size={16} className="mr-2"/>Report Urgency Distribution</p>
          <div className="relative h-64">
            <Pie data={reportsByUrgencyData} options={{...commonOptions, plugins: {...commonOptions.plugins, legend: { position: 'right' }}}}/>
          </div>
        </div>

        {/* Graph 3: Area Chart */}
        <div className={`p-4 rounded-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <p className={`text-sm font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}><TrendingUp size={16} className="mr-2"/>Reports Over Time</p>
          <div className="relative h-64">
            <Line options={{...commonOptions, plugins: { legend: { display: false }}}} data={reportsOverTimeData} />
          </div>
        </div>
        
        {/* Graph 4: Horizontal Bar Chart */}
        <div className={`p-4 rounded-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
          <p className={`text-sm font-semibold mb-3 flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}><Hash size={16} className="mr-2"/>Top Hashtag Engagement</p>
          <div className="relative h-64">
             <Bar 
               options={{
                 ...commonOptions, 
                 indexAxis: 'y', // Makes the bar chart horizontal
                 scales: { 
                    x: { ...commonOptions.scales.x, grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e7e5e4' } }, 
                    y: { ...commonOptions.scales.y, grid: { display: false } } 
                },
                 plugins: { legend: { display: false } }
               }} 
               data={hashtagEngagementData} 
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
