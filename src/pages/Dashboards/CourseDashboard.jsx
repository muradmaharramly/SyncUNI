import React from 'react';
import { useData } from '../../context/DataContext';
import { FiCheckCircle, FiUsers, FiStar } from 'react-icons/fi';
import './CourseDashboard.scss';

const CourseDashboard = () => {
  const { data: SYNC_DATA } = useData();
  const courses = [{ id: 'c1', title: 'Advanced React', provider: 'CodeAcademy Baku', enrolled: 45, rating: 4.9 }];
  return (
    <div className="course-dashboard">
      <div className="dashboard-grid">

        {}
        <section className="panel course-listings">
          <div className="panel-header">
            <h2>Kurs Elanları</h2>
            <button className="btn btn--outline btn-sm">+ Yeni Kurs</button>
          </div>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <div className="course-stats">
                  <span><FiUsers /> {course.enrolled} Tələbə</span>
                  <span className="rating"><FiStar /> {course.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="panel skill-endorsement">
          <h2>Bacarıq Təsdiqləməsi (Endorsement)</h2>
          <p className="desc">Kursu bitirən tələbələrə "Badge" (nişan) verərək onların bacarıqlarını təsdiqləyin.</p>

          <div className="student-list">
            {SYNC_DATA.students.filter(s => s.verifyStatus && s.verifyStatus.courses.length > 0).map(student => (
              <div key={student.id} className="student-endorse-card">
                <div className="info">
                  <h4>{student.name}</h4>
                  <p>{student.uni}</p>
                </div>
                <div className="course-status">
                  {student.verifyStatus.courses.map((c, i) => (
                    <div key={i} className="c-item">
                      <span className="c-name">{c}</span>
                      <span className="badge true"><FiCheckCircle /> Təsdiqlənib</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CourseDashboard;
