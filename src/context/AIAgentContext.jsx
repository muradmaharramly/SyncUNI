import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useData } from './DataContext';
import { useAuth } from './AuthContext';

const AIAgentContext = createContext();
export const useAIAgent = () => useContext(AIAgentContext);

const companyInsights = [
  "Son 24 saat ərzində Rəqəmsal Ödənişlər sektorunda mütəxəssis tələbi 15% artıb. Sizin profilinizdəki açıq rollara uyğun namizədlər bazada xüsusi prioritetləşdirilib. 🚀",
  "Bakıda gənc IT mütəxəssislərinin iş axtarış aktivliyi son bir həftədə rekord həddə çatıb. Müəssisəniz üçün təzə məzunlara investisiya etmək ideal variant ola bilər. 📈",
  "Rəqib şirkətlər hazırda Data Analizi və Süni İntellekt bacarığı olan kadrları aqressiv şəkildə kəşf edirlər. Bizim platformadaki yeni Data Mühəndisləri siyahısını yoxlayın. 💡",
  "Azərbaycan bazarı rəqəmsal transformasiyaya böyük büdcələr ayırır; vakansiyalarınızdakı texniki tələblər gənc istedadların profilləri ilə avtomatik üst-üstə düşür. 🔥",
];

const universityInsights = [
  "Tələbələrinizin böyük hissəsi aktiv şəkildə korporativ Data Mühəndisliyi layihələrinə müraciət edir. Şirkətlərlə birgə vençur layihələri başlatmaq üçün mükəmməl zamandır. 🎓",
  "Son statistikalara görə sizin ali məktəbin tələbələri əsasən Kibertəhlükəsizlik üzrə kurslarla maraqlanır. Bu istiqamətdəki tədris proqramını genişləndirmək məsləhətdir. 🛡️",
  "Tərəfdaş şirkətlərin 40%-i hazırda sizin universiteti IT kadrları üçün əsas mənbə kimi izləyir. Tələbələrin profillərinin doldurulmasını təşviq edin. 🤝",
  "Bazar ehtiyacları dəyişir: müasir vakansiyalar güclü 'soft skill' və problem həlletmə bacarıqları tələb edir. Sizin tələbələr bu sahədə bazardan 18% daha öndədir! ✨",
];

const courseInsights = [
  "Sizin Python Proqramlaşdırma təlimlərinizə baxış sayı bu ay platformada 30% artıb! Yeni qeydiyyatları sürətləndirmək üçün erkən promokod təklif edin. 💻",
  "Gənclər arasında Full-Stack Development və DevOps bacarıqlarına tələbat inanılmaz həddədir. Təlimlərinizdə bulud texnologiyalarına yer ayırmanız uğur gətirəcək. ☁️",
  "Bank və maliyyə sektoru kursunuzu bitirmiş məzunları yaxından izləyir. Bu həftəki performansa görə iki məzununuz yüksək səviyyəli müsahibəyə dəvət alıb. 🎯",
  "Vakansiya analizlərinə əsasən, işəgötürənlər nəzəri bilikdən çox real layihə (portfolio) tələb edir. Kursunuzun final layihələrini platformada ictimailəşdirin. 📂",
];

const runDynamicAnalysis = (data, role) => {
  if (!data || !role) return [];
  const students  = data.students ?? [];
  const results = [];
  
  const rando = Math.random();

  if (role === 'company') {
    const reactDevs = students.filter(s => s.skills?.hard?.some(sk => sk.toLowerCase().includes('react')) && s.matchRate >= 80);
    const active = students.filter(s => s.status === 'Looking' || s.status === 'Active');
    
    if (reactDevs.length > 0) {
      results.push({
        id: 'c1_' + Date.now(),
        type: 'match',
        priority: 'high',
        title: rando > 0.5 ? 'Yüksək Uyğunluqlu Tələbələr Tapıldı' : 'Namizəd Bazanız Yeniləndi',
        body: rando > 0.5 
          ? `Sizin tələblərinizə xüsusilə uyğun (≥80%) olan ${reactDevs.length} namizəd tapıldı. Onların arasında "React" kimi texnologiyaları bilən gənclər üstünlük təşkil edir.`
          : `Aktiv axtarış sisteminizə əsasən, hazırda ${reactDevs.length} ədəd texniki tələblərinizə uyğun gənc mütəxəssis kəşf edildi. Ən yüksək potensiallı məzunlardan biri: ${reactDevs[0]?.name}.`,
        actions: ['Namizədlərə bax', 'Filtrlə']
      });
    }
    if (active.length > 0) {
      results.push({
        id: 'c2_' + Date.now(),
        type: 'pipeline',
        priority: 'medium',
        title: rando > 0.5 ? 'Bazar Trendləri və Kadra Tələbat' : 'Aktiv Kadr Axını Qeydə Alındı',
        body: rando > 0.5 
          ? `Məlumatlar göstərir ki, ${active.length} məzun hazırda sırf sizin profildə olan şirkətlərdə işləməyə daha çox meyillidir.`
          : `Hazırkı məlumatlara görə cəmi ${active.length} tələbə sizin kimi müəssisələrdə aktiv vakansiya gözləyir. Onlarla birbaşa əlaqə qurmaq namizəd tapma prosesini 3x sürətləndirəcək.`,
        actions: ['Aktiv tələbələri gör', 'Analitika']
      });
    }
  } else if (role === 'university') {
    const pythonCount = students.filter(s => s.skills?.hard?.some(sk => sk.toLowerCase().includes('python'))).length;
    results.push({
      id: 'u1_' + Date.now(),
      type: 'trend',
      priority: 'high',
      title: rando > 0.5 ? 'Xüsusi Hesabat: Tələbə Rəqabəti' : 'Texnoloji Fokus Artır',
      body: rando > 0.5 
        ? `Xüsusi İnsayt: İT şirkətlər sizin tələbələrin texniki göstəricilərini aktiv şəkildə yoxlayırlar. Python bilən ən azı ${pythonCount} tələbənin profili gündəmdədir.`
        : `Məlumatlar göstərir ki, tələbələriniz arasında proqramlaşdırma bacarıqları aktivlik zonasına daxil olub. Hazırda bu tələb üzrə minimum ${pythonCount} aktiv axtarış var.`,
      actions: ['Statistikaya bax', 'Tələbələri izlə']
    });
    if (rando < 0.6) {
      results.push({
        id: 'u1_extra_' + Date.now(),
        type: 'pipeline',
        priority: 'medium',
        title: 'Məzun Məşğulluğu Strategiyası',
        body: `Top şirkətlər universiteti Data və Süni İntellekt üzrə əsas kadr inkubatoru kimi hədəfləyib. Təkmilləşdirilmiş müsahibə hazırlıqları şansları artıracaq.`,
        actions: ['Hesabatlara bax']
      });
    }
  } else if (role === 'course') {
    results.push({
      id: 'co1_' + Date.now(),
      type: 'demand',
      priority: 'high',
      title: rando > 0.5 ? 'Kurs Tələbatının Ani Yüksəlişi' : 'Yüksək Reytinqli Təlim Analizi',
      body: rando > 0.5 
        ? `Tələbələrin son axtarış modelləri texniki kurslarınıza olan güclü diqqəti vurğulayır. Kontentinizin şirkət tələblərinə uyğunlaşdırılması üstünlük verəcək.`
        : `Bazada baş qaldıran yeni İT layihələrin çoxluğu fonunda, gənclərin sizin təşkil etdiyiniz təlimlərə olan marağı davamlı şəkildə artır.`,
      actions: ['Maraqlananları gör', 'Kursu tanıt']
    });
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
    // Simulate real AI network delay to feel like a real API call
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));
    
    let text = "";
    if (userRole === 'company') {
      text = companyInsights[Math.floor(Math.random() * companyInsights.length)];
    } else if (userRole === 'university') {
      text = universityInsights[Math.floor(Math.random() * universityInsights.length)];
    } else if (userRole === 'course') {
      text = courseInsights[Math.floor(Math.random() * courseInsights.length)];
    } else {
      text = "Sistem fəaliyyəti optimallaşdırıldı, iştirakçıların bazada aktivliyi artmaqda davam edir. ⚡";
    }

    setGlobalInsight({ id: 'global_' + Date.now(), title: 'Qlobal Bazar İnsaytı', body: text, type: 'global' });
    if (!dismissed.has('global_1')) setUnreadCount(prev => prev + 1);
    setIsGlobalLoading(false);
  };

  const fetchAgentInsights = async (userData, roleMapRole) => {
    // Simulate AI generation process with dynamic results
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    return runDynamicAnalysis(userData, user.role);
  };

  const runAgent = useCallback(async () => {
    if (!user || user.role === 'student' || dataLoading) return;
    setAgentLoading(true);
    setUnreadCount(0);
    
    const [_, results] = await Promise.all([
      fetchGlobalInsights(user.role),
      fetchAgentInsights(data, user.role)
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
