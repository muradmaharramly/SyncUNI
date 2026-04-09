import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="common-page">
      <div className="glass-panel" style={{padding: '2rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)'}}>İstifadəçi Profili</h2>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div style={{padding: '1.2rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Ad / Müəssisə Adı:</span>
            <h3 style={{color: 'var(--text-main)', marginTop: '0.5rem', fontSize: '1.2rem'}}>{user.name}</h3>
          </div>

          <div style={{padding: '1.2rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Elektron Poçt:</span>
            <h3 style={{color: 'var(--text-main)', marginTop: '0.5rem', fontSize: '1.2rem'}}>{user.email}</h3>
          </div>

          <div style={{padding: '1.2rem', background: 'var(--bg-card)', borderRadius: '1rem', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)'}}>
            <span style={{color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Növləndirmə rolu:</span>
            <h3 style={{color: 'var(--primary-color)', marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: '800'}}>{user.role.toUpperCase()}</h3>
          </div>
        </div>

        {user.role === 'student' && (
          <div style={{marginTop: '2rem', padding: '1rem', borderLeft: '4px solid var(--secondary-color)', background: 'rgba(56, 189, 248, 0.1)'}}>
            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>
              🎓 <strong>Tələbə Profili:</strong> Məlumatlarınız universitet tərəfindən idarə olunur. Bacarıq və qiymətləndirmələrdə dəyişiklik etmək üçün universitet rəhbərliyinə müraciət edin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
