import React from 'react';
import { useData } from '../../../context/DataContext';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './Analytics.scss';

const UniversityAnalytics = () => {
  const { data } = useData();

  // Mock Student Readiness Score
  const readinessData = [
    { year: '2022', score: 65, avgMarket: 70 },
    { year: '2023', score: 72, avgMarket: 75 },
    { year: '2024', score: 80, avgMarket: 78 },
    { year: '2025', score: 88, avgMarket: 82 },
    { year: '2026', score: Math.round(data.universities[0].placementRate), avgMarket: 85 }
  ];

  // Mock Skills distribution
  const skillsConfig = [
    { name: 'Python/AI', value: 400, color: '#6366F1' },
    { name: 'React/UI', value: 300, color: '#06B6D4' },
    { name: 'CyberSecurity', value: 200, color: '#10B981' },
    { name: 'Marketing', value: 100, color: '#F59E0B' }
  ];

  return (
    <div className="analytics-page">
      <h2>İntellektual Analitika</h2>
      <p className="desc">Qərarlar üçün dərin insight-lar ("Insight Engine")</p>
      
      <div className="analytics-grid">
        {/* Student Readiness Score */}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
          <h3>Sənayeyə Hazırlıq Səviyyəsi (Student Readiness)</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={readinessData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                 <XAxis dataKey="year" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <Tooltip contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
                 <Line type="monotone" name="ADA Readiness" dataKey="score" stroke="var(--primary-color)" strokeWidth={3} dot={{r:4}} />
                 <Line type="monotone" name="Bazar Ortalaması" dataKey="avgMarket" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="4 4" />
               </LineChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Over Time */}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
          <h3>Tələbə Bazası Üzrə Aktual Bacarıqlar</h3>
          <div className="chart-wrapper" style={{display:'flex', alignItems:'center'}}>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={skillsConfig} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                   {skillsConfig.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
               </PieChart>
             </ResponsiveContainer>
             <div className="pie-legend">
               {skillsConfig.map(s => (
                 <div key={s.name} className="legend-item">
                   <div className="color-box" style={{backgroundColor: s.color}}></div>
                   <span>{s.name}</span>
                 </div>
               ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UniversityAnalytics;
