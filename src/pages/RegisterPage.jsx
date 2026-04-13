import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiBriefcase, FiBookOpen, FiMonitor, FiUserCheck,
  FiMail, FiLock, FiUser, FiEye, FiEyeOff,
  FiArrowRight, FiCheckCircle, FiUsers, FiArrowLeft
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './LoginPage.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SIZE_OPTIONS = {
  student_count: ['1–100', '101–500', '501–2000', '2001–10000', '10000+'],
  employee_count: ['1–10', '11–50', '51–200', '201–1000', '1000+'],
};

const roles = [
  { id: 'company',    title: 'Şirkət',      icon: <FiBriefcase />, color: '#6366F1', desc: 'Vakansiya əlavə et, istedadları kəşf et' },
  { id: 'university', title: 'Universitet',  icon: <FiBookOpen />,  color: '#06B6D4', desc: 'Tələbələrin inkişafını və reytinqini izlə' },
  { id: 'course',     title: 'Kurs',         icon: <FiMonitor />,   color: '#10B981', desc: 'Kurslarını yerləşdir və sertifikatlar ver' },
  { id: 'student',    title: 'Tələbə',       icon: <FiUserCheck />, color: '#F59E0B', desc: 'Karyerana başla, bacarıqlarını nümayiş etdir' },
];

const RegisterPage = () => {
  const { register, activateStudent } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Org form state
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [sizeStudents, setSizeStudents] = useState('');
  const [sizeEmployees, setSizeEmployees] = useState('');

  // Student activation state
  const [stuEmail, setStuEmail]       = useState('');
  const [stuPassword, setStuPassword] = useState('');
  const [stuInfo, setStuInfo]         = useState(null);
  const [checking, setChecking]       = useState(false);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'student') { setStep('student-check'); }
    else { setStep('org-form'); }
  };

  const handleOrgRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error('Bütün məcburi sahələri doldurun.');
    setLoading(true);
    try {
      const sizeRange = selectedRole === 'university'
        ? sizeStudents
        : selectedRole === 'company'
        ? sizeEmployees
        : `T:${sizeStudents} İ:${sizeEmployees}`;

      const user = await register({ name, email, password, role: selectedRole, sizeRange });
      toast.success(`Qeydiyyat tamamlandı! 🎉`);
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentCheck = async (e) => {
    e.preventDefault();
    if (!stuEmail) return toast.error('E-poçtunuzu daxil edin.');
    setChecking(true);
    try {
      const res = await fetch(`${API_URL}/auth/student/check/${encodeURIComponent(stuEmail)}`);
      const data = await res.json();
      if (!data.exists) return toast.error('Bu e-poçt ünvanı universitetiniz tərəfindən əlavə edilməyib.');
      if (data.isActivated) return toast.error('Bu hesab artıq aktivdir.');
      setStuInfo(data);
      setStep('student-activate');
    } catch {
      toast.error('Yoxlama zamanı xəta baş verdi.');
    } finally {
      setChecking(false);
    }
  };

  const handleStudentActivate = async (e) => {
    e.preventDefault();
    if (!stuPassword || stuPassword.length < 6) return toast.error('Şifrə minimum 6 simvol olmalıdır.');
    setLoading(true);
    try {
      const user = await activateStudent(stuEmail, stuPassword);
      toast.success(`Hesabınız aktiv edildi! 🎉`);
      navigate(`/dashboard/student`);
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
            SyncUNI Platforması
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Ekosistemə <br /><span>Qoşulun</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Qeydiyyatdan keçərək universitetlər, şirkətlər və istedadlı tələbələr arasındakı körpünün bir hissəsi olun.
          </motion.p>
        </div>

        {/* RIGHT */}
        <motion.div className="login-actions" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div key="roles" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="actions-header">
                  <h2>Qeydiyyat</h2>
                  <p>Hesab növünü seçin</p>
                </div>
                <div className="roles-list">
                  {roles.map((role, idx) => (
                    <motion.div
                      key={role.id}
                      className="role-row"
                      onClick={() => handleRoleSelect(role.id)}
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
                <p className="login-footer-note">Artıq hesabınız var? <Link to="/login">Daxil Ol</Link></p>
              </motion.div>
            )}

            {step === 'org-form' && (
              <motion.div key="org-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="actions-header">
                  <button className="back-link" onClick={() => setStep('role')}><FiArrowLeft /> Geri</button>
                  <h2>{roles.find(r => r.id === selectedRole)?.title} Qeydiyyatı</h2>
                  <p>Məlumatlarınızı daxil edin</p>
                </div>
                <form className="login-form" onSubmit={handleOrgRegister}>
                   <div className="lf-field">
                    <label>Ad</label>
                    <div className="lf-wrap">
                      <FiUser className="lf-icon" />
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Təşkilatın adı" />
                    </div>
                  </div>
                  <div className="lf-field">
                    <label>E-poçt</label>
                    <div className="lf-wrap">
                      <FiMail className="lf-icon" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="lf-field">
                    <label>Şifrə</label>
                    <div className="lf-wrap">
                      <FiLock className="lf-icon" />
                      <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                      <button type="button" className="lf-eye" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff /> : <FiEye />}</button>
                    </div>
                  </div>
                  
                  {(selectedRole === 'university' || selectedRole === 'course') && (
                    <div className="lf-field">
                      <label>Tələbə sayı</label>
                      <div className="size-chips">
                        {SIZE_OPTIONS.student_count.map(s => (
                          <button key={s} type="button" className={`chip ${sizeStudents === s ? 'active' : ''}`} onClick={() => setSizeStudents(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {(selectedRole === 'company' || selectedRole === 'course') && (
                    <div className="lf-field">
                      <label>İşçi sayı</label>
                      <div className="size-chips">
                        {SIZE_OPTIONS.employee_count.map(s => (
                          <button key={s} type="button" className={`chip ${sizeEmployees === s ? 'active' : ''}`} onClick={() => setSizeEmployees(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button type="submit" className="lf-submit btn--primary" disabled={loading}>
                    {loading ? <span className="lf-spinner" /> : 'Qeydiyyatdan Keç'}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'student-check' && (
              <motion.div key="stu-check" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="actions-header">
                  <button className="back-link" onClick={() => setStep('role')}><FiArrowLeft /> Geri</button>
                  <h2>Tələbə Girişi</h2>
                  <p>Universitet e-poçtunuzu daxil edin</p>
                </div>
                <form className="login-form" onSubmit={handleStudentCheck}>
                  <div className="lf-field">
                    <label>Uni E-poçt</label>
                    <div className="lf-wrap">
                      <FiMail className="lf-icon" />
                      <input type="email" value={stuEmail} onChange={e => setStuEmail(e.target.value)} placeholder="student@uni.edu.az" />
                    </div>
                  </div>
                  <button type="submit" className="lf-submit" disabled={checking}>
                    {checking ? <span className="lf-spinner" /> : 'Yoxla'}
                  </button>
                </form>
              </motion.div>
            )}

             {step === 'student-activate' && (
              <motion.div key="stu-activate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="actions-header">
                  <button className="back-link" onClick={() => setStep('student-check')}><FiArrowLeft /> Geri</button>
                  <h2>Hesabı Aktiv Et</h2>
                  <p>Yeni şifrənizi təyin edin</p>
                </div>
                <form className="login-form" onSubmit={handleStudentActivate}>
                  <div className="lf-field">
                    <label>Şifrə</label>
                    <div className="lf-wrap">
                      <FiLock className="lf-icon" />
                      <input type={showPass ? 'text' : 'password'} value={stuPassword} onChange={e => setStuPassword(e.target.value)} placeholder="••••••••" />
                      <button type="button" className="lf-eye" onClick={() => setShowPass(!showPass)}>{showPass ? <FiEyeOff /> : <FiEye />}</button>
                    </div>
                  </div>
                  <button type="submit" className="lf-submit" disabled={loading}>
                    {loading ? <span className="lf-spinner" /> : 'Aktiv Et'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default RegisterPage;
