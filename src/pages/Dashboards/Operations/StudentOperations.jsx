import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiTarget, FiDownloadCloud, FiCheck } from 'react-icons/fi';
import './Operations.scss';

const StudentOperations = () => {
  const { data } = useData();
  const { user } = useAuth();
  const student = data.students.find(s => s.name === user.name) || data.students[0];

  const [selectedGoal, setSelectedGoal] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGeneratePDF = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Super CV Generasiya olunur (AI Engine)...',
        success: 'PDF faylı uğurla endirildi!',
        error: 'Xəta',
      }
    );
  };

  const getMissingSkills = () => {
    if (!selectedGoal) return [];
    if (selectedGoal === 'Frontend Developer') return ['TypeScript', 'Next.js', 'Redux'];
    if (selectedGoal === 'Data Scientist') return ['Machine Learning', 'TensorFlow'];
    return ['Agile', 'Communication'];
  };

  return (
    <div className="operations-page">
      <h2>İcra Mərkəzi (Goal Tracking)</h2>
      <p className="desc">Karyera hədəflərini izlə, əskikləri tamamla və Portfolio yarat.</p>
      
      <div className="operations-grid">
        {/* Skill-to-Job Simulator */}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiTarget /> Skill-to-Job Simulator</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>Arzuladığınız peşəni seçin və çatmıyan bacarıqları To-do list şəklində görün:</p>
          
          <div className="custom-dropdown-container" style={{ position: 'relative', marginBottom: '1rem' }}>
            <div 
              className="custom-dropdown-selected" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: '100%', padding: '10px 15px', borderRadius: '8px', 
                background: 'var(--hover-bg)', color: 'var(--text-main)', 
                border: '1px solid var(--border-color)', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <span>{selectedGoal || '-- Məqsəd Seçin --'}</span>
              <span style={{ fontSize: '0.8rem', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="custom-dropdown-options glass-panel"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, 
                    marginTop: '5px', borderRadius: '8px', overflow: 'hidden',
                    background: 'var(--bg-color)', zIndex: 10,
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  <div 
                    className="custom-dropdown-option"
                    onClick={() => { setSelectedGoal(''); setIsDropdownOpen(false); }}
                    style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                  >
                    -- Məqsəd Seçin --
                  </div>
                  {['Frontend Developer', 'Data Scientist', 'Project Manager'].map(option => (
                    <div 
                      key={option}
                      className="custom-dropdown-option"
                      onClick={() => { setSelectedGoal(option); setIsDropdownOpen(false); }}
                      style={{ 
                        padding: '10px 15px', cursor: 'pointer',
                        background: selectedGoal === option ? 'var(--hover-bg)' : 'transparent',
                        color: selectedGoal === option ? 'var(--primary-color)' : 'var(--text-main)'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {selectedGoal && (
            <div className="todo-list">
              <h4 style={{marginBottom: '10px', color: 'var(--primary-color)'}}>Action Plan:</h4>
              {getMissingSkills().map((skill, i) => (
                <div key={i} className="st-strip" style={{ borderLeft: '3px solid var(--warning)', paddingLeft: '10px' }}>
                  <span>{skill} öyrənməlisiniz</span>
                  <button className="btn btn--outline btn-sm" onClick={() => toast('Plan əlavə edildi')}>Qeyd al</button>
                </div>
              ))}
              <div className="st-strip" style={{ borderLeft: '3px solid var(--success)', paddingLeft: '10px' }}>
                <span style={{textDecoration: 'line-through'}}>{student.skills.hard[0]} - Tamamlanıb</span>
                <FiCheck color="var(--success)"/>
              </div>
            </div>
          )}
        </motion.div>

        {/* Portfolio Builder */}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiDownloadCloud /> Portfolio / CV Builder</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>
             Mövcud akademik GPA-niz, kurslarınız, təsdiqlənmiş referanslarınız və "Match Score"unuz əsasında peşəkar dizaynlı bir PDF CV generasiya edin.
          </p>
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <motion.button 
               className="btn btn--primary"
               onClick={handleGeneratePDF}
               whileHover={{ scale: 1.01 }}
               whileTap={{ scale: 0.95 }}
            >
               SyncUNI CV Yarat (AI format)
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentOperations;
