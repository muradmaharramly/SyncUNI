import React from 'react';
import { useData } from '../../context/DataContext';
import { Treemap, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiLock, FiStar, FiEdit3 } from 'react-icons/fi';
import './UniversityDashboard.scss';

const UniversityDashboard = () => {
  const { data: SYNC_DATA } = useData();
  const uni = SYNC_DATA.universities[0];
  const students = SYNC_DATA.students.filter(s => s.uni === uni.name);

  // Mock Market Demand Heatmap Data (Treemap)
  const heatmapData = [
    { name: 'Frontend', size: 400 },
    { name: 'React', size: 300 },
    { name: 'Python', size: 350 },
    { name: 'Data Sci', size: 200 },
    { name: 'UI/UX', size: 150 },
    { name: 'Cyber', size: 180 },
    { name: 'Cloud/AWS', size: 250 },
  ];

  const handleEndorse = (studentName) => {
    toast.success(`${studentName} üçün xüsusi 'Endorsement' təsdiqləndi!`);
  };

  return (
    <div className="university-bento">
      <div className="bento-grid">
        
        {/* Industry Alignment Index (Heatmap) */}
        <motion.div className="bento-panel market-heatmap glass-panel" layout>
          <div className="panel-header">
            <h3>Bazar Tələbatı Xəritəsi (Market Demand Heatmap)</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={heatmapData}
                dataKey="size"
                aspectRatio={4/3}
                stroke="#0F172A"
                fill="var(--primary-color)"
                fillOpacity={0.8}
              >
                <RechartsTooltip contentStyle={{backgroundColor: '#0F172A', border: '1px solid #334155'}} />
              </Treemap>
            </ResponsiveContainer>
          </div>
          <p className="desc">Qara xətlər qırılmaları göstərir. Daha iri qutular hazirda sənayedəki (Industry) ən çox tələb olunan bacarıqlardır.</p>
        </motion.div>

        {/* Privacy Wall / Secure Vault */}
        <motion.div className="bento-panel privacy-wall glass-panel" layout>
          <div className="lock-icon">
             <FiLock />
          </div>
          <h3>Secure Vault</h3>
          <p>Məlumat məxfiliyi standartlarına (GDPR) uyğun olaraq, digər universitetlərin (məs. UFAZ, UNEC) akademik məlumatları və tələbə bazaları sizin üçün bloklanmışdır.</p>
          <button className="btn btn--outline" disabled onClick={() => toast.error('Qadağandır')}>Kənar Baza Axtarışı</button>
        </motion.div>

        {/* Digital Reference Ledger */}
        <motion.div className="bento-panel ref-ledger glass-panel" layout style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header">
            <h3>Digital Reference Ledger (Ağıllı Rəy)</h3>
            <button className="btn btn--primary btn-sm"><FiEdit3 /> Yeni Şablon Yarat</button>
          </div>
          <div className="ledger-grid">
            {SYNC_DATA.references.map(ref => {
              const st = students.find(s => s.id === ref.studentId) || SYNC_DATA.students[0];
              return (
                <div key={ref.id} className="ledger-card">
                  <div className="st-info">
                    <h4>{st.name}</h4>
                    <p>Referans rəhbəri: <strong>{ref.teacher}</strong></p>
                  </div>
                  <div className="scores">
                    <div className="score-item">
                      <span>Texniki</span>
                      <div className="stars">{'★'.repeat(ref.skills)}{'☆'.repeat(5-ref.skills)}</div>
                    </div>
                    <div className="score-item">
                      <span>Etika</span>
                      <div className="stars">{'★'.repeat(ref.ethics)}{'☆'.repeat(5-ref.ethics)}</div>
                    </div>
                    <div className="score-item">
                      <span>Komanda</span>
                      <div className="stars">{'★'.repeat(ref.teamwork)}{'☆'.repeat(5-ref.teamwork)}</div>
                    </div>
                  </div>
                  <p className="comment">"{ref.comment}"</p>
                  <motion.button 
                    className="btn btn--outline btn-sm"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleEndorse(st.name)}
                  >
                    <FiStar /> Endorse (Reytinqi Yüksəlt)
                  </motion.button>
                </div>
              )
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default UniversityDashboard;
