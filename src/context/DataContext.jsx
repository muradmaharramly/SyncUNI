import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { SYNC_DATA as fallbackData } from '../data/dummyData';
import toast from 'react-hot-toast';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const API_URL    = 'https://api.jsonbin.io/v3/b/69d6e1e436566621a891852d';
const API_KEY    = '$2a$10$1oZRVLo2qmQsi9KWoTEnVeUjl7Rz7FyhavZJfXrLqSD5sfzwp4t3K';

// ── Transform raw API student → internal shape ──────────────────────
const transformStudent = (s) => ({
  id:            s.id?.toUpperCase() ?? s.id,
  name:          s.name,
  uni:           s.uni,
  major:         s.major ?? '',
  gpa:           parseFloat(s.gpa) || 0,
  skills: {
    hard: Array.isArray(s.skills) ? s.skills : (s.skills?.hard ?? []),
    soft: s.skills?.soft ?? ['Teamwork', 'Problem Solving'],
  },
  verifyStatus: s.verifyStatus ?? { uni: true, courses: ['SyncUNI Base'], references: 1 },
  activityScore: s.activityScore ?? Math.floor(Math.random() * 30 + 70),
  matchRate:     s.matches ?? s.matchRate ?? 80,
  status:        s.status === 'Hired'
    ? 'Hired'
    : s.status === 'Internship' || s.status === 'Active'
      ? 'Active'
      : 'Looking',
  timeline:      s.timeline ?? [],
});

// ── Transform raw job_listing → internal shape ───────────────────────
const transformJob = (j) => ({
  id:         j.id,
  company:    j.company,
  title:      j.title,
  type:       j.type,
  applicants: j.applicants ?? 0,
});

export const DataProvider = ({ children }) => {
  const [data,    setData]    = useState(fallbackData);
  const [loading, setLoading] = useState(true);      // skeleton trigger
  const [apiOk,   setApiOk]   = useState(false);

  // ── Fetch & merge API data ────────────────────────────────────────
  const fetchApiData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { 'X-Master-Key': API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const eco  = json?.record?.sync_uni_full_ecosystem;

      if (!eco) throw new Error('Unexpected response shape');

      const apiStudents  = (eco.students      ?? []).map(transformStudent);
      const apiJobs      = (eco.job_listings  ?? []).map(transformJob);

      setData(prev => ({
        ...prev,                             // keep companies, universities, references, hiringAccuracyTimeline from dummyData
        students:     apiStudents,
        job_listings: apiJobs,
      }));
      setApiOk(true);
    } catch (err) {
      console.warn('[DataContext] API fetch failed, using dummyData →', err.message);
      // Silently fall back – toast only in dev
      if (import.meta.env.DEV) {
        toast('API əlaqəsi qurulamadı, demo data istifadə olunur.', { icon: '⚠️' });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchApiData(); }, [fetchApiData]);

  // ── Mutations (unchanged logic) ───────────────────────────────────
  const hireStudent = (studentId) => {
    setData(prev => ({
      ...prev,
      students:     prev.students.map(s =>
        s.id === studentId ? { ...s, status: 'Hired', matchRate: Math.min(s.matchRate + 5, 100) } : s
      ),
      companies:    prev.companies.map(c =>
        c.id === 'C01' ? { ...c, efficiency: Math.min(c.efficiency + 1, 100) } : c
      ),
      universities: prev.universities.map(u => ({ ...u, placementRate: Math.min(u.placementRate + 0.5, 100) })),
    }));
    toast.success('Namizəd işə qəbul edildi! Analitika yeniləndi ✅');
  };

  const updateFunnelStatus = (studentId, newStage) => {
    const statusMap = { Applicants: 'Looking', Interview: 'Active', Verified: 'Active', Offer: 'Hired' };
    const exactStatus = statusMap[newStage] || 'Active';
    setData(prev => ({
      ...prev,
      students: prev.students.map(s =>
        s.id === studentId ? { ...s, status: exactStatus, funnelStage: newStage } : s
      ),
    }));
    toast.success(`Namizəd ${newStage} mərhələsinə keçirildi.`);
  };

  const endorseStudent = (studentId) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s =>
        s.id === studentId ? { ...s, activityScore: Math.min(s.activityScore + 2, 100) } : s
      ),
    }));
  };

  const addCourse = () => toast.success('Yeni kurs yaradıldı!');

  const enrollCourse = (studentId, courseName) => {
    setData(prev => ({
      ...prev,
      students: prev.students.map(s => {
        if (s.id === studentId && !s.verifyStatus.courses.includes(courseName)) {
          return { ...s, verifyStatus: { ...s.verifyStatus, courses: [...s.verifyStatus.courses, courseName] } };
        }
        return s;
      }),
    }));
    toast.success('Kursa uğurla qeydiyyatlandınız!');
  };

  return (
    <DataContext.Provider value={{
      data, loading, apiOk,
      setData, hireStudent, updateFunnelStatus, endorseStudent, addCourse, enrollCourse,
      refetch: fetchApiData,
    }}>
      {children}
    </DataContext.Provider>
  );
};
