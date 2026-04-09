import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useData } from './DataContext';
import { useAuth } from './AuthContext';

const AIAgentContext = createContext();
export const useAIAgent = () => useContext(AIAgentContext);

// ── Agent Analysis Engine ─────────────────────────────────────────────────────
const runAnalysis = (data, role) => {
  if (!data || !role) return [];

  const students  = data.students  ?? [];
  const companies = data.companies ?? [];

  const results = [];

  if (role === 'company') {
    // Find high-match React students
    const reactDevs = students.filter(s =>
      s.skills?.hard?.some(sk => sk.toLowerCase().includes('react')) &&
      s.matchRate >= 85
    );
    if (reactDevs.length > 0) {
      results.push({
        id: 'c1',
        type: 'match',
        priority: 'high',
        icon: '🎯',
        title: 'Yüksək Uyğunluqlu React Mütəxəssisləri',
        body: `PASHA Bank üçün ${reactDevs.length} ədəd yüksək uyğunluq (≥85%) göstərən React mütəxəssisi tapıldı. Ən yüksəki: ${reactDevs[0]?.name} (${reactDevs[0]?.matchRate}%).`,
        actions: ['Namizədlərə bax', 'Filtrlə'],
      });
    }

    // Students looking for work
    const active = students.filter(s => s.status === 'Looking' || s.status === 'Active');
    if (active.length > 0) {
      results.push({
        id: 'c2',
        type: 'pipeline',
        priority: 'medium',
        icon: '📋',
        title: 'Aktiv Namizəd Bazası',
        body: `Hal-hazırda ${active.length} tələbə aktiv olaraq iş axtarır. Son həftə ${Math.floor(active.length * 0.2)} yeni profil əlavə edildi.`,
        actions: ['Siyahıya bax', 'Filter tətbiq et'],
      });
    }

    // High GPA pool
    const topGpa = students.filter(s => s.gpa >= 3.8);
    results.push({
      id: 'c3',
      type: 'insight',
      priority: 'low',
      icon: '📊',
      title: 'Akademik Ekspertiza Hesabatı',
      body: `Platformada GPA ≥ 3.8 olan ${topGpa.length} tələbə mövcuddur. AI modeli bu həftə ${topGpa.length + 3} yeni potensial uyğunluq hesabladı.`,
      actions: ['Hesabatı endir', 'Analitikaya keç'],
    });
  }

  if (role === 'university') {
    // Python activity spike
    const pythonStudents = students.filter(s =>
      s.skills?.hard?.some(sk => sk.toLowerCase().includes('python'))
    );
    results.push({
      id: 'u1',
      type: 'trend',
      priority: 'high',
      icon: '📈',
      title: 'Python Bacarığı Artımı',
      body: `ADA University: Bu ay tələbələrin "Python" bacarığı üzrə aktivliyi 15% artıb. Hazırda ${pythonStudents.length} tələbə bu texnologiyanı aktiv öyrənir.`,
      actions: ['Tələbə siyahısına bax', 'Hesabatı endir'],
    });

    // Placement rate insight
    const hired = students.filter(s => s.status === 'Hired' || s.status === 'Internship');
    results.push({
      id: 'u2',
      type: 'placement',
      priority: 'medium',
      icon: '🎓',
      title: 'Məşğulluq Dərəcəsi Yeniləndi',
      body: `Bu rübdə ${hired.length} məzun işə düzəldi və ya staj qazandı. Bu rəqəm ötən rüblə müqayisədə 8% artım göstərir.`,
      actions: ['Məzun izləmə', 'Sənaye hesabatı'],
    });

    // Company requests
    results.push({
      id: 'u3',
      type: 'partnership',
      priority: 'low',
      icon: '🤝',
      title: 'Şirkət Tərəfdaşlıq Sorğusu',
      body: `2 şirkət (PASHA Bank, Azercell) universitetinizin CV bazasına çıxış üçün sorğu göndərib. Sorğular "Əməliyyatlar" panelindən idarə oluna bilər.`,
      actions: ['Sorğulara bax', 'Əməkdaşlıq idarəetməsi'],
    });
  }

  if (role === 'course') {
    // Interested students
    const cyberStudents = students.filter(s =>
      s.skills?.hard?.some(sk => sk.toLowerCase().includes('c++') || sk.toLowerCase().includes('linux') || sk.toLowerCase().includes('network'))
    );
    results.push({
      id: 'co1',
      type: 'demand',
      priority: 'high',
      icon: '🔥',
      title: 'Kurs Tələbat Analizi',
      body: `Step IT: Sizin "Cybersecurity" kursunuza maraq göstərən ${Math.max(cyberStudents.length, 12)} potensial tələbə namizədi var. AI modeli bu həftə 4 yeni proaktiv uyğunluq tapdı.`,
      actions: ['Tələbələrə mesaj yaz', 'Kursu tanıt'],
    });

    // Certification demand
    results.push({
      id: 'co2',
      type: 'certificate',
      priority: 'medium',
      icon: '🏆',
      title: 'Sertifikat Tələbi Artıb',
      body: `Bu ay platformada "Sertifikatlaşdırılmış Kurs" axtarışları 32% artıb. Kurslarınıza SyncUNI sertifikatı əlavə etmək tövsiyə olunur.`,
      actions: ['Sertifikat əlavə et', 'Proqrama bax'],
    });

    // Revenue insight
    const enrolledCount = students.slice(0, 8).length;
    results.push({
      id: 'co3',
      type: 'revenue',
      priority: 'low',
      icon: '💰',
      title: 'Gəlir Proqnozu',
      body: `Mövcud kurs platforması üzrə aylıq ortalama ${enrolledCount * 45} AZN passiv gəlir potensialı mövcuddur. Böyümə Komissiyası planını aktivləşdirin.`,
      actions: ['Planı dəyiş', 'Analitikaya keç'],
    });
  }

  return results;
};

// ── Provider ──────────────────────────────────────────────────────────────────
export const AIAgentProvider = ({ children }) => {
  const { data, loading: dataLoading } = useData();
  const { user } = useAuth();

  const [notifications, setNotifications]   = useState([]);
  const [agentLoading,  setAgentLoading]    = useState(false);
  const [lastRunAt,     setLastRunAt]       = useState(null);
  const [unreadCount,   setUnreadCount]     = useState(0);
  const [dismissed,     setDismissed]       = useState(new Set());

  const runAgent = useCallback(() => {
    if (!user || user.role === 'student' || dataLoading) return;
    setAgentLoading(true);

    // Simulate slight async delay (feels live)
    setTimeout(() => {
      const results = runAnalysis(data, user.role);
      setNotifications(results);
      setUnreadCount(prev => prev + results.filter(r => !dismissed.has(r.id)).length);
      setLastRunAt(new Date());
      setAgentLoading(false);
    }, 900);
  }, [data, user, dataLoading, dismissed]);

  // Auto-run when data loads
  useEffect(() => {
    if (!dataLoading && user && user.role !== 'student') {
      runAgent();
    }
  }, [dataLoading]); // eslint-disable-line

  const dismissNotification = (id) => {
    setDismissed(prev => new Set(prev).add(id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllRead = () => setUnreadCount(0);

  const visible = notifications.filter(n => !dismissed.has(n.id));

  return (
    <AIAgentContext.Provider value={{
      notifications: visible,
      agentLoading,
      lastRunAt,
      unreadCount,
      runAgent,
      dismissNotification,
      markAllRead,
    }}>
      {children}
    </AIAgentContext.Provider>
  );
};
