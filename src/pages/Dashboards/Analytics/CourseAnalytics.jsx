import React from 'react';
import { useData } from '../../../context/DataContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './Analytics.scss';

const CourseAnalytics = () => {
  const { data } = useData();

  // Mock Performance Data
  const coursePerformanceData = [
    { month: 'Yan', telebeler: 20 },
    { month: 'Fev', telebeler: 25 },
    { month: 'Mar', telebeler: 40 },
    { month: 'Apr', telebeler: 45 },
    { month: 'May', telebeler: 60 }
  ];

  // Mock Completion Ratio
  const completionData = [
    { name: 'Uğurla Bitirdi', value: 85, color: '#10B981' },
    { name: 'Yarımçıq Qalan', value: 15, color: '#EF4444' }
  ];

  return (
    <div className="analytics-page">
      <h2>İntellektual Analitika (Tədris Mərkəzi)</h2>
      <p className="desc">Kurs preformansı və məzuniyyət nisbətləri</p>
      
      <div className="analytics-grid">
        {/* Enrolled students */}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
          <h3>Aylıq Qeydiyyat Trendi</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={coursePerformanceData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                 <XAxis dataKey="month" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <Tooltip cursor={{fill: 'var(--hover-bg)'}} contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
                 <Bar dataKey="telebeler" fill="var(--secondary-color)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Completion Ratio */}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
          <h3>Məzuniyyət və Tərk Nisbəti</h3>
          <div className="chart-wrapper" style={{display:'flex', alignItems:'center'}}>
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={completionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                   {completionData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
               </PieChart>
             </ResponsiveContainer>
             <div className="pie-legend">
               {completionData.map(s => (
                 <div key={s.name} className="legend-item">
                   <div className="color-box" style={{backgroundColor: s.color}}></div>
                   <span>{s.name} ({s.value}%)</span>
                 </div>
               ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseAnalytics;
