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
      <div className="glass-panel main-content-padding">
        <div className="page-header">
          <h2>Tənzimləmələr ({user.role})</h2>
          <p>Buradan hesaba aid əməliyyat konfiqurasiyalarını və texniki inteqrasiyaları idarə edə bilərsiniz.</p>
        </div>

        <div className="info-card-list">
           <div className="info-card flex-row">
             <div>
               <h4 className="info-card__title">Sistem Bildirişləri</h4>
               <p className="text-sm text-muted">Yeniliklər barədə avtomatik e-poçt alın</p>
             </div>
             <input type="checkbox" defaultChecked className="checkbox-standard" />
           </div>

           <div className="info-card flex-row">
             <div>
               <h4 className="info-card__title">API İnteqrasiyası</h4>
               <p className="text-sm text-muted">Sizin daxili sistemlərinizə (Məs: 1C, LMS) avtomatik məlumat axını</p>
             </div>
             <button className="btn btn--outline btn-sm">Açar Yarat</button>
           </div>

           <div className="danger-zone-card">
             <div>
               <h4 className="info-card__title danger">Təhlükəli Zona</h4>
               <p className="text-sm text-muted">Bütün hesabatlarınızı və tarixcənizi ləğv edir</p>
             </div>
             <button className="btn btn--danger">Hesabı Sıfırla</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
