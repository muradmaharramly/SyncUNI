import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSearch, FiCheckCircle, FiShield, FiTrendingUp, FiFilter, FiUserCheck, FiCopy } from 'react-icons/fi';
import './CompanyDashboard.scss';

const CompanyDashboard = () => {
  const { data: SYNC_DATA } = useData();
  const [filterQuery, setFilterQuery] = useState('');
  const [gpaFilter, setGpaFilter] = useState(0);
  const [funnelStage, setFunnelStage] = useState('Applicants');
  const [compareList, setCompareList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(SYNC_DATA.students[0]);

  const filteredStudents = SYNC_DATA.students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
                          s.skills.hard.join(',').toLowerCase().includes(filterQuery.toLowerCase());
    const matchesGpa = s.gpa >= gpaFilter;
    const matchesFunnel = funnelStage === 'Applicants' ? s.status === 'Looking' :
                          funnelStage === 'Interview' ? s.status === 'Active' : s.status === 'Hired';
    return matchesSearch && matchesGpa && matchesFunnel;
  });

  const handleVerify = (id) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Vaqidasiya aparılır (Blockchain Ledger)...',
        success: 'Referans təsdiqləndi! ✅',
        error: 'Təsdiqlənmədi',
      }
    );
  };

  const handleCompareToggle = (student) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === student.id)) return prev.filter(p => p.id !== student.id);
      if (prev.length < 2) return [...prev, student];
      toast.error('Maksimum 2 tələbə müqayisə edilə bilər');
      return prev;
    });
  };

  const radarData = [
    { subject: 'Hard Skills', A: selectedStudent.skills.hard.length * 20, fullMark: 100 },
    { subject: 'Soft Skills', A: selectedStudent.skills.soft.length * 30, fullMark: 100 },
    { subject: 'GPA', A: (selectedStudent.gpa / 4) * 100, fullMark: 100 },
    { subject: 'References', A: Math.min(selectedStudent.verifyStatus.references * 15, 100), fullMark: 100 },
    { subject: 'Activity', A: selectedStudent.activityScore, fullMark: 100 },
  ];

  return (
    <div className="company-bento">
      {}
      <div className="bento-panel filter-panel">
        <div className="search-box">
          <FiSearch className="icon"/>
          <input type="text" placeholder="Ad və ya Bacarıq üzrə axtar..." value={filterQuery} onChange={e => setFilterQuery(e.target.value)} />
        </div>
        <div className="range-box">
          <span className="label">GPA &gt; {gpaFilter}</span>
          <input type="range" min="0" max="4" step="0.1" value={gpaFilter} onChange={e => setGpaFilter(e.target.value)} />
        </div>
        <div className="funnel-tabs">
          {['Applicants', 'Interview', 'Verified', 'Offer'].map(stage => (
            <motion.button
              key={stage}
              className={`tab ${funnelStage === stage ? 'active' : ''}`}
              onClick={() => setFunnelStage(stage)}
              whileTap={{ scale: 0.95 }}
            >
              {stage}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="bento-grid">
        {}
        <motion.div className="bento-panel talent-radar" layout>
          <div className="panel-header">
            <h3>Talent Radar: {selectedStudent.name}</h3>
          </div>
          <div className="chart-wrapper talent-radar-chart">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)"/>
                <PolarAngleAxis dataKey="subject" tick={{fill: 'var(--text-muted)', fontSize: 12}}/>
                <Radar name={selectedStudent.name} dataKey="A" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.5} />
                <Tooltip contentStyle={{backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)'}}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="skills-tags">
            {selectedStudent.skills.hard.slice(0,3).map(s => <span key={s} className="tag hard">{s}</span>)}
            {selectedStudent.skills.soft.slice(0,2).map(s => <span key={s} className="tag soft">{s}</span>)}
          </div>
        </motion.div>

        {}
        <motion.div className="bento-panel student-selection" layout>
          <div className="panel-header">
            <h3>Namizədlər ({filteredStudents.length})</h3>
            {compareList.length === 2 && <button className="btn btn--outline btn-sm" onClick={() => toast('Baxılır...')}>Müqayisəni Aç</button>}
          </div>
          <div className="list-wrapper">
            <AnimatePresence>
              {filteredStudents.map(student => (
                <motion.div
                  key={student.id}
                  className={`candidate-card ${selectedStudent.id === student.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="info">
                    <h4>{student.name} <span className="match-score">{student.matchRate}% Uyğun</span></h4>
                    <p>{student.uni} • GPA: {student.gpa}</p>
                  </div>
                  <div className="actions">
                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleCompareToggle(student); }} title="Müqayisəyə at">
                       <FiCopy color={compareList.find(p=>p.id === student.id) ? 'var(--primary-color)' : 'var(--text-muted)'} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredStudents.length > 5 && (
               <div className="text-center sk-block--mt-2">
                  <button className="btn btn--outline btn-sm">Daha çox yüklə</button>
               </div>
            )}
          </div>
        </motion.div>

        {}
        <div className="bento-col">
          <motion.div className="bento-panel accuracy-chart" layout>
            <div className="panel-header">
              <h3>Hiring Accuracy Trend</h3>
            </div>
            <div className="chart-wrapper accuracy-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SYNC_DATA.hiringAccuracyTimeline}>
                  <XAxis dataKey="month" stroke="var(--text-muted)" tick={{fontSize: 12}} />
                  <Tooltip contentStyle={{backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)'}}/>
                  <Line type="monotone" dataKey="score" stroke="var(--primary-color)" strokeWidth={3} dot={{r:4}} />
                  <Line type="monotone" dataKey="expected" stroke="var(--secondary-color)" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div className="bento-panel ref-validator" layout>
            <div className="panel-header">
              <h3>Reference Validator</h3>
            </div>
            {SYNC_DATA.references.map(ref => (
              <div key={ref.id} className="ref-item">
                <p><strong>{ref.teacher}</strong>: "{ref.comment}"</p>
                <motion.button
                  className="btn btn--outline btn-sm"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleVerify(ref.id)}
                >
                  <FiShield /> Doğruluğu Yoxla
                </motion.button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {}
      <AnimatePresence>
        {compareList.length === 2 && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="modal-content glass-panel">
              <div className="modal-header">
                <h2>İki Namizədin Müqayisəsi</h2>
                <button className="close-btn" onClick={() => setCompareList([])}>X</button>
              </div>
              <div className="compare-grid">
                {compareList.map(s => (
                  <div key={s.id} className="comp-card">
                    <h3>{s.name}</h3>
                    <p>GPA: {s.gpa}</p>
                    <p>Score: {s.activityScore}</p>
                    <div className="skills">
                      {s.skills.hard.map(sk => <span key={sk} className="tag hard">{sk}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyDashboard;
