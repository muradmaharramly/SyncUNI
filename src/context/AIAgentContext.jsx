import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useData } from './DataContext';
import { useAuth } from './AuthContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIAgentContext = createContext();
export const useAIAgent = () => useContext(AIAgentContext);

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const runMockAnalysis = (data, role) => {
  if (!data || !role) return [];
  const students  = data.students  ?? [];
  const results = [];
  if (role === 'company') {
    const reactDevs = students.filter(s => s.skills?.hard?.some(sk => sk.toLowerCase().includes('react')) && s.matchRate >= 85);
    if (reactDevs.length > 0) results.push({ id: 'c1', type: 'match', priority: 'high', title: 'Yüksək Uyğunluqlu React Mütəxəssisləri', body: `PASHA Bank üçün ${reactDevs.length} ədəd yüksək uyğunluq (≥85%) göstərən React mütəxəssisi tapıldı. Ən yüksəki: ${reactDevs[0]?.name} (${reactDevs[0]?.matchRate}%).`, actions: ['Namizədlərə bax', 'Filtrlə'] });
    const active = students.filter(s => s.status === 'Looking' || s.status === 'Active');
    if (active.length > 0) results.push({ id: 'c2', type: 'pipeline', priority: 'medium', title: 'Aktiv Namizəd Bazası', body: `Hal-hazırda ${active.length} tələbə aktiv olaraq iş axtarır.`, actions: ['Siyahıya bax', 'Filter tətbiq et'] });
  } else if (role === 'university') {
    const pythonStudents = students.filter(s => s.skills?.hard?.some(sk => sk.toLowerCase().includes('python')));
    if (pythonStudents.length > 0) results.push({ id: 'u1', type: 'trend', priority: 'high', title: 'Python Bacarığı Artımı', body: `Bu ay tələbələrin "Python" bacarığı üzrə aktivliyi artıb. Hazırda ${pythonStudents.length} tələbə aktivdir.`, actions: ['Tələbə siyahısına bax', 'Hesabatı endir'] });
  } else if (role === 'course') {
    results.push({ id: 'co1', type: 'demand', priority: 'high', title: 'Kurs Tələbat Analizi', body: `Sizin yeni kursunuza maraq göstərən maraqlı namizədlər var.`, actions: ['Tələbələrə mesaj yaz', 'Kursu tanıt'] });
  }
  return results;
};

export const AIAgentProvider = ({ children }) => {
  const { data, loading: dataLoading } = useData();
  const { user } = useAuth();

  const [notifications, setNotifications]   = useState([]);
  const [globalInsight, setGlobalInsight]   = useState(null);
  const [agentLoading,  setAgentLoading]    = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [lastRunAt,     setLastRunAt]       = useState(null);
  const [unreadCount,   setUnreadCount]     = useState(0);
  const [dismissed,     setDismissed]       = useState(new Set());

  const fetchGlobalInsights = async (userRole) => {
    setIsGlobalLoading(true);
    try {
      const roleMap = { company: 'Şirkət', university: 'Universitet', course: 'Kurs' };
      const prompt = `Sən SyncUNI platformasının AI Agentisən. Verilmiş rol üçün Azərbaycanın cari iş bazarı və təhsil-innovasiya gündəmi haqqında qısa bir 'Market Insight' (Bazar İnsaytı) mətni yaz. Mətn 2 cümlə olmalıdır və emoji daxil olmalıdır. Rol: ${roleMap[userRole] || 'İstifadəçi'}.`;
      
      let text = "Bazar analizi tamamlandı, platformada aktiv vakansiya uyğunluqları yeniləndi.";
      if (genAI) {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        if (result && result.response) {
            text = result.response.text().trim();
        }
      }

      setGlobalInsight({ id: 'global_1', title: 'Qlobal Bazar İnsaytı', body: text, type: 'global' });
      if (!dismissed.has('global_1')) setUnreadCount(prev => prev + 1);
    } catch (e) {
      console.error("Global Insight Error:", e);
      setGlobalInsight(null);
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const fetchAgentInsights = async (userData, roleMapRole) => {
    if (!genAI) {
      return [
        {
          id: 'e1', type: 'match', priority: 'medium', title: 'Süni İntellekt Bağlantısı Gözlənilir',
          body: `API açarı (VITE_GEMINI_API_KEY) sistem tərəfindən oxunmadı. Zəhmət olmasa terminalda (CMD/Powershell) işləyən serveri (npm run dev) dayandırıb yenidən başladın ki, .env faylı oxunsun.`,
          actions: ['Başa düşdüm']
        },
        ...runMockAnalysis(userData, user.role)
      ];
    }

    try {
      const totalStudents = userData.students?.length || 0;
      const sysPrompt = `Sən SyncUNI platformasının analitik AI Agentisən. Platformada cəmi ${totalStudents} tələbə var.
İstifadəçi rolu (${roleMapRole}) üçün 2 və ya 3 fərdiləşdirilmiş və realistik 'AI Bildirişi' yarat. Xahiş edirəm format olaraq STRICT JSON Array qaytar qətiyyən markdown tag istifadə etmə:
[
  {
    "id": "gen_1",
    "type": "match",
    "priority": "high",
    "title": "Başlıq",
    "body": "Ən azı 2 cümlə detallı analiz.",
    "actions": ["Əsas Düymə", "İkinci Düymə"]
  }
]
ONLY OUTPUT JSON, NO EXPLANATION TEXT.`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(sysPrompt);
      let tResult = result.response.text().trim();
      
      if (tResult.startsWith('```json')) tResult = tResult.replace(/```json/g, '').replace(/```/g, '').trim();
      if (tResult.startsWith('```')) tResult = tResult.replace(/```/g, '').trim();
      
      const parsed = JSON.parse(tResult);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : runMockAnalysis(userData, user.role);
    } catch (e) {
      console.error("Generative AI Agent error: ", e);
      return [
        {
          id: 'err_api', type: 'pipeline', priority: 'high', title: 'API Xətası Baş Verdi',
          body: `Gemini API-yə müraciət zamanı xəta oldu: ${e.message}. Ola bilsin API açarınız yalnışdır və ya internet bloklanıb.`,
          actions: ['Ayarları Yoxla']
        },
        ...runMockAnalysis(userData, user.role)
      ];
    }
  };

  const runAgent = useCallback(async () => {
    if (!user || user.role === 'student' || dataLoading) return;
    setAgentLoading(true);
    setUnreadCount(0);
    const roleMap = { company: 'Şirkət/İşəgötürən', university: 'Universitet', course: 'Kurs/Təlim mərkəzi' };
    
    const [_, results] = await Promise.all([
      fetchGlobalInsights(user.role),
      fetchAgentInsights(data, roleMap[user.role] || 'İstifadəçi')
    ]);

    setNotifications(results);
    setUnreadCount(prev => prev + results.filter(r => !dismissed.has(r.id)).length);
    setLastRunAt(new Date());
    setAgentLoading(false);
  }, [data, user, dataLoading, dismissed]);

  useEffect(() => {
    if (!dataLoading && user && user.role !== 'student') runAgent();
  }, [dataLoading]);

  const dismissNotification = id => { setDismissed(prev => new Set(prev).add(id)); setUnreadCount(prev => Math.max(0, prev - 1)); };
  const markAllRead = () => setUnreadCount(0);
  const visible = notifications.filter(n => !dismissed.has(n.id));

  return (
    <AIAgentContext.Provider value={{
      notifications: visible, globalInsight, agentLoading, isGlobalLoading, lastRunAt, unreadCount,
      runAgent, dismissNotification, markAllRead,
    }}>
      {children}
    </AIAgentContext.Provider>
  );
};
