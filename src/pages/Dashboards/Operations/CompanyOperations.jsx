import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiCalendar, FiSend } from 'react-icons/fi';
import './Operations.scss';

const CompanyOperations = () => {
  const { data, updateFunnelStatus, hireStudent } = useData();
  const [activeStage, setActiveStage] = useState('Applicants');
  const [draggedStage, setDraggedStage] = useState(null);

  const handleDrop = (e, stage) => {
    e.preventDefault();
    setDraggedStage(null);
    const studentId = e.dataTransfer.getData("studentId");
    if (!studentId) return;

    if (stage === 'Offer') {
      hireStudent(studentId);
    } else {
      updateFunnelStatus(studentId, stage);
    }
  };

  const handleDragStart = (e, studentId) => {
    e.dataTransfer.setData("studentId", studentId);
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault(); // necessary to allow dropping
    setDraggedStage(stage);
  };

  const handleDragLeave = () => {
    setDraggedStage(null);
  }

  const stages = ['Applicants', 'Interview', 'Verified', 'Offer'];

  // Match our custom funnel stages to actual statuses or dynamically use funnelStage property
  // Since our dummy data didn't have funnelStage, we map logic (or assume funnelStage exists)
  const getStageStudents = (stage) => {
    return data.students.filter(s => {
      // Map initial statuses to funnel stages specifically if not defined
      let initialStage = 'Applicants';
      if (s.status === 'Looking') initialStage = 'Applicants';
      if (s.status === 'Active') initialStage = 'Interview';
      if (s.status === 'Hired') initialStage = 'Offer';
      
      const currentStage = s.funnelStage || initialStage;
      return currentStage === stage;
    });
  };

  return (
    <div className="operations-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h2>Advanced Operations: Recruitment Flow</h2>
          <p className="desc" style={{marginBottom: 0}}>Tələbələri sütunlar arası sürükləyərək statuslarını yeniləyin (Tab-lara Drag and Drop)</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {stages.map(stage => (
            <div 
              key={stage}
              onClick={() => setActiveStage(stage)}
              onDrop={(e) => handleDrop(e, stage)}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: activeStage === stage ? 'bold' : 'normal',
                background: activeStage === stage ? 'var(--primary-color)' : (draggedStage === stage ? 'var(--hover-bg)' : 'transparent'),
                color: activeStage === stage ? '#fff' : 'var(--text-main)',
                transition: 'all 0.2s',
                border: draggedStage === stage ? '1px dashed var(--primary-color)' : '1px solid transparent'
              }}
            >
              {stage}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem'
        }}>
        <AnimatePresence mode='popLayout'>
          {getStageStudents(activeStage).map(st => (
            <motion.div 
              layout
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.9}}
              key={st.id} 
              className="kanban-card glass-panel"
              draggable
              onDragStart={(e) => handleDragStart(e, st.id)}
              whileHover={{ scale: 1.01 }}
              style={{ cursor: 'grab', padding: '1.5rem' }}
            >
              <h4 style={{ color: 'var(--primary-color)', fontSize: '1.1rem', marginBottom: '0.2rem'}}>{st.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                GPA: {st.gpa} | Score: {st.activityScore}
              </p>
              <div className="quick-actions" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button className="icon-btn" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => toast.success('İmtina məktubu göndərildi!')} title="Reject"><FiX color="var(--danger)"/></button>
                <button className="icon-btn" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => toast('Təqvimlə görüş təyin edildi')} title="Schedule"><FiCalendar color="var(--secondary-color)"/></button>
                <button className="icon-btn" style={{background:'transparent', border:'none', cursor:'pointer'}} onClick={() => toast.success('Feedback göndərildi')} title="Feedback"><FiSend color="var(--primary-color)"/></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {getStageStudents(activeStage).length === 0 && (
          <p style={{ color: 'var(--text-muted)' }}>Bu mərhələdə hələ tələbə yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyOperations;
