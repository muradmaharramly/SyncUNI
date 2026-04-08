import React, { createContext, useState, useContext } from 'react';
import { SYNC_DATA as initialData } from '../data/dummyData';
import toast from 'react-hot-toast';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  // Hire a student
  const hireStudent = (studentId) => {
    setData(prev => {
      const newStudents = prev.students.map(s => {
        if (s.id === studentId) {
          // Increase matchRate slightly, set status to Hired
          return { ...s, status: 'Hired', matchRate: Math.min(s.matchRate + 5, 100) };
        }
        return s;
      });

      // Increase company efficiency and university placement rate minimally to simulate real-time analytics change
      const newCompanies = prev.companies.map(c => c.id === "C01" ? {...c, efficiency: Math.min(c.efficiency + 1, 100)} : c);
      const newUnis = prev.universities.map(u => ({...u, placementRate: Math.min(u.placementRate + 0.5, 100)}));

      return { ...prev, students: newStudents, companies: newCompanies, universities: newUnis };
    });
    toast.success('Namizəd işə qəbul edildi! Analitika yeniləndi ✅');
  };

  // Change Funnel Status (For drag and drop)
  const updateFunnelStatus = (studentId, newStage) => {
    // newStage can be 'Looking' (Applicants), 'Active' (Interview/Verified), 'Hired' (Offer)
    const statusMap = { 'Applicants': 'Looking', 'Interview': 'Active', 'Verified': 'Active', 'Offer': 'Hired' };
    const exactStatus = statusMap[newStage] || 'Active';

    setData(prev => {
      return {
        ...prev,
        students: prev.students.map(s => s.id === studentId ? { ...s, status: exactStatus, funnelStage: newStage } : s)
      }
    });
    toast.success(`Namizəd ${newStage} mərhələsinə keçirildi.`);
  };

  // Endorse Skill
  const endorseStudent = (studentId) => {
    setData(prev => {
      return {
        ...prev,
        students: prev.students.map(s => {
          if(s.id === studentId) return { ...s, activityScore: Math.min(s.activityScore + 2, 100) };
          return s;
        })
      }
    });
    // Don't toast here, handle in UI
  };

  // Add new course to system
  const addCourse = (courseData) => {
    // Add logic as needed, or just toast. We will just log it here for dummy
    toast.success('Yeni kurs yaradıldı!');
  };

  // Enroll student into course
  const enrollCourse = (studentId, courseName) => {
    setData(prev => {
      return {
        ...prev,
        students: prev.students.map(s => {
          if (s.id === studentId) {
             // Add to verifyStatus but as Unverified (We'll just push to array for mockup)
             if(!s.verifyStatus.courses.includes(courseName)) {
               return { ...s, verifyStatus: { ...s.verifyStatus, courses: [...s.verifyStatus.courses, courseName] } };
             }
          }
          return s;
        })
      }
    });
    toast.success('Kursa uğurla qeydiyyatlandınız!');
  };

  return (
    <DataContext.Provider value={{ data, hireStudent, updateFunnelStatus, endorseStudent, addCourse, enrollCourse, setData }}>
      {children}
    </DataContext.Provider>
  );
};
