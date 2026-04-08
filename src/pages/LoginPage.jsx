import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiBookOpen, FiMonitor, FiUserCheck } from 'react-icons/fi';
import './LoginPage.scss';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role, navigate);
  };

  const roles = [
    { id: 'company', title: 'Şirkət', icon: <FiBriefcase />, desc: 'Vakansiya əlavə et, istedadları kəşf et' },
    { id: 'university', title: 'Universitet', icon: <FiBookOpen />, desc: 'Tələbələrin inkişafını və reytinqini izlə' },
    { id: 'course', title: 'Kurs', icon: <FiMonitor />, desc: 'Kurslarını yerləşdir və sertifikatlar ver' },
    { id: 'student', title: 'Tələbə', icon: <FiUserCheck />, desc: 'Karyerana başla, bacarıqlarını nümayiş etdir' }
  ];

  return (
    <div className="login-page">
      <div className="container login-page__container">
        <div className="login-header">
          <h1>SyncUNI-yə Daxil Ol</h1>
          <p>Davam etmək üçün rolunuzu seçin (Demo Giriş)</p>
        </div>
        
        <div className="roles-grid">
          {roles.map(role => (
            <div key={role.id} className="role-card" onClick={() => handleLogin(role.id)}>
              <div className="role-card__icon">{role.icon}</div>
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <span className="role-card__hint">Klikləyib simulyasiya ilə daxil olun</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
