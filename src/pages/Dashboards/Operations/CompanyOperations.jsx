import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCheck, FiX, FiCalendar, FiSend, FiPlus, FiChevronDown } from 'react-icons/fi';
import { SkeletonTable, SkeletonStatCards } from '../../../components/SkeletonLoader';
import Modal from '../../../components/Common/Modal';
import './Operations.scss';

const CompanyOperations = () => {
  const { data, loading, updateFunnelStatus, hireStudent, createJob } = useData();
  const { user } = useAuth();
  const [activeStage, setActiveStage] = useState('Applicants');
  const [draggedStage, setDraggedStage] = useState(null);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', type: 'Full-time' });
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Remote'];

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!newJob.title) return;
    await createJob({ ...newJob, company: user.name });
    setIsJobModalOpen(false);
    setNewJob({ title: '', type: 'Full-time' });
  };

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
    e.preventDefault();
    setDraggedStage(stage);
  };

  const handleDragLeave = () => {
    setDraggedStage(null);
  }

  const stages = ['Applicants', 'Interview', 'Verified', 'Offer'];

  const getStageStudents = (stage) => {
    return data.students.filter(s => {
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
      {loading ? (
        <>
          <h2 className="sk-block--mt-3 opacity-0-5">Advanced Operations: Recruitment Flow</h2>
          <SkeletonStatCards count={4} />
          <div className="sk-block--mt-3">
            <SkeletonTable rows={6} cols={5} />
          </div>
        </>
      ) : (
        <>
          <div className="operations-header-flex">
            <div>
              <div className="flex-align-center-gap-1">
                <h2>Recruitment Flow</h2>
              </div>
              <p className="desc no-margin-bottom">Tələbələri sütunlar arası sürükləyərək statuslarını yeniləyin.</p>
            </div>

            <div className='operate-acts'>
              <div className="stages-bar glass-panel">
                {stages.map(stage => (
                  <div
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                    onDrop={(e) => handleDrop(e, stage)}
                    onDragOver={(e) => handleDragOver(e, stage)}
                    onDragLeave={handleDragLeave}
                    className={`stage-item ${activeStage === stage ? 'active' : ''} ${draggedStage === stage ? 'dragged' : ''}`}
                  >
                    {stage}
                  </div>

                ))}

              </div>
              <button className="btn btn--primary btn-sm margin-auto" onClick={() => setIsJobModalOpen(true)}>
                <FiPlus /> Yeni Vakansiya
              </button>
            </div>

          </div>

          <div className="kanban-grid-layout">
            <AnimatePresence mode='popLayout'>
              {getStageStudents(activeStage).map(st => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={st.id}
                  className="kanban-card glass-panel grab-cursor"
                  draggable
                  onDragStart={(e) => handleDragStart(e, st.id)}
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="kanban-card__title">{st.name}</h4>
                  <p className="kanban-card__subtitle">
                    GPA: {st.gpa} | Score: {st.activityScore}
                  </p>
                  <div className="quick-actions">
                    <button className="icon-btn transparent-bg" onClick={() => toast.success('İmtina məktubu göndərildi!')} title="Reject"><FiX color="var(--danger)" /></button>
                    <button className="icon-btn transparent-bg" onClick={() => toast('Təqvimlə görüş təyin edildi')} title="Schedule"><FiCalendar color="var(--secondary-color)" /></button>
                    <button className="icon-btn transparent-bg" onClick={() => toast.success('Feedback göndərildi')} title="Feedback"><FiSend color="var(--primary-color)" /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {getStageStudents(activeStage).length === 0 && (
              <p className="text-muted">Bu mərhələdə hələ tələbə yoxdur.</p>
            )}
          </div>

          {/* NEW JOB MODAL */}
          <Modal
            isOpen={isJobModalOpen}
            onClose={() => setIsJobModalOpen(false)}
            title="Yeni Vakansiya Yarat"
            className="modal--overflow-visible"
            footer={(
              <>
                <button className="btn btn--outline" onClick={() => setIsJobModalOpen(false)}>İmtina</button>
                <button className="btn btn--primary" onClick={handleCreateJob}>Vakansiyanı Paylaş</button>
              </>
            )}
          >
            <div className="modal-form">
              <div className="form-group">
                <label>Vakansiya Başlığı</label>
                <input
                  type="text"
                  placeholder="Məsələn: Frontend Developer"
                  value={newJob.title}
                  onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>İş Növü</label>
                <div className="custom-select-container">
                  <div
                    className="select-trigger"
                    onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}
                  >
                    <span>{newJob.type}</span>
                    <FiChevronDown className={`arrow-icon ${isTypeMenuOpen ? 'open' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isTypeMenuOpen && (
                      <motion.div
                        className="select-options"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {jobTypes.map(type => (
                          <div
                            key={type}
                            className={`option-item ${newJob.type === type ? 'selected' : ''}`}
                            onClick={() => {
                              setNewJob({ ...newJob, type });
                              setIsTypeMenuOpen(false);
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CompanyOperations;
