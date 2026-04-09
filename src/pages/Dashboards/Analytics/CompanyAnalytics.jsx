import React from 'react';
import { useData } from '../../../context/DataContext';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import './Analytics.scss';

const CompanyAnalytics = () => {
  const { data } = useData();

  const groupedByUni = data.students.reduce((acc, curr) => {
    acc[curr.uni] = (acc[curr.uni] || 0) + 1;
    return acc;
  }, {});

  const sourcePerformanceData = Object.keys(groupedByUni).map(uni => ({
    name: uni,
    namizəd: groupedByUni[uni]
  }));

  const retentionData = [
    { year: '2022', retention: 85, performance: 75 },
    { year: '2023', retention: 88, performance: 80 },
    { year: '2024', retention: 92, performance: 85 },
    { year: '2025', retention: 90, performance: 90 },
    { year: '2026', retention: 95, performance: 92 }
  ];

  return (
    <div className="analytics-page">
      <h2>İntellektual Analitika</h2>
      <p className="desc">Qərarlar üçün dərin insight-lar ("Insight Engine")</p>

      <div className="analytics-grid">
        {}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
          <h3>Mənbə Performansı (Univestiylərə Görə)</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={sourcePerformanceData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                 <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <Tooltip cursor={{fill: 'var(--hover-bg)'}} contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
                 <Bar dataKey="namizəd" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {}
        <motion.div className="analytics-panel glass-panel" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
          <h3>İşdə Saxlama və Performans Proqnozu (Retention Forecast)</h3>
          <div className="chart-wrapper">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={retentionData}>
                 <defs>
                   <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                 <XAxis dataKey="year" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} />
                 <Tooltip contentStyle={{backgroundColor: '#0F172A', border: 'none', borderRadius: '8px'}} />
                 <Area type="monotone" dataKey="retention" stroke="var(--primary-color)" fillOpacity={1} fill="url(#colorRetention)" />
                 <Area type="monotone" dataKey="performance" stroke="var(--success)" fillOpacity={1} fill="url(#colorPerf)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
