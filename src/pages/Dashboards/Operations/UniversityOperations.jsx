import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUsers, FiCheck, FiX, FiUploadCloud, FiSearch, FiTrash2 } from 'react-icons/fi';
import { SkeletonTable } from '../../../components/SkeletonLoader';
import Modal from '../../../components/Common/Modal';
import './Operations.scss';

const UniversityOperations = () => {
  const { data, loading, endorseStudent, bulkUpload } = useData();
  const { user } = useAuth();
  const [confirmedIds, setConfirmedIds] = useState(new Set());
  
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [parsedItems, setParsedItems] = useState([]);

  const handleEndorse = (id) => {
    endorseStudent(id);
    setConfirmedIds(prev => new Set(prev).add(id));
    toast.success('Təsdiqləndi');
  };

  const handleProcessBulk = () => {
    const lines = bulkText.split('\n').filter(l => l.trim());
    const items = lines.map(line => {
      const parts = line.split(/[,\t]/).map(p => p.trim());
      if (parts.length >= 2) {
        return { name: parts[0], email: parts[1] };
      }
      return null;
    }).filter(i => i && i.email.includes('@'));

    setParsedItems(items);
  };

  const handleConfirmBulk = async () => {
    if (parsedItems.length === 0) return;
    await bulkUpload(parsedItems, user.id, user.name);
    setIsBulkModalOpen(false);
    setBulkText('');
    setParsedItems([]);
  };

  const [partnershipRequests, setPartnershipRequests] = useState([
    { id: 1, company: 'PASHA Bank', requestedAt: '2 days ago', status: 'Pending' },
    { id: 2, company: 'Azercell', requestedAt: '5 days ago', status: 'Pending' }
  ]);

  const manageRequest = (id, action) => {
    setPartnershipRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(`Əməkdaşlıq müraciəti ${action === 'Accepted' ? 'qəbul edildi' : 'rədd edildi'}.`);
  };

  return (
    <div className="operations-page">
      {loading ? (
        <>
          <h2 style={{ marginBottom: '1.5rem', opacity: 0.5 }}>Advanced Operations: Academic Control</h2>
          <SkeletonTable rows={5} cols={4} />
        </>
      ) : (
      <>
      <h2>Advanced Operations: Academic Control</h2>
      <p className="desc">Tələbə referanslarının kütləvi idarəsi və Əməkdaşlıq Tələbləri</p>

      <div className="operations-grid">
        <motion.div className="op-panel glass-panel">
           <div className="panel-header">
             <h3><FiUploadCloud/> Bulk Student Invitation</h3>
           </div>
           <p>Yeni tələbələri toplu şəkildə dəvət etmək üçün bu innovativ 'Smart Paste' metodundan istifadə edin.</p>
           <button className="btn btn--primary" onClick={() => setIsBulkModalOpen(true)} style={{marginTop: '1rem'}}>
              Toplu Siyahını Yüklə
           </button>
           <div className="manual-endorse" style={{marginTop: '2rem'}}>
             <h4>Tək-tək Təsdiq</h4>
             <div className="student-list-mini">
               {data.students.slice(0, 3).map(st => (
                 <div key={st.id} className="st-strip">
                   <span>{st.name}</span>
                   <button
                     className={`btn btn-sm ${confirmedIds.has(st.id) ? 'btn--confirmed' : 'btn--outline'}`}
                     onClick={() => !confirmedIds.has(st.id) && handleEndorse(st.id)}
                     disabled={confirmedIds.has(st.id)}
                   >
                     {confirmedIds.has(st.id) ? <><FiCheck style={{marginRight: '4px'}} /> Təsdiqlənib</> : 'Təsdiqlə'}
                   </button>
                 </div>
               ))}
             </div>
           </div>
        </motion.div>

        <motion.div className="op-panel glass-panel">
           <div className="panel-header">
             <h3><FiUsers/> Partnership Request Manager</h3>
           </div>
           <p style={{marginBottom: '1rem'}}>Şirkətlərdən gələn CV Baza çıxışı tələbləri:</p>
           <div className="requests-list">
             {partnershipRequests.map(req => (
               <div key={req.id} className={`req-card ${req.status.toLowerCase()}`}>
                 <div className="info">
                   <strong>{req.company}</strong>
                   <span className="time">{req.requestedAt}</span>
                 </div>
                 {req.status === 'Pending' ? (
                   <div className="actions">
                     <button className="icon-btn success" onClick={() => manageRequest(req.id, 'Accepted')}><FiCheck/></button>
                     <button className="icon-btn danger" onClick={() => manageRequest(req.id, 'Rejected')}><FiX/></button>
                   </div>
                 ) : (
                   <span className="status-badge">{req.status}</span>
                 )}
               </div>
             ))}
           </div>
         </motion.div>
      </div>

      {/* SMART BULK UPLOAD MODAL */}
      <Modal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        title="Smart Bulk Upload (Tələbə Siyahısı)"
        size="large"
        footer={(
          <>
            <button className="btn btn--outline" onClick={() => setIsBulkModalOpen(false)}>İmtina</button>
            <button 
              className="btn btn--primary" 
              onClick={handleConfirmBulk} 
              disabled={parsedItems.length === 0}
            >
              {parsedItems.length} Tələbəni Əlavə Et
            </button>
          </>
        )}
      >
        <div className="bulk-upload-ui">
          <div className="instruction-box" style={{ background: 'var(--hover-bg)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Excel və ya CSV faylındakı sütunları (Ad, E-poçt) aşağıdakı sahəyə yapışdırın. Sistem avtomatik olaraq məlumatları təmizləyəcək.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: parsedItems.length > 0 ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
            <div className="modal-form">
              <div className="form-group">
                <label>Siyahını Yapışdırın:</label>
                <textarea 
                  placeholder="Məsələn:&#10;Aysel Məmmədova, aysel@uni.edu.az&#10;Orxan Vəliyev, orxan@uni.edu.az"
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  onBlur={handleProcessBulk}
                  style={{ height: '300px', resize: 'none' }}
                />
              </div>
            </div>
            
            {parsedItems.length > 0 && (
              <div className="preview-area">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-muted)' }}>Önizləmə ({parsedItems.length}):</label>
                <div style={{ height: '300px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(0,0,0,0.1)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1 }}>
                      <tr>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Ad</th>
                        <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>E-poçt</th>
                        <th style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedItems.map((item, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>{item.name}</td>
                          <td style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>{item.email}</td>
                          <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}><FiCheck color="var(--success)"/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
      </>
      )}
    </div>
  );
};

export default UniversityOperations;
