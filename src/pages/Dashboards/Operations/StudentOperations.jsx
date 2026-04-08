import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiTarget, FiDownloadCloud, FiCheck, FiX, FiPrinter } from 'react-icons/fi';
import './Operations.scss';

const StudentOperations = () => {
  const { data } = useData();
  const { user } = useAuth();
  const student = data.students.find(s => s.name === user.name) || data.students[0];

  const [selectedGoal, setSelectedGoal] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummaryText, setAiSummaryText] = useState("");

  const handleGeneratePDF = async () => {
    if (!selectedGoal) {
      toast.error("Zəhmət olmasa həqiqi CV yaratmaq üçün əvvəlcə 'Məqsəd (Goal)' seçin.");
      return;
    }
    
    setIsGenerating(true);
    
    const generateAiText = async () => {
      // Yüksek keyfiyyətli HR (Advanced Prompt) şablonu - Əgər API çöksə və ya spam yazsa işə düşəcək
      const fallbackSummary = `Analitik düşünmə qabiliyyətinə malik, ${student.university} təhsil bazası ilə (GPA: ${student.gpa}) fərqlənən gənc mütəxəssis. ${student.skills.hard.join(', ')} kimi texniki bacarıqlara dərindən yiyələnmiş, aktiv olaraq ${selectedGoal} mövqeyi üzrə ixtisaslaşmışdır. Sürətli qavrama, idarəetmə və proaktiv yanaşması ilə əlaqədar layihələrdə yüksək səmərəlilik nümayiş etdirir.`;

      try {
        const advancedPrompt = `Persona: Sən peşəkar bir HR mütəxəssisi və karyera kouçusan. Task: Verilən tələbə datasına əsasən CV-nin ən yuxarı hissəsində yerləşəcək 'Profil Xülasəsi' yazmalısan. Format: Mətn maksimum 3-4 cümlədən ibarət olmalıdır. Birinci şəxsin dilindən deyil, neytral və peşəkar (üçüncü şəxs) dilində yazılmalıdır. Akademik uğurlar, texniki bacarıqlar mütləq cümlə içində zərif şəkildə qeyd olunmalıdır. Tone: Korporativ, ciddi, lakin müasir. Language: YALNIZ Azərbaycan dilində. Mətndə 'Mən', 'Mənim' kimi sözlərdən qaçın, birbaşa bacarıqlara və hədəflərə fokuslan. STUDENT_DATA: Adı: ${student.name}, GPA: ${student.gpa}, Hədəf Peşə: ${selectedGoal}, Bacarıqlar: ${student.skills.hard.join(', ')}.`;
        
        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(advancedPrompt)}`);
        if(!res.ok) throw new Error("API Error");
        let text = await res.text();
        
        // Ciddi yoxlanış: Əgər gələn mətndə ingiliscə "pollinations", "migrate", "URL (http)" varsa, bu spamdır!
        if (
           text.toLowerCase().includes('pollinations') || 
           text.toLowerCase().includes('migrate') || 
           text.includes('http') ||
           text.length < 20
        ) {
           throw new Error("Mənasız AI spici gəldi, fallback istifadə olunacaq");
        }
        
        setAiSummaryText(text);
      } catch (e) {
        setAiSummaryText(fallbackSummary);
      }
    };

    toast.promise(
      generateAiText(),
      {
        loading: 'Süni Zəka (AI) məlumatlarınızı analiz edir...',
        success: 'AI Model CV profilinizi yaratdı!',
        error: 'Sistem mətnindən istifadə edildi',
      }
    ).then(() => {
      setIsGenerating(false);
      setShowCVModal(true);
    }).catch(() => {
      setIsGenerating(false);
      setShowCVModal(true);
    });
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `SyncUNI - ${student.name} - CV`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const getMissingSkills = () => {
    if (!selectedGoal) return [];
    if (selectedGoal === 'Frontend Developer') return ['TypeScript', 'Next.js', 'Redux'];
    if (selectedGoal === 'Data Scientist') return ['Machine Learning', 'TensorFlow'];
    return ['Agile', 'Communication'];
  };

  return (
    <div className="operations-page">
      <h2>İcra Mərkəzi (Goal Tracking)</h2>
      <p className="desc">Karyera hədəflərini izlə, əskikləri tamamla və Portfolio yarat.</p>
      
      <div className="operations-grid">
        {/* Skill-to-Job Simulator */}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiTarget /> Skill-to-Job Simulator</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>Arzuladığınız peşəni seçin və çatmıyan bacarıqları To-do list şəklində görün:</p>
          
          <div className="custom-dropdown-container" style={{ position: 'relative', marginBottom: '1rem' }}>
            <div 
              className="custom-dropdown-selected" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: '100%', padding: '10px 15px', borderRadius: '8px', 
                background: 'var(--hover-bg)', color: 'var(--text-main)', 
                border: '1px solid var(--border-color)', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <span>{selectedGoal || '-- Məqsəd Seçin --'}</span>
              <span style={{ fontSize: '0.8rem', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="custom-dropdown-options glass-panel"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, 
                    marginTop: '5px', borderRadius: '8px', overflow: 'hidden',
                    background: 'var(--bg-color)', zIndex: 10,
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                  }}
                >
                  <div 
                    className="custom-dropdown-option"
                    onClick={() => { setSelectedGoal(''); setIsDropdownOpen(false); }}
                    style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
                  >
                    -- Məqsəd Seçin --
                  </div>
                  {['Frontend Developer', 'Data Scientist', 'Project Manager'].map(option => (
                    <div 
                      key={option}
                      className="custom-dropdown-option"
                      onClick={() => { setSelectedGoal(option); setIsDropdownOpen(false); }}
                      style={{ 
                        padding: '10px 15px', cursor: 'pointer',
                        background: selectedGoal === option ? 'var(--hover-bg)' : 'transparent',
                        color: selectedGoal === option ? 'var(--primary-color)' : 'var(--text-main)'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {selectedGoal && (
            <div className="todo-list">
              <h4 style={{marginBottom: '10px', color: 'var(--primary-color)'}}>Action Plan:</h4>
              {getMissingSkills().map((skill, i) => (
                <div key={i} className="st-strip" style={{ borderLeft: '3px solid var(--warning)', paddingLeft: '10px' }}>
                  <span>{skill} öyrənməlisiniz</span>
                  <button className="btn btn--outline btn-sm" onClick={() => toast('Plan əlavə edildi')}>Qeyd al</button>
                </div>
              ))}
              <div className="st-strip" style={{ borderLeft: '3px solid var(--success)', paddingLeft: '10px' }}>
                <span style={{textDecoration: 'line-through'}}>{student.skills.hard[0]} - Tamamlanıb</span>
                <FiCheck color="var(--success)"/>
              </div>
            </div>
          )}
        </motion.div>

        {/* Portfolio Builder */}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiDownloadCloud /> Portfolio / CV Builder</h3>
          </div>
          <p style={{marginBottom: '1rem'}}>
             Mövcud akademik GPA-niz, kurslarınız, təsdiqlənmiş referanslarınız və "Match Score"unuz əsasında peşəkar dizaynlı bir PDF CV generasiya edin.
          </p>
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <motion.button 
               className="btn btn--primary"
               onClick={handleGeneratePDF}
               whileHover={{ scale: 1.01 }}
               whileTap={{ scale: 0.95 }}
               disabled={isGenerating}
               style={{ opacity: isGenerating ? 0.7 : 1 }}
            >
               {isGenerating ? 'AI Analiz Edir...' : 'SyncUNI CV Yarat (AI format)'}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {showCVModal && (
          <div className="cv-modal-overlay">
            <motion.div 
              className="cv-modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
               <div className="cv-modal-header no-print">
                 <h3>📄 AI Generated CV</h3>
                 <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                   <button className="btn btn--primary" onClick={handlePrint}>
                     <FiPrinter /> PDF Endir
                   </button>
                   <button className="icon-btn" onClick={() => setShowCVModal(false)}>
                     <FiX />
                   </button>
                 </div>
               </div>
               
               <div className="cv-document print-cv-area">
                 {/* CV Header */}
                 <div className="cv-header">
                    <h1 style={{fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1a1a2e'}}>{student.name}</h1>
                    <p style={{fontSize: '1.1rem', color: '#4a4a68'}}>{student.degree} | GPA: {student.gpa}</p>
                    <p style={{color: 'var(--primary-color)', fontWeight: 'bold', marginTop: '10px', fontSize: '1.2rem', textTransform: 'uppercase'}}>{selectedGoal}</p>
                 </div>
                 
                 <hr style={{border: '0', borderBottom: '2px solid #e1e1e8', margin: '2rem 0'}} />
                 
                 <div className="cv-section" style={{marginBottom: '2rem'}}>
                   <h4 style={{fontSize: '1.2rem', color: '#1a1a2e', margin: '0 0 1rem 0', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>🤖 AI Xülasəsi (Profile Summary)</h4>
                   <p style={{lineHeight: '1.6', color: '#4a4a68'}}>{aiSummaryText}</p>
                 </div>

                 <div className="cv-section" style={{marginBottom: '2rem'}}>
                   <h4 style={{fontSize: '1.2rem', color: '#1a1a2e', margin: '0 0 1rem 0', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>🛠 Təsdiqlənmiş Bacarıqlar (Verified Skills)</h4>
                   <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                     {student.skills.hard.map(skill => (
                       <span key={skill} style={{background: '#e0e7ff', color: '#3730a3', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '500'}}>{skill}</span>
                     ))}
                   </div>
                 </div>

                 <div className="cv-section">
                   <h4 style={{fontSize: '1.2rem', color: '#1a1a2e', margin: '0 0 1rem 0', borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>🎓 Təhsil və Layihələr</h4>
                   <ul style={{listStyle: 'none', padding: '0', margin: '0', lineHeight: '1.8', color: '#4a4a68'}}>
                     <li><strong style={{color: '#1a1a2e'}}>Müəssisə:</strong> {student.university}</li>
                     <li>GPA göstəricisi {student.gpa} olaraq rəsmi qeydiyyata alınıb.</li>
                     <li>Platforma daxilində ekspertlər tərəfindən verilmiş <strong>{student.verifyStatus.references} rəsmi referans (təsdilənmiş portfoliosu) mövcuddur.</strong></li>
                     <li>SyncUNI rəqəmsal reyestrinin imtiyazlı istifadəçisidir.</li>
                   </ul>
                 </div>
                 
                 <div className="cv-footer" style={{marginTop: '3rem', textAlign: 'center', fontSize: '0.8rem', color: '#888', borderTop: '1px dotted #ccc', paddingTop: '1rem'}}>
                    <p>Bu sənəd SyncUNI AI Engine vasitəsilə <strong>{student.name}</strong> üçün avtomatik yaradılmışdır.</p>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentOperations;
