import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiBook, FiAward, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './StudentDashboard.scss';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: SYNC_DATA, enrollCourse } = useData();

  const st = SYNC_DATA.students.find(s => s.name === user.name) || SYNC_DATA.students[0];

  const handleApply = () => {
    toast.success('Müraciət göndərildi! Şirkət yaxın zamanda sizə geri dönüş edəcək.');
  };

  const handleEnroll = (skill) => {
    if(enrollCourse) {
       enrollCourse(st.id, skill + " Course");
    } else {
       toast.success('Kursa yönləndirildi!');
    }
  };

  return (
    <div className="student-bento">
      <div className="bento-grid">

        {}
        <div className="bento-col main-col">

          <motion.div className="bento-panel gap-analysis glass-panel" layout>
            <div className="panel-header">
              <h3>Skill Gap Analysis (Data Architect Vakansiyası üzrə)</h3>
            </div>
            <p className="desc">Tövsiyə edilən vakansiyaya tam uyğunlaşmaq üçün qabaqlamanız lazım olan bacarıqlar:</p>

            <div className="gap-bars">
              <div className="bar-item">
                <div className="bar-label"><span>Mövcud Hard Skills ({st.skills.hard.length})</span> <span>80%</span></div>
                <div className="progress-bg"><motion.div className="progress-fill hard" initial={{width:0}} animate={{width:'80%'}} /></div>
              </div>
              <div className="bar-item">
                <div className="bar-label"><span>Tələb olunan: AWS Cloud</span> <span className="warning">Əskikdir</span></div>
                <div className="progress-bg"><motion.div className="progress-fill missing" initial={{width:'100%'}} animate={{width:'100%'}} /></div>
                <button className="btn btn--primary btn-sm gap-action" onClick={() => handleEnroll('AWS Cloud')}>
                  Kursa Başla <FiArrowRight/>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div className="bento-panel referral-wall glass-panel" layout>
            <div className="panel-header">
              <h3>Referral Wall (Təsdiqlənmiş Bacarıqlar)</h3>
            </div>
            <div className="badges-container">
              {st.verifyStatus.courses.map((c, i) => (
                <motion.div key={i} className="badge-card course" whileHover={{scale: 1.01}}>
                  <FiBook className="icon" />
                  <h4>{c}</h4>
                  <span>Verified Course</span>
                </motion.div>
              ))}
              {st.verifyStatus.uni && (
                <motion.div className="badge-card uni" whileHover={{scale: 1.01}}>
                  <FiAward className="icon" />
                  <h4>{st.uni}</h4>
                  <span>Verified Diploma/GPA</span>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>

        {}
        <div className="bento-col side-col">
          <motion.div className="bento-panel glass-panel recom-job" layout>
             <h4>Tövsiyə olunan iş: PASHA Bank - Analyst</h4>
             <p>Match Score: <strong className="success">98%</strong></p>
             <motion.button
              className="btn btn--primary btn--full sk-block--mt-2"
              whileHover={{scale: 1.01}} whileTap={{scale: 0.95}}
              onClick={handleApply}
             >
               Müraciət Et
             </motion.button>
          </motion.div>

          <motion.div className="bento-panel timeline-panel glass-panel" layout>
            <div className="panel-header">
              <h3>Skill Evolution Timeline</h3>
            </div>

            <div className="timeline">
              {st.timeline.length > 0 ? st.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <span className="date">{item.date}</span>
                    <p className="event">{item.event}</p>
                  </div>
                </div>
              )) : (
                <p className="empty">Göstəriləcək tarixçə yoxdur.</p>
              )}

              {}
              <div className="timeline-item future">
                <div className="timeline-marker pulse"></div>
                <div className="timeline-content">
                  <span className="date">Növbəti Hədəf</span>
                  <p className="event">AWS Cloud Sertifikatı (Tövsiyə edilir)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
