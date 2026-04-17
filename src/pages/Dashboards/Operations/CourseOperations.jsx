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
          <p className="sk-block--mt-2 mb-2">Kursunuzu uğurla bitirən tələbələrə "Verify" statusu qazandırın:</p>

          <div className="student-list-mini">
            {data.students.slice(0, 5).map(st => (
              <div key={st.id} className="st-strip flex-between-center">
                <div>
                  <strong className="block color-primary">{st.name}</strong>
                  <span className="text-sm text-muted">{st.skills.hard[0]} kursu</span>
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
          <p className="sk-block--mt-2 mb-2">Aktiv kurslar və elanlar paneli</p>

          <button className="btn btn--primary btn--full sk-block--mt-2 mb-2" onClick={() => setIsModalOpen(true)}>
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
            <div className="modal-content glass-panel modal--sm">
              <div className="modal-header flex-between">
                <h3>Yeni Kurs Elanı</h3>
                <button className="icon-btn transparent-bg" onClick={() => setIsModalOpen(false)}><FiX size={24}/></button>
              </div>
              <div className="sk-block--mt-2 mb-2">
                <label className="block text-muted sk-block--mt-1 mb-1">Kursun Adı</label>
                <input
                  type="text"
                  className="input-field"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Məs. Node.js Masterclass"
                />
              </div>
              <button className="btn btn--primary btn--full" onClick={handleAddCourse}>Təsdiqlə</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseOperations;
