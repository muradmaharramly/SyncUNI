import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useAIAgent } from '../context/AIAgentContext';
import { FiHome, FiTrendingUp, FiBriefcase, FiAward, FiMenu, FiX, FiUser, FiSettings, FiClock, FiCreditCard, FiBell, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SkeletonDashboardHeader } from './SkeletonLoader';
import './DashboardLayout.scss';

const DashboardLayout = () => {
  const { user } = useAuth();
  const { data, loading } = useData();
  const { unreadCount } = useAIAgent();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return <Navigate to="/login" replace />;

  // Derive quick stats from live API data
  let stats = [];
  if (user.role === 'company') {
    const comp = data.companies?.[0];
    stats = [
      { id: 1, label: 'Tələbə Bazası', value: data.students.length, icon: <FiTrendingUp /> },
      { id: 2, label: 'Aktiv Vakansiya', value: comp?.activeAds ?? '—', icon: <FiBriefcase /> },
      { id: 3, label: 'Uyğunluq Reytinqi', value: `${comp?.efficiency ?? 0}%`, icon: <FiAward /> },
    ];
  } else if (user.role === 'university') {
    const uni = data.universities?.[0];
    stats = [
      { id: 1, label: 'Ümumi Tələbə', value: uni?.totalStudents ?? data.students.length, icon: <FiTrendingUp /> },
      { id: 2, label: 'Məşğulluq Faizi', value: `${uni?.placementRate ?? 0}%`, icon: <FiBriefcase /> },
      { id: 3, label: 'Verilən Referanslar', value: data.references?.length ?? 0, icon: <FiAward /> },
    ];
  } else if (user.role === 'student') {
    const st = data.students?.[0];
    stats = [
      { id: 1, label: 'Sistem Reytinqi', value: st?.activityScore ?? 0, icon: <FiTrendingUp /> },
      { id: 2, label: 'Vakansiya Uyğunluğu', value: `${st?.matchRate ?? 0}%`, icon: <FiBriefcase /> },
      { id: 3, label: 'Öyrənilən Bacarıq', value: (st?.skills.hard.length ?? 0) + (st?.skills.soft.length ?? 0), icon: <FiAward /> },
    ];
  } else if (user.role === 'course') {
    stats = [
      { id: 1, label: 'Aktiv Kurs', value: 3, icon: <FiTrendingUp /> },
      { id: 2, label: 'Tələbə Sayı', value: 45, icon: <FiBriefcase /> },
      { id: 3, label: 'Bazar Payı', value: '8.5%', icon: <FiAward /> },
    ];
  }

  return (
    <div className={`dashboard-layout ${!isSidebarOpen ? 'layout--collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className={`dashboard-sidebar glass-panel ${!isSidebarOpen ? 'collapsed' : ''}`}>
        <div className="dashboard-sidebar__header">
          {isSidebarOpen && <h3>Panel</h3>}
          <button className="icon-btn toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <nav className="dashboard-sidebar__nav">
          <Link
            to={`/dashboard/${user.role}`}
            className={`dashboard-sidebar__link ${location.pathname === `/dashboard/${user.role}` ? 'active' : ''}`}
            title="Xülasə"
          >
            <FiHome /> {isSidebarOpen && <span>Xülasə</span>}
          </Link>
          <Link
            to={`/dashboard/${user.role}/operations`}
            className={`dashboard-sidebar__link ${location.pathname.includes('/operations') ? 'active' : ''}`}
            title="Əməliyyatlar"
          >
            <FiBriefcase /> {isSidebarOpen && <span>Əməliyyatlar</span>}
          </Link>
          {user.role !== 'student' && (
            <Link
              to={`/dashboard/${user.role}/analytics`}
              className={`dashboard-sidebar__link ${location.pathname.includes('/analytics') ? 'active' : ''}`}
              title="Analitika"
            >
              <FiTrendingUp /> {isSidebarOpen && <span>Analitika</span>}
            </Link>
          )}

          {(user.role === 'university' || user.role === 'student') && (
            <Link
              to={`/dashboard/${user.role}/elanlar`}
              className={`dashboard-sidebar__link ${location.pathname.includes('/elanlar') ? 'active' : ''}`}
              title="Elanlar"
            >
              <FiBell /> {isSidebarOpen && <span>Elanlar</span>}
            </Link>
          )}

          {/* SyncAI Agent — yalnız company, university, course üçün */}
          {user.role !== 'student' && (
            <Link
              to={`/dashboard/${user.role}/agent`}
              className={`dashboard-sidebar__link agent-link ${location.pathname.includes('/agent') ? 'active' : ''}`}
              title="SyncAI Agent"
            >
              <span className="agent-link__icon-wrap">
                <div className="agent-icon-wrap-sidebar">
                  <span className="agent-pulse" />
                </div>
                {unreadCount > 0 && <span className="agent-pulse-dot" />}
              </span>
              {isSidebarOpen && <span>AI Agent</span>}
              {isSidebarOpen && unreadCount > 0 && (
                <span className="agent-badge">{unreadCount}</span>
              )}
            </Link>
          )}

          <Link
            to={`/dashboard/${user.role}/history`}
            className={`dashboard-sidebar__link ${location.pathname.includes('/history') ? 'active' : ''}`}
            title="Tarixçə"
          >
            <FiClock /> {isSidebarOpen && <span>Tarixçə</span>}
          </Link>

          {user.role !== 'student' && (
            <Link
              to={`/dashboard/${user.role}/subscription`}
              className={`dashboard-sidebar__link ${location.pathname.includes('/subscription') ? 'active' : ''}`}
              title="Abunəlik"
            >
              <FiCreditCard /> {isSidebarOpen && <span>Abunəlik</span>}
            </Link>
          )}

        </nav>

        <div className="dashboard-sidebar__footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link
            to={`/dashboard/${user.role}/profile`}
            className={`dashboard-sidebar__link ${location.pathname.includes('/profile') ? 'active' : ''}`}
            title="Profil"
          >
            <FiUser /> {isSidebarOpen && <span>Profil</span>}
          </Link>

          {user.role !== 'student' && (
            <Link
              to={`/dashboard/${user.role}/settings`}
              className={`dashboard-sidebar__link ${location.pathname.includes('/settings') ? 'active' : ''}`}
              title="Tənzimləmələr"
            >
              <FiSettings /> {isSidebarOpen && <span>Tənzimləmələr</span>}
            </Link>
          )}
        </div>
      </aside>

      <main className="dashboard-main">
        {/* Dynamic Global Greeting & Stats Bento */}
        {loading ? (
          <SkeletonDashboardHeader />
        ) : (
          <motion.div
            className="dashboard-header-bento"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="greeting-card glass-panel">
              <h1>Xoş gəldiniz, <span>{user.name}</span></h1>
              <p>Bütün analitik datanız və karyera indikatorlarınız burada yenilənir.</p>
            </div>

            <div className="stats-container">
              {stats.map(stat => (
                <motion.div
                  key={stat.id}
                  className="stat-card glass-panel"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="icon-wrapper">{stat.icon}</div>
                  <div className="stat-info">
                    <span className="label">{stat.label}</span>
                    <strong className="value">{stat.value}</strong>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Dashboard Specific Content */}
        <div className="dashboard-main__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
