import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUsers, FiCheck, FiX, FiUploadCloud } from 'react-icons/fi';
import './Operations.scss';

const UniversityOperations = () => {
  const { data, endorseStudent } = useData();
  const [partnershipRequests, setPartnershipRequests] = useState([
    { id: 1, company: 'PASHA Bank', requestedAt: '2 days ago', status: 'Pending' },
    { id: 2, company: 'Azercell', requestedAt: '5 days ago', status: 'Pending' }
  ]);

  const handleBulkUpload = () => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Toplu referans faylı yüklənir...',
        success: '150 tələbə üçün referanslar avtomatik yaradıldı!',
        error: 'Xəta baş verdi',
      }
    );
  };

  const manageRequest = (id, action) => {
    setPartnershipRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    toast.success(`Əməkdaşlıq müraciəti ${action === 'Accepted' ? 'qəbul edildi' : 'rədd edildi'}.`);
  };

  return (
    <div className="operations-page">
      <h2>Advanced Operations: Academic Control</h2>
      <p className="desc">Tələbə referanslarının kütləvi idarəsi və Əməkdaşlıq Tələbləri</p>
      
      <div className="operations-grid">
        <motion.div className="op-panel glass-panel">
           <div className="panel-header">
             <h3><FiUploadCloud/> Bulk Reference Upload</h3>
           </div>
           <p>İmtahan nəticələrini (CSV formatında) yükləyərək ən yaxşı tələbələrə avtomatik "Endorsement" verin.</p>
           <button className="btn btn--primary" onClick={handleBulkUpload} style={{marginTop: '1rem'}}>
              Qrup faylını yüklə
           </button>
           <div className="manual-endorse" style={{marginTop: '2rem'}}>
             <h4>Tək-tək Təsdiq</h4>
             <div className="student-list-mini">
               {data.students.slice(0, 3).map(st => (
                 <div key={st.id} className="st-strip">
                   <span>{st.name}</span>
                   <button className="btn btn--outline btn-sm" onClick={() => { endorseStudent(st.id); toast.success('Təsdiqləndi'); }}>Təsdiqlə</button>
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
    </div>
  );
};

export default UniversityOperations;
