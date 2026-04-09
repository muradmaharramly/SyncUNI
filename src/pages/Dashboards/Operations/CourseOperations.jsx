import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiPlus, FiX } from 'react-icons/fi';
import './Operations.scss';

const CourseOperations = () => {
  const { data, addCourse } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');

  const handleEndorse = (studentName) => {
    toast.success(`${studentName} tələbəsinə uğurla Badge verildi!`);
  };

  const handleAddCourse = () => {
    if(!newCourseName) return toast.error('Kursun adını daxil edin');
    addCourse({ name: newCourseName });
    setIsModalOpen(false);
    setNewCourseName('');
  };

  return (
    <div className="operations-page">
      <h2>İdarəetmə Paneli (Tədris Mərkəzləri)</h2>
      <p className="desc">Tələbələrin bacarıqlarını təsdiqləyin və yeni kurslar elan edin.</p>

      <div className="operations-grid">
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3>Tələbə Bacarıqlarını Təsdiqləmə (Endorsement)</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>Kursunuzu uğurla bitirən tələbələrə "Verify" statusu qazandırın:</p>

          <div className="student-list-mini">
            {data.students.slice(0, 5).map(st => (
              <div key={st.id} className="st-strip" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <strong style={{display: 'block', color: 'var(--primary-color)'}}>{st.name}</strong>
                  <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{st.skills.hard[0]} kursu</span>
                </div>
                <button className="btn btn--outline btn-sm" onClick={() => handleEndorse(st.name)}>
                   Badge Ver
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3>Kurs İdarəetməsi</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>Aktiv kurslar və elanlar paneli</p>

          <button className="btn btn--primary" onClick={() => setIsModalOpen(true)} style={{width: '100%', marginBottom: '1rem'}}>
             <FiPlus /> Yeni Kurs Yarat
          </button>

          <div className="requests-list">
             <div className="req-card accepted">
               <div className="info">
                 <strong>Advanced React & Redux</strong>
                 <span className="time">Aktivdir, 45 Tələbə</span>
               </div>
               <FiCheckCircle color="var(--success)" size={20}/>
             </div>
             <div className="req-card">
               <div className="info">
                 <strong>UI/UX Masterclass</strong>
                 <span className="time">Qeydiyyat davam edir</span>
               </div>
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="modal-content glass-panel" style={{ background: 'var(--bg-color)', zIndex: 1000, padding: '2rem', width: '90%', maxWidth: '500px', borderRadius: '16px'}}>
              <div className="modal-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                <h3 style={{color: 'var(--text-main)'}}>Yeni Kurs Elanı</h3>
                <button className="icon-btn toggle-btn" onClick={() => setIsModalOpen(false)} style={{background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer'}}><FiX size={24}/></button>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)'}}>Kursun Adı</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  style={{width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--hover-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)'}}
                  placeholder="Məs. Node.js Masterclass"
                />
              </div>
              <button className="btn btn--primary" style={{width: '100%'}} onClick={handleAddCourse}>Təsdiqlə</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseOperations;
