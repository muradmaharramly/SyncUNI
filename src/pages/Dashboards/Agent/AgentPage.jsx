import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiX, FiChevronRight, FiClock, FiZap, FiGlobe } from 'react-icons/fi';
import { useAIAgent } from '../../../context/AIAgentContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { PuffLoader } from 'react-spinners';
import './AgentPage.scss';

const PRIORITY_COLORS = {
  high:   { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   dot: '#ef4444',  label: 'Yüksək' },
  medium: { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)',  dot: '#f59e0b',  label: 'Orta'   },
  low:    { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)',   dot: '#6366f1',  label: 'Normal' },
};

const fmtTime = (d) => d ? d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }) : '—';

const AgentPage = () => {
  const {
    notifications,
    globalInsight,
    agentLoading,
    isGlobalLoading,
    lastRunAt,
    runAgent,
    dismissNotification,
    markAllRead
  } = useAIAgent();

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleActionClick = (actionStr) => {
    if (!actionStr) return;
    const str = actionStr.toLowerCase();
    const base = `/dashboard/${user?.role || 'company'}`;
    
    if (str.includes('namizəd') || str.includes('siyahı') || str.includes('tələbə') || str.includes('məzun') || str.includes('filtrlə')) {
      navigate(`${base}/operations`);
    } else if (str.includes('hesabat') || str.includes('analitik') || str.includes('trend')) {
      navigate(`${base}/analytics`);
    } else if (str.includes('ayarlar') || str.includes('tənzimləmə')) {
      navigate(`${base}/settings`);
    } else if (str.includes('kurs') || str.includes('əlavə') || str.includes('tanıt')) {
      navigate(`${base}/operations`);
    } else if (str.includes('sorğu') || str.includes('əməkdaşlıq') || str.includes('mesaj')) {
       navigate(`${base}/operations`);
    } else {
      navigate(`${base}`);
    }
  };

  return (
    <motion.div
      className="agent-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {}
      <div className="agent-header">
        <div className="agent-header__left">
          <div className="agent-icon-wrap">
            <span className="agent-pulse" />
          </div>
          <div>
            <h2>SyncAI Agent</h2>
            <p>
              {agentLoading
                ? 'Data analiz edilir...'
                : `Son yeniləmə: ${fmtTime(lastRunAt)}`}
            </p>
          </div>
        </div>
        <div className="agent-header__right">
          {notifications.length > 0 && (
            <button className="btn btn--outline btn-sm" onClick={markAllRead}>
              Hamısını oxundu say
            </button>
          )}
          <button
            className={`agent-refresh-btn ${agentLoading ? 'spinning' : ''}`}
            onClick={runAgent}
            disabled={agentLoading}
            title="Yenidən analiz et"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {agentLoading ? (
        <div className="agent-loading-state">
          <PuffLoader color="#6366f1" size={60} />
          <p>AI Agent datanı analiz edir...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="agent-empty">
          <FiZap className="empty-icon" />
          <p>Hazırda yeni bildiriş yoxdur. Agent aktivdir.</p>
        </div>
      ) : (
        <div className="agent-notifications">
          {}
          <AnimatePresence>
            {(globalInsight || isGlobalLoading) && (
              <motion.div
                className="agent-card global-insight-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="global-badge">
                  <FiGlobe /> <span>Global AI Insights</span>
                </div>
                {isGlobalLoading ? (
                  <div className="global-insight-loading">
                    <div className="mini-loader" />
                    <span>Bazar analizi aparılır...</span>
                  </div>
                ) : (
                  <>
                    <div className="agent-card__head">
                      <h4 className="agent-card__title">{globalInsight.title}</h4>
                    </div>
                    <p className="agent-card__body">{globalInsight.body}</p>
                    <div className="global-footer">
                      AI tərəfindən real vaxtda hazırlanıb
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {notifications.map((n, i) => {
              const colors = PRIORITY_COLORS[n.priority] || PRIORITY_COLORS.low;
              return (
                <motion.div
                  key={n.id}
                  className="agent-card glass-panel"
                  style={{ borderColor: colors.border, background: colors.bg }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, paddingTop: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  layout
                >
                  {}
                  <button className="agent-card__dismiss" onClick={() => dismissNotification(n.id)}>
                    <FiX />
                  </button>

                  {}
                  <div className="agent-card__head">
                    <div>
                      <h4 className="agent-card__title">{n.title}</h4>
                      <span
                        className="agent-priority-badge"
                        style={{ background: colors.bg, color: colors.dot, borderColor: colors.border }}
                      >
                        <span className="badge-dot" style={{ background: colors.dot }} />
                        {colors.label}
                      </span>
                    </div>
                  </div>

                  {}
                  <p className="agent-card__body">{n.body}</p>

                  {}
                  <div className="agent-card__actions">
                    {n.actions.map((action, j) => (
                      <button
                        key={j}
                        className={`agent-action-btn ${j === 0 ? 'primary' : 'ghost'}`}
                        onClick={() => handleActionClick(action)}
                      >
                        {action} {j === 0 && <FiChevronRight />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {}
      <div className="agent-footer">
        <span className="agent-status-dot" />
        <span>SyncAI Agent aktivdir — hər data yeniləməsində avtomatik işləyir</span>
      </div>
    </motion.div>
  );
};

export default AgentPage;
