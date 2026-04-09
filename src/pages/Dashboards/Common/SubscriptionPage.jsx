import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiCheckCircle, FiShield, FiZap, FiExternalLink, FiX } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import './CommonPages.scss';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const [showPlans, setShowPlans]       = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const isUniversity = user.role === 'university';

  const currentPlan = isUniversity
    ? { title: 'Tərəfdaşlıq Planı',  price: '49 AZN',  period: '/ay', badge: 'Xüsusi Tərəfdaşlıq' }
    : user.role === 'course'
      ? { title: 'Standart Plan',      price: '99 AZN',  period: '/ay', badge: 'Aktiv' }
      : { title: 'Startap Planı',      price: '199 AZN', period: '/ay', badge: 'Aktiv' };

  const alternativePlans =
    user.role === 'company'
      ? [
          { title: 'Korporativ Plan',     price: '499 AZN', period: '/ay', features: ['Limitsiz vakansiya', 'Dərin analitika', 'Aktiv HR idarəetməsi'] },
          { title: 'Uğur Komissiyası',    price: '5%',       period: ' / kadr maaşından', features: ['Kadr zəmanəti', 'Fərdi axtarış'] },
        ]
      : user.role === 'course'
        ? [{ title: 'Böyümə Komissiyası', price: '10%', period: ' / kurs haqqından', features: ['Hər qazanılan tələbə üçün', 'Doğrulanmış sertifikatlar'] }]
        : [];

  const paymentHistory = [
    { id: 1, month: 'Aprel 2026',   amount: currentPlan.price, status: 'Ödənilib', invoice: '#INV-0426', company: 'SyncUNI MMC', address: 'Bakı, Azərbaycan' },
    { id: 2, month: 'Mart 2026',    amount: currentPlan.price, status: 'Ödənilib', invoice: '#INV-0326', company: 'SyncUNI MMC', address: 'Bakı, Azərbaycan' },
    { id: 3, month: 'Fevral 2026',  amount: currentPlan.price, status: 'Ödənilib', invoice: '#INV-0226', company: 'SyncUNI MMC', address: 'Bakı, Azərbaycan' },
    { id: 4, month: 'Yanvar 2026',  amount: currentPlan.price, status: 'Ödənilib', invoice: '#INV-0126', company: 'SyncUNI MMC', address: 'Bakı, Azərbaycan' },
  ];

  return (
    <motion.div
      className="subscription-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h2>Abunəlik İdarəetməsi</h2>
        <p>Cari paketiniz, ödəniş tarixçəsi və plan tənzimləmələri.</p>
      </div>

      {/* Active Plan Widget */}
      <div className="billing-widget glass-panel">
        <div className="billing-header">
          <div className="title-area">
            <FiShield className="icon-main" />
            <div>
              <h3>Cari Planınız: {currentPlan.title}</h3>
              <span className="badge">{currentPlan.badge}</span>
            </div>
          </div>
          {!isUniversity && (
            <button className="btn btn--outline" onClick={() => setShowPlans(!showPlans)}>
              <FiZap style={{ marginRight: '8px' }} />
              {showPlans ? 'Planları Gizlət' : 'Planı Dəyiş'}
            </button>
          )}
        </div>
        <div className="billing-price">
          <h1>{currentPlan.price}</h1>
          <span>{currentPlan.period}</span>
        </div>
        <p className="billing-note">
          Növbəti ödəniş tarixi: <strong>14 May, 2026</strong>. Ödəniş avtomatik olaraq qeydiyyatdan keçdiyiniz kartdan çıxılacaqdır.
        </p>
      </div>

      {/* Upgrade Plans */}
      <AnimatePresence>
        {showPlans && !isUniversity && (
          <motion.div
            className="upgrade-options"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3>Mövcud Digər Planlar</h3>
            <div className="plans-grid">
              {alternativePlans.map((plan, i) => (
                <div key={i} className="mini-plan-card glass-panel">
                  <h4>{plan.title}</h4>
                  <h2>{plan.price}<span>{plan.period}</span></h2>
                  <ul>
                    {plan.features.map((f, j) => (
                      <li key={j}><FiCheckCircle className="check" /> {f}</li>
                    ))}
                  </ul>
                  <button className="btn btn--primary btn--full">Bu Plana Keç</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment History */}
      <div className="payment-history-container glass-panel">
        <h3><FiCreditCard /> Ödəniş Keçmişi</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Ay / İl</th>
              <th>Məbləğ</th>
              <th>Status</th>
              <th>Qəbz</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map(row => (
              <tr key={row.id}>
                <td><strong>{row.month}</strong></td>
                <td>{row.amount}</td>
                <td><span className="status-badge success">{row.status}</span></td>
                <td>
                  <button
                    className="receipt-btn"
                    onClick={() => setActiveReceipt(row)}
                    title="Qəbzi Göstər"
                  >
                    {row.invoice} <FiExternalLink />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {activeReceipt && (
          <motion.div
            className="receipt-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReceipt(null)}
          >
            <motion.div
              className="receipt-modal glass-panel"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="receipt-close icon-btn" onClick={() => setActiveReceipt(null)}>
                <FiX />
              </button>

              <div className="receipt-header">
                <h2>Sync<span>UNI</span></h2>
                <p className="receipt-sub">Rəsmi Ödəniş Qəbzi</p>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-body">
                <div className="receipt-row">
                  <span>Qəbz Nömrəsi</span>
                  <strong>{activeReceipt.invoice}</strong>
                </div>
                <div className="receipt-row">
                  <span>Ödəniş Ayı</span>
                  <strong>{activeReceipt.month}</strong>
                </div>
                <div className="receipt-row">
                  <span>Plan</span>
                  <strong>{currentPlan.title}</strong>
                </div>
                <div className="receipt-row">
                  <span>Xidmət Göstərən</span>
                  <strong>{activeReceipt.company}</strong>
                </div>
                <div className="receipt-row">
                  <span>Ünvan</span>
                  <strong>{activeReceipt.address}</strong>
                </div>
              </div>

              <div className="receipt-divider" />

              <div className="receipt-total">
                <span>Cəmi Ödəniş</span>
                <h2>{activeReceipt.amount}</h2>
              </div>

              <div className="receipt-footer">
                <span className="status-badge success">✓ Ödənilib</span>
                <p>Bu qəbz SyncUNI tərəfindən elektron şəkildə yaradılmışdır.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SubscriptionPage;
