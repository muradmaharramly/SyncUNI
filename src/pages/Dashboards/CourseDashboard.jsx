import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiCheckCircle, FiUsers, FiStar, FiBook } from 'react-icons/fi';
import Modal from '../../components/Common/Modal';
import './CourseDashboard.scss';

const CourseDashboard = () => {
  const { data: SYNC_DATA, createCourse } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '', category: '', instructor: '' });

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name) return;
    await createCourse(newCourse);
    setIsModalOpen(false);
    setNewCourse({ name: '', category: '', instructor: '' });
  };

  return (
    <div className="course-dashboard">
      <div className="dashboard-grid">

        {}
        <section className="panel course-listings">
          <div className="panel-header">
            <h2>Kurs Elanları</h2>
            <button className="btn btn--outline btn-sm" onClick={() => setIsModalOpen(true)}>+ Yeni Kurs</button>
          </div>
          <div className="courses-grid">
            {SYNC_DATA.courses.map((course, idx) => (
              <motion.div 
                key={course.id || idx} 
                className="course-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="course-card__icon"><FiBook /></div>
                <h3>{course.name}</h3>
                <p className="category">{course.category}</p>
                <div className="course-stats">
                  <span><FiUsers /> {course.enrolled || 0} Tələbə</span>
                  <span className="rating"><FiStar /> {course.rating || 5.0}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {}
        <section className="panel skill-endorsement">
          <h2>Bacarıq Təsdiqləməsi (Endorsement)</h2>
          <p className="desc">Kursu bitirən tələbələrə "Badge" (nişan) verərək onların bacarıqlarını təsdiqləyin.</p>

          <div className="student-list">
            {SYNC_DATA.students.filter(s => s.verifyStatus && s.verifyStatus.courses && s.verifyStatus.courses.length > 0).map(student => (
              <div key={student.id} className="student-endorse-card">
                <div className="info">
                  <h4>{student.name}</h4>
                  <p>{student.uni}</p>
                </div>
                <div className="course-status">
                  {student.verifyStatus.courses.map((c, i) => (
                    <div key={i} className="c-item">
                      <span className="c-name">{c}</span>
                      <span className="badge true"><FiCheckCircle /> Təsdiqlənib</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* NEW COURSE MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni Kurs Yarat"
        footer={(
          <>
            <button className="btn btn--outline" onClick={() => setIsModalOpen(false)}>İmtina</button>
            <button className="btn btn--primary" onClick={handleCreateCourse}>Kursu Yerləşdir</button>
          </>
        )}
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Kursun Adı</label>
            <input 
              type="text" 
              placeholder="Məsələn: İleri Səviyyə React" 
              value={newCourse.name} 
              onChange={e => setNewCourse({...newCourse, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Kateqoriya</label>
            <input 
              type="text" 
              placeholder="Məsələn: Proqramlaşdırma" 
              value={newCourse.category} 
              onChange={e => setNewCourse({...newCourse, category: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Təlimçi / Müəssisə</label>
            <input 
              type="text" 
              placeholder="Məsələn: CodeAcademy" 
              value={newCourse.instructor} 
              onChange={e => setNewCourse({...newCourse, instructor: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

import { motion } from 'framer-motion';
export default CourseDashboard;
