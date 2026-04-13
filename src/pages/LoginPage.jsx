import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiBookOpen, FiMonitor, FiUserCheck, FiArrowRight, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './LoginPage.scss';

const roles = [
  { id: 'company',    title: 'Şirkət',      icon: <FiBriefcase />, desc: 'Vakansiya əlavə et, istedadları kəşf et' },
  { id: 'university', title: 'Universitet',  icon: <FiBookOpen />,  desc: 'Tələbələrin inkişafını və reytinqini izlə' },
  { id: 'course',     title: 'Kurs',         icon: <FiMonitor />,   desc: 'Kurslarını yerləşdir və sertifikatlar ver' },
  { id: 'student',    title: 'Tələbə',       icon: <FiUserCheck />, desc: 'Karyerana başla, bacarıqlarını nümayiş etdir' },
];

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState(null);
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [loading, setLoading]       = useState(false);

  const handleRoleClick = (roleId) => {
    setActiveRole(roleId);
    setEmail(''); setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Bütün sahələri doldurun.');
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Xoş gəldiniz, ${user.name}! 🎉`);
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container login-page__container">

        {/* LEFT */}
        <div className="login-info">
          <motion.div className="info-badge" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            Xoş gəlmişsiniz
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Datanın Gücü İlə <br /><span>Karyeranızı İdarə Edin</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            SyncUNI tək bir platformada universitetləri, şirkətləri və tələbələri birləşdirən "Skill-gap" əsaslı innovativ karyera ekosistemidir.
          </motion.p>
        </div>

        {/* RIGHT */}
        <motion.div className="login-actions" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <AnimatePresence mode="wait">
            {/* Role List */}
            {!activeRole && (
              <motion.div key="roles" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="actions-header">
                  <h2>Daxil Ol</h2>
                  <p>Davam etmək üçün istifadəçi rolunuzu seçin</p>
                </div>
                <div className="roles-list">
                  {roles.map((role, idx) => (
                    <motion.div
                      key={role.id}
                      className="role-row"
                      onClick={() => handleRoleClick(role.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.08 }}
                    >
                      <div className="role-row__icon">{role.icon}</div>
                      <div className="role-row__text">
                        <h3>{role.title}</h3>
                        <p>{role.desc}</p>
                      </div>
                      <div className="role-row__arrow"><FiArrowRight /></div>
                    </motion.div>
                  ))}
                </div>
                <p className="login-footer-note">
                  Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link>
                </p>
              </motion.div>
            )}

            {/* Login Form */}
            {activeRole && (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="actions-header">
                  <button className="back-link" onClick={() => setActiveRole(null)}>
                    <FiArrowLeft /> Geri
                  </button>
                  <h2>{roles.find(r => r.id === activeRole)?.title} Girişi</h2>
                  <p>E-poçt və şifrənizi daxil edin</p>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                  <div className="lf-field">
                    <label>E-poçt</label>
                    <div className="lf-wrap">
                      <FiMail className="lf-icon" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="email@example.com" autoComplete="email" />
                    </div>
                  </div>
                  <div className="lf-field">
                    <label>Şifrə</label>
                    <div className="lf-wrap">
                      <FiLock className="lf-icon" />
                      <input type={showPass ? 'text' : 'password'} value={password}
                        onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                      <button type="button" className="lf-eye" onClick={() => setShowPass(v => !v)}>
                        {showPass ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <motion.button type="submit" className="lf-submit btn--primary" disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {loading ? <span className="lf-spinner" /> : 'Daxil Ol'}
                    {!loading && <FiArrowRight />}
                  </motion.button>
                </form>
                <p className="login-footer-note">
                  Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
