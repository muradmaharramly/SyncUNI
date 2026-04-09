import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBriefcase, FiBookOpen, FiMonitor, FiUserCheck, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
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

        <div className="login-info">
           <motion.div className="info-badge" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}}>Xoş gəlmişsiniz</motion.div>
           <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.1}}>
              Datanın Gücü İlə <br/><span>Karyeranızı İdarə Edin</span>
           </motion.h1>
           <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.2}}>
              SyncUNI tək bir platformada universitetləri, şirkətləri və tələbələri birləşdirən "Skill-gap" əsaslı innovativ karyera ekosistemidir.
           </motion.p>

           <motion.div className="info-features" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.3}}>
             <div className="feature">
               <div className="f-icon"><FiUserCheck /></div>
               <div>
                 <h4>Tələbələr üçün</h4>
                 <span>Sübut olunmuş bacarıqlarla işə düzəl</span>
               </div>
             </div>
             <div className="feature">
               <div className="f-icon"><FiBriefcase /></div>
               <div>
                 <h4>Şirkətlər üçün</h4>
                 <span>Doğru istedadı birbaşa tap</span>
               </div>
             </div>
           </motion.div>
        </div>

        <motion.div className="login-actions" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration: 0.4}}>
          <div className="actions-header">
            <h2>Daxil Ol <span className="demo-badge">Demo</span></h2>
            <p>Davam etmək üçün istifadəçi rolunuzu seçin</p>
          </div>

          <div className="roles-list">
            {roles.map((role, idx) => (
              <motion.div
                key={role.id}
                className="role-row"
                onClick={() => handleLogin(role.id)}
                initial={{opacity:0, x:20}}
                animate={{opacity:1, x:0}}
                transition={{delay: 0.2 + idx * 0.1}}
              >
                <div className="role-row__icon">{role.icon}</div>
                <div className="role-row__text">
                  <h3>{role.title}</h3>
                  <p>{role.desc}</p>
                </div>
                <div className="role-row__arrow"><FiArrowRight/></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
