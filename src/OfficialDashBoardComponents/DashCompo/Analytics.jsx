import React from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, Filler } from 'chart.js';
import { format, subDays, startOfDay } from 'date-fns';
import {
    BarChart, PieChart as PieChartIcon, LineChart as LineChartIcon, AlertTriangle, Satellite, BarChart2, Activity, ListChecks
} from 'lucide-react';

// Registering all the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement, Filler);

import oceanReports from '../../utils/MockData/mockreport.json'

// --- HELPER FUNCTIONS FOR ANALYTICS ---
const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (360 / numColors) * i;
        colors.push(`hsla(${hue}, 70%, 60%, 0.7)`);
    }
    return colors;
};

// --- ANALYTICS DASHBOARD COMPONENT ---
function AnalyticsDashboard({ theme, reports = oceanReports }) {
    // --- 1. DATA PROCESSING & DERIVATION ---
    const classifications = reports.reduce((acc, report) => {
        const classification = report.ai_tags.classification;
        acc[classification] = (acc[classification] || 0) + 1;
        return acc;
    }, {});
    const reportsByCategory = {
        labels: Object.keys(classifications),
        datasets: [{
            label: '# of Reports',
            data: Object.values(classifications),
            backgroundColor: 'rgba(99, 102, 241, 0.7)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1,
        }],
    };

    const urgencies = reports.reduce((acc, report) => {
        const urgency = report.ai_tags.urgency;
        acc[urgency] = (acc[urgency] || 0) + 1;
        return acc;
    }, { High: 0, Medium: 0, Low: 0 });
    const reportsByUrgency = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
            data: [urgencies.High, urgencies.Medium, urgencies.Low],
            backgroundColor: ['#ef4444', '#f97316', '#3b82f6'],
            borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderWidth: 2,
        }],
    };

    const sources = reports.reduce((acc, report) => {
        const source = report.source;
        acc[source] = (acc[source] || 0) + 1;
        return acc;
    }, {});
    const reportsBySource = {
        labels: Object.keys(sources).map(s => s.replace(/_/g, ' ')),
        datasets: [{
            label: 'Reports from Source',
            data: Object.values(sources),
            backgroundColor: generateColors(Object.keys(sources).length),
        }],
    };

    const last7Days = Array.from({ length: 7 }, (_, i) => startOfDay(subDays(new Date(), i))).reverse();
    const dailyCounts = last7Days.map(day => reports.filter(report => startOfDay(new Date(report.timestamp)).getTime() === day.getTime()).length);
    const reportsOverTime = {
        labels: last7Days.map(day => format(day, 'MMM dd')),
        datasets: [{
            label: 'Reports per Day',
            data: dailyCounts,
            fill: true,
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            tension: 0.3,
        }],
    };

    const highUrgencyReports = reports.filter(r => r.ai_tags.urgency === 'High');
    const highUrgencyClassifications = highUrgencyReports.reduce((acc, report) => {
        const classification = report.ai_tags.classification;
        acc[classification] = (acc[classification] || 0) + 1;
        return acc;
    }, {});
    const highUrgencyData = {
        labels: Object.keys(highUrgencyClassifications),
        datasets: [{
            data: Object.values(highUrgencyClassifications),
            backgroundColor: generateColors(Object.keys(highUrgencyClassifications).length),
            borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
        }],
    };

    const sourceUrgencyData = {
        labels: Object.keys(sources).map(s => s.replace(/_/g, ' ')),
        datasets: [
            { label: 'High Urgency', data: Object.keys(sources).map(source => reports.filter(r => r.source === source && r.ai_tags.urgency === 'High').length), backgroundColor: '#ef4444' },
            { label: 'Medium Urgency', data: Object.keys(sources).map(source => reports.filter(r => r.source === source && r.ai_tags.urgency === 'Medium').length), backgroundColor: '#f97316' },
            { label: 'Low Urgency', data: Object.keys(sources).map(source => reports.filter(r => r.source === source && r.ai_tags.urgency === 'Low').length), backgroundColor: '#3b82f6' }
        ]
    };
    
    // --- 2. CHART CONFIGURATION ---
    const getCommonOptions = (isStacked = false) => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: theme === 'dark' ? '#cbd5e1' : '#475569' } } },
        scales: {
            x: { stacked: isStacked, ticks: { color: theme === 'dark' ? '#94a3b8' : '#64748b' }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } },
            y: { stacked: isStacked, ticks: { color: theme === 'dark' ? '#94a3b8' : '#64748b' }, grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' } }
        }
    });

    // --- 3. REUSABLE COMPONENTS & RENDER ---
    const ChartCard = ({ title, icon: Icon, children }) => (
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-lg border`}>
            <h3 className={`text-md font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} mb-4 flex items-center`}>
                <Icon size={18} className="mr-2 text-indigo-500" />{title}
            </h3>
            <div className="relative h-64">{children}</div>
        </div>
    );
    
    const RecentActivityCard = ({ title, icon: Icon, reports }) => (
         <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-lg border`}>
             <h3 className={`text-md font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} mb-4 flex items-center`}>
                <Icon size={18} className="mr-2 text-indigo-500" />{title}
            </h3>
            {/* ADDED custom-scrollbar class */}
            <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
                {reports.slice(0, 10).map(report => (
                    <div key={report.report_id} className={`p-2 rounded ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{report.ai_tags.classification}</p>
                        <p className="text-xs text-slate-400">{format(new Date(report.timestamp), 'MMM dd, HH:mm')} - {report.ai_tags.urgency} Urgency</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {/* STYLE BLOCK for custom scrollbars */}
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

            {/* ADDED custom-scrollbar class to main container */}
            <div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'} flex-1 p-6 overflow-y-auto custom-scrollbar`}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
                    <ChartCard title="Reports by Classification" icon={BarChart}><Bar options={getCommonOptions()} data={reportsByCategory} /></ChartCard>
                    <ChartCard title="Urgency Distribution" icon={AlertTriangle}><Pie options={{ ...getCommonOptions(), plugins: { legend: { position: 'right', labels: { color: theme === 'dark' ? '#cbd5e1' : '#475569' } } } }} data={reportsByUrgency} /></ChartCard>
                    <ChartCard title="Daily Report Trend (7 Days)" icon={LineChartIcon}><Line options={getCommonOptions()} data={reportsOverTime} /></ChartCard>
                    <ChartCard title="Reports by Source" icon={Satellite}><Bar options={{...getCommonOptions(), indexAxis: 'y' }} data={reportsBySource} /></ChartCard>
                    <ChartCard title="High Urgency Hotspots" icon={Activity}><Doughnut options={{...getCommonOptions(), plugins: { legend: { position: 'right', labels: { color: theme === 'dark' ? '#cbd5e1' : '#475569' } } }}} data={highUrgencyData} /></ChartCard>
                    <ChartCard title="Source Efficacy" icon={BarChart2}><Bar options={getCommonOptions(true)} data={sourceUrgencyData} /></ChartCard>
                    <RecentActivityCard title="Recent Activity" icon={ListChecks} reports={[...reports].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))} />
                </div>
            </div>
        </>
    );
}

export default React.memo(AnalyticsDashboard);
