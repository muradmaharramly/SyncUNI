import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiUserCheck, FiTrendingUp, FiFilter, FiX } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import './CommonPages.scss';

const allHistory = [
  { id: 'h1', name: 'Nəzrin Babayeva',  role: 'Dizayner',          date: '2025-11-21', status: 'Uğurlu (Seçilib)' },
  { id: 'h2', name: 'Tural İsmayılov',  role: 'Frontend Dev',      date: '2025-10-15', status: 'Analiz Edilib' },
  { id: 'h3', name: 'Leyla Əliyeva',    role: 'Data Analitik',     date: '2025-06-08', status: 'Gözləmədə' },
  { id: 'h4', name: 'Murad Həsənov',    role: 'Kiber Təhlükəsizlik', date: '2025-03-12', status: 'Uğurlu (Seçilib)' },
  { id: 'h5', name: 'Anar Abbasov',     role: 'Java Backend Dev',  date: '2025-02-01', status: 'Analiz Edilib' },
  { id: 'h6', name: 'Günay Rəsulova',   role: 'E-Commerce Mütəx.', date: '2024-12-20', status: 'Gözləmədə' },
  { id: 'h7', name: 'Pərviz İbrahimov', role: 'DevOps Mühəndisi',  date: '2024-11-05', status: 'Uğurlu (Seçilib)' },
];

const HistoryPage = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = allHistory.filter(item => {
    const d = new Date(item.date);
    if (startDate && d < new Date(startDate)) return false;
    if (endDate   && d > new Date(endDate))   return false;
    return true;
  });

  const clearFilter = () => { setStartDate(''); setEndDate(''); };

  const getStatusClass = (s) =>
    s.includes('Uğurlu') ? 'success' : s.includes('Gözləmədə') ? 'pending' : 'analyzed';

  return (
    <motion.div
      className="history-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h2>Əməliyyat Tarixçəsi</h2>
        <p>Əvvəlki ayların statistikası və platforma üzərindən əldə olunan nəticələr.</p>
      </div>

      {/* Stats */}
      <div className="history-stats">
        <div className="stat-box glass-panel">
          <FiUserCheck className="icon blue" />
          <div className="info"><span>Ümumi Analiz</span><h3>125</h3></div>
        </div>
        <div className="stat-box glass-panel">
          <FiCheckCircle className="icon green" />
          <div className="info"><span>Tamamlanmış</span><h3>84</h3></div>
        </div>
        <div className="stat-box glass-panel">
          <FiTrendingUp className="icon purple" />
          <div className="info"><span>Son 6 Ay (Artım)</span><h3>+24%</h3></div>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="date-filter glass-panel">
        <FiFilter className="filter-icon" />
        <label>Başlanğıc:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label>Son:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        {(startDate || endDate) && (
          <button className="clear-btn" onClick={clearFilter}>
            <FiX /> Sıfırla
          </button>
        )}
        <span className="filter-count">{filtered.length} nəticə</span>
      </div>

      {/* Table */}
      <div className="history-table-container glass-panel">
        <h3><FiClock /> Son Proseslər</h3>
        {filtered.length === 0 ? (
          <p className="empty-state">Seçilmiş tarix aralığında heç bir nəticə tapılmadı.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Tarix</th>
                <th>Namizəd / Tələbə</th>
                <th>Pozisiya / Kateqoriya</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>{new Date(item.date).toLocaleDateString('az-AZ')}</td>
                  <td className="candidate-name">{item.name}</td>
                  <td>{item.role}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryPage;
