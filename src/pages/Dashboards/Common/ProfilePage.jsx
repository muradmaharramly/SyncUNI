import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="common-page">
      <div className="glass-panel main-content-padding">
        <div className="page-header">
          <h2>İstifadəçi Profili</h2>
        </div>

        <div className="info-card-list">
          <div className="info-card">
            <span className="info-card__label">Ad / Müəssisə Adı:</span>
            <h3 className="info-card__value">{user.name}</h3>
          </div>

          <div className="info-card">
            <span className="info-card__label">Elektron Poçt:</span>
            <h3 className="info-card__value">{user.email}</h3>
          </div>

          <div className="info-card">
            <span className="info-card__label">Növləndirmə rolu:</span>
            <h3 className="info-card__value primary">{user.role.toUpperCase()}</h3>
          </div>
        </div>

        {user.role === 'student' && (
          <div className="alert-box">
            <p>
              🎓 <strong>Tələbə Profili:</strong> Məlumatlarınız universitet tərəfindən idarə olunur. Bacarıq və qiymətləndirmələrdə dəyişiklik etmək üçün universitet rəhbərliyinə müraciət edin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
