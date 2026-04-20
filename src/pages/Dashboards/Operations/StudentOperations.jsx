import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiTarget, FiDownloadCloud, FiCheck, FiX, FiPrinter, FiChevronDown } from 'react-icons/fi';
import { SkeletonCardGrid } from '../../../components/SkeletonLoader';
import './Operations.scss';

const StudentOperations = () => {
  const { data, loading } = useData();
  const { user } = useAuth();
  const student = data.students.find(s => s.name === user.name) || data.students[0];

  const cvStudent = { ...student, name: 'Aysel Məmmədova' };

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

      const fallbackSummary = `Analitik düşünmə qabiliyyətinə malik, ${cvStudent.uni} təhsil bazası ilə (GPA: ${cvStudent.gpa}) fərqlənən gənc mütəxəssis. ${cvStudent.skills.hard.join(', ')} kimi texniki bacarıqlara dərindən yiyələnmiş, aktiv olaraq ${selectedGoal} mövqeyi üzrə ixtisaslaşmışdır. Sürətli qavrama, idarəetmə və proaktiv yanaşması ilə əlaqədar layihələrdə yüksək səmərəlilik nümayiş etdirir.`;

      try {
        const advancedPrompt = `Persona: Sən peşəkar bir HR mütəxəssisi və karyera kouçusan. Task: Verilən tələbə datasına əsasən CV-nin ən yuxarı hissəsində yerləşəcək 'Profil Xülasəsi' yazmalısan. Format: Mətn maksimum 3-4 cümlədən ibarət olmalıdır. Birinci şəxsin dilindən deyil, neytral və peşəkar (üçüncü şəxs) dilində yazılmalıdır. Akademik uğurlar, texniki bacarıqlar mütləq cümlə içində zərif şəkildə qeyd olunmalıdır. Tone: Korporativ, ciddi, lakin müasir. Language: YALNIZ Azərbaycan dilində. Mətndə 'Mən', 'Mənim' kimi sözlərdən qaçın, birbaşa bacarıqlara və hədəflərə fokuslan. STUDENT_DATA: Adı: ${cvStudent.name}, GPA: ${cvStudent.gpa}, Hədəf Peşə: ${selectedGoal}, Bacarıqlar: ${cvStudent.skills.hard.join(', ')}.`;

        const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(advancedPrompt)}?model=mistral&seed=${Math.floor(Math.random()*1000)}&cache=false`);
        if(!res.ok) throw new Error("API Error");
        let text = await res.text();

        const cleaningPatterns = [
          /⚠️ \*\*IMPORTANT NOTICE\*\* ⚠️[\s\S]*?normally\./gi,
          /The Pollinations legacy text API[\s\S]*?normally\./gi,
          /Note: Anonymous requests[\s\S]*?normally\./gi,
          /\*\*IMPORTANT NOTICE\*\*[\s\S]*?normally\./gi
        ];

        cleaningPatterns.forEach(pattern => {
          text = text.replace(pattern, '').trim();
        });

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
    document.title = `SyncUNI - ${cvStudent.name} - CV`;
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
      {loading ? (
        <>
          <h2 className="sk-block--mt-3 opacity-0-5">İcra Mərkəzi (Goal Tracking)</h2>
          <SkeletonCardGrid count={4} />
        </>
      ) : (
      <>
      <h2>İcra Mərkəzi (Goal Tracking)</h2>
      <p className="desc">Karyera hədəflərini izlə, əskikləri tamamla və Portfolio yarat.</p>

      <div className="operations-grid">
        {}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiTarget /> Skill-to-Job Simulator</h3>
          </div>
          <p className="no-margin-bottom sk-block--mt-2 mb-2">Arzuladığınız peşəni seçin və çatmıyan bacarıqları To-do list şəklində görün:</p>

          <div className="custom-select-container">
            <div
              className="select-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedGoal || '-- Məqsəd Seçin --'}</span>
              <FiChevronDown className={`arrow-icon ${isDropdownOpen ? 'open' : ''}`} />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="select-options"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`option-item ${!selectedGoal ? 'selected' : ''}`}
                    onClick={() => { setSelectedGoal(''); setIsDropdownOpen(false); }}
                  >
                    -- Məqsəd Seçin --
                  </div>
                  {['Frontend Developer', 'Data Scientist', 'Project Manager'].map(option => (
                    <div
                      key={option}
                      className={`option-item ${selectedGoal === option ? 'selected' : ''}`}
                      onClick={() => { setSelectedGoal(option); setIsDropdownOpen(false); }}
                    >
                      {option}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {selectedGoal && (
            <div className="todo-list sk-block--mt-3">
              <h4 className="color-primary no-margin-bottom mb-1">Action Plan:</h4>
              {getMissingSkills().map((skill, i) => (
                <div key={i} className="st-strip border-left-warning">
                  <span>{skill} öyrənməlisiniz</span>
                  <button className="btn btn--outline btn-sm" onClick={() => toast('Plan əlavə edildi')}>Qeyd al</button>
                </div>
              ))}
              <div className="st-strip border-left-success">
                <span className="text-strike">{student.skills.hard[0]} - Tamamlanıb</span>
                <FiCheck color="var(--success)"/>
              </div>
            </div>
          )}
        </motion.div>

        {}
        <motion.div className="op-panel glass-panel">
          <div className="panel-header">
            <h3><FiDownloadCloud /> Portfolio / CV Builder</h3>
          </div>
          <p className="sk-block--mt-2 mb-2">
             Mövcud akademik GPA-niz, kurslarınız, təsdiqlənmiş referanslarınız və "Match Score"unuz əsasında peşəkar dizaynlı bir PDF CV generasiya edin.
          </p>
          <div className="cv-upload-placeholder">
            <div className="placeholder-icon">📄</div>
            <motion.button
               className="btn btn--primary"
               onClick={handleGeneratePDF}
               whileHover={{ scale: 1.01 }}
               whileTap={{ scale: 0.95 }}
               disabled={isGenerating}
               className={`btn btn--primary ${isGenerating ? 'opacity-70' : ''}`}
            >
               {isGenerating ? 'AI Analiz Edir...' : 'SyncUNI CV Yarat (AI format)'}
            </motion.button>
          </div>
        </motion.div>
      </div>

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
                 <div className="flex-align-center-gap-1">
                   <button className="btn btn--primary" onClick={handlePrint}>
                     <FiPrinter /> PDF Endir
                   </button>
                   <button className="icon-btn" onClick={() => setShowCVModal(false)}>
                     <FiX />
                   </button>
                 </div>
               </div>

               <div className="cv-document print-cv-area">
                 <div className="cv-header">
                    <h1>{cvStudent.name}</h1>
                    <p>{cvStudent.degree} | GPA: {cvStudent.gpa}</p>
                    <p className="goal">{selectedGoal}</p>
                 </div>

                 <hr />

                 <div className="cv-section">
                   <h4>🤖 AI Xülasəsi (Profile Summary)</h4>
                   <p>{aiSummaryText}</p>
                 </div>

                 <div className="cv-section">
                   <h4>🛠 Təsdiqlənmiş Bacarıqlar (Verified Skills)</h4>
                   <div className="skills-list">
                     {cvStudent.skills.hard.map(skill => (
                       <span key={skill} className="skill-tag">{skill}</span>
                     ))}
                   </div>
                 </div>

                 <div className="cv-section">
                   <h4>🎓 Təhsil və Layihələr</h4>
                   <ul>
                     <li><strong>Müəssisə:</strong> {cvStudent.uni}</li>
                     <li>GPA göstəricisi {cvStudent.gpa} olaraq rəsmi qeydiyyata alınıb.</li>
                     <li>Platforma daxilində ekspertlər tərəfindən verilmiş <strong>{cvStudent.verifyStatus?.references ?? 1} rəsmi referans (təsdilənmiş portfoliosu) mövcuddur.</strong></li>
                     <li>SyncUNI rəqəmsal reyestrinin imtiyazlı istifadəçisidir.</li>
                   </ul>
                 </div>

                 <div className="cv-footer">
                    <p>Bu sənəd SyncUNI AI Engine vasitəsilə <strong>{cvStudent.name}</strong> üçün avtomatik yaradılmışdır.</p>
                 </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
};

export default StudentOperations;
