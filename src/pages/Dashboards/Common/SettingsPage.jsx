import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SettingsPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'student') {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return (
    <div className="common-page">
      <div className="glass-panel" style={{padding: '2rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Tənzimləmələr ({user.role})</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Buradan hesaba aid əməliyyat konfiqurasiyalarını və texniki inteqrasiyaları idarə edə bilərsiniz.</p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)'}}>
             <div>
               <h4 style={{color: 'var(--text-main)', marginBottom: '0.2rem'}}>Sistem Bildirişləri</h4>
               <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Yeniliklər barədə avtomatik e-poçt alın</p>
             </div>
             <input type="checkbox" defaultChecked style={{width: '20px', height: '20px', cursor: 'pointer'}} />
           </div>

           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)'}}>
             <div>
               <h4 style={{color: 'var(--text-main)', marginBottom: '0.2rem'}}>API İnteqrasiyası</h4>
               <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Sizin daxili sistemlərinizə (Məs: 1C, LMS) avtomatik məlumat axını</p>
             </div>
             <button className="btn btn--outline" style={{padding: '0.5rem 1rem'}}>Açar Yarat</button>
           </div>

           <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '1rem', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
             <div>
               <h4 style={{color: '#ef4444', marginBottom: '0.2rem'}}>Təhlükəli Zona</h4>
               <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Bütün hesabatlarınızı və tarixcənizi ləğv edir</p>
             </div>
             <button style={{padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', fontWeight: 'bold'}}>Hesabı Sıfırla</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
