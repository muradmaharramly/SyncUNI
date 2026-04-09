import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiEye, FiShare2, FiCalendar, FiArrowRight,
  FiStar, FiX, FiTag, FiBookOpen, FiAward, FiBriefcase,
  FiHeart, FiZap, FiExternalLink
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import './ElanlarPage.scss';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ELANLAR = [
  {
    id: 'e1', type: 'is-vakansiyasi', tier: 'vip',
    title: 'PASHA Bank – Frontend Developer (React)',
    shortDesc: 'PASHA Bank texnologiya komandası üçün React.js üzrə təcrübəli developer axtarır.',
    fullDesc: 'PASHA Bank-ın Digital Transformation departamentinə React.js, TypeScript və RESTful API üzrə bilikləri olan Frontend Developer axtarılır. Namizədin mentorluq bacarığı, Agile metodologiyasını bilməsi üstünlükdür. Aylıq brüt maaş 2500–4000 AZN arasında olacaq. Hybrid iş rejimi mövcuddur.',
    tags: ['React', 'TypeScript', 'PASHA Bank', 'Hybrid'],
    publishDate: '2026-04-07', views: 1284, shares: 87,
    publisher: { name: 'PASHA Bank HR', plan: 'vip' },
    cta: 'İndi Müraciət Et',
  },
  {
    id: 'e2', type: 'kurs', tier: 'standard',
    title: 'Python & Data Science Bootcamp – ADA University',
    shortDesc: 'ADA University tərəfindən 8 həftəlik intensiv Python and Data Science proqramı.',
    fullDesc: 'Bu bootcamp tələbələrə Python proqramlaşdırma, NumPy, Pandas, Matplotlib, Scikit-learn kimi kitabxanaları öyrədəcəkdir. Kurs sertifikatı ADA University tərəfindən rəsmi verilir. Pillə sayı: 8 həftə, hər həftə 12 saat. Ödəniş: 450 AZN (taksit şərti mövcuddur).',
    tags: ['Python', 'Data Science', 'ADA', 'Sertifikat'],
    publishDate: '2026-04-05', views: 743, shares: 52,
    publisher: { name: 'ADA University', plan: 'standard' },
    cta: 'Qeydiyyatdan Keç',
  },
  {
    id: 'e3', type: 'tedbir', tier: 'vip',
    title: 'TechFest 2026 – Azərbaycanın Ən Böyük IT Festivalı',
    shortDesc: 'Azərbaycanın ən iri texnologiya tədbirindən geri qalmayın! 200+ spiker, 5000+ iştirakçı.',
    fullDesc: 'TechFest 2026 – 15-17 May tarixlərində Bakı Olimpiya Stadionunda keçiriləcək. Bu ilin proqramında AI, Blockchain, Startup Pitch, Hackathon, Career Fair kimi bölimlər var. Bilet qiyməti: 30 AZN (online), 50 AZN (qapıda). Tələbə güzəşti: 50% endirim mövcuddur.',
    tags: ['Tech', 'Festival', 'AI', 'Bakı', '2026'],
    publishDate: '2026-04-03', views: 2109, shares: 341,
    publisher: { name: 'TechFest Org', plan: 'vip' },
    cta: 'Bilet Al',
  },
  {
    id: 'e4', type: 'sertifikasiya', tier: 'vip',
    title: 'AWS Certified Solutions Architect – Hazırlıq Kursu',
    shortDesc: 'Amazon AWS sertifikatını qazanmaq üçün tam hazırlıq proqramı. 98% keçmə faizi.',
    fullDesc: 'Bu kurs AWS-in rəsmi sertifikasiya imtahanına hazırlıq üçün hazırlanmışdır. 12 həftəlik proqram boyunca EC2, S3, Lambda, IAM, VPC və digər AWS xidmətləri əhatəli şəkildə öyrədilir. 3 mock imtahan daxildir. Uğurlu kurs bitirənlərə mock exam xərcləri geri qaytarılır.',
    tags: ['AWS', 'Cloud', 'Sertifikat', 'DevOps'],
    publishDate: '2026-04-01', views: 981, shares: 134,
    publisher: { name: 'CloudStep AZ', plan: 'vip' },
    cta: 'Proqrama Yaz',
  },
  {
    id: 'e5', type: 'konulluluq', tier: 'standard',
    title: 'UNICEF Azərbaycan – Könüllü Tədqiqat Köməkçisi',
    shortDesc: 'UNICEF Azərbaycan biurası uşaq hüquqları sahəsindəki araşdırma üçün könüllülər axtarır.',
    fullDesc: 'UNICEF Azərbaycan biurası sosial sahədə fəaliyyət göstərmək istəyən tələbə könüllüləri cəlb edir. Vəzifələrə daxildir: anket tədqiqatı, sahə qeydiyyatı, hesabat yazma. Haftalıq öhdəlik: 10-12 saat. Könüllülük 6 ay davam edəcək. Referens məktubu veriləcəkdir.',
    tags: ['UNICEF', 'Könüllülük', 'Sosial', 'NGO'],
    publishDate: '2026-03-29', views: 487, shares: 29,
    publisher: { name: 'UNICEF AZ', plan: 'standard' },
    cta: 'Müraciət Et',
  },
  {
    id: 'e6', type: 'tecrube', tier: 'standard',
    title: 'SOCAR IT – Yay Stajı 2026 (Texniki Blok)',
    shortDesc: 'SOCAR-ın IT departamentinin Yay Stajı proqramı açıqdır. Son müraciət tarixi: 30 Aprel.',
    fullDesc: 'SOCAR-ın İnformasiya Texnologiyaları departamenti 2026-cı il üçün yay staj proqramına müraciətlər qəbul edir. 3 aylıq staj dövründə iştirakçılar real infrastruktura layihələrindən birinə qatılacaqlar. Tələblər: İT sahəsi üzrə 3-cü kurs tələbəsi, az-az orta SQL, Linux bilikləri. Ödənişli staj: 450 AZN/ay.',
    tags: ['SOCAR', 'Staj', 'IT', 'Ödənişli'],
    publishDate: '2026-03-25', views: 1673, shares: 215,
    publisher: { name: 'SOCAR HR', plan: 'standard' },
    cta: 'Formulyar Doldur',
  },
  {
    id: 'e7', type: 'kurs', tier: 'vip',
    title: 'UI/UX Design Masterclass – Figma ilə A-dan Z-yə',
    shortDesc: 'Peşəkar UI/UX mütəxəssislər tərəfindən hazırlanmış 6 həftəlik intensiv kurs.',
    fullDesc: 'Figma, Prototyping, Design Thinking, İstifadəçi Tədqiqatı, Usability Testing, Accessibility kimi 15 moduldan ibarət intensiv bir kurs. Hər həftə real layihə tapşırığı verilir. Kurs sonunda portfolio-da göstərilə biləcək 3 case study hazırlanır. SyncUNI platformasında sertifikat əlavə edilir.',
    tags: ['Figma', 'UI/UX', 'Portfolio', 'Dizayn'],
    publishDate: '2026-03-22', views: 856, shares: 98,
    publisher: { name: 'DesignLab AZ', plan: 'vip' },
    cta: 'Dərhal Başla',
  },
  {
    id: 'e8', type: 'is-vakansiyasi', tier: 'standard',
    title: 'Azercell – Junior Python Developer',
    shortDesc: 'Azercell texnologiya komandası üçün Python/Django üzrə junior developer axtarılır.',
    fullDesc: 'Azercell Telekommunikasiya şirkəti üçün Python, Django, PostgreSQL biliklərinə sahib Junior Developer axtarılır. Vəzifəyə daxildir: backend API-ların yaradılması, mövcud sistemlərin dəstəklənməsi, CI/CD axınının idarə edilməsi. Full-time, ofis formatı. Maaş: müsahibə nəticəsindən asılıdır.',
    tags: ['Python', 'Django', 'Azercell', 'Junior'],
    publishDate: '2026-03-18', views: 1105, shares: 73,
    publisher: { name: 'Azercell HR', plan: 'standard' },
    cta: 'CV Göndər',
  },
];

const FILTER_TABS = [
  { key: 'all',            label: 'Hamısı',              icon: <FiTag /> },
  { key: 'kurs',           label: 'Kurslar',             icon: <FiBookOpen /> },
  { key: 'tedbir',         label: 'Tədbirlər',           icon: <FiZap /> },
  { key: 'sertifikasiya',  label: 'Sertifikatlaşdırma',  icon: <FiAward /> },
  { key: 'is-vakansiyasi', label: 'İş Vakansiyaları',    icon: <FiBriefcase /> },
  { key: 'konulluluq',     label: 'Könüllülük',          icon: <FiHeart /> },
  { key: 'tecrube',        label: 'Təcrübə / Staj',      icon: <FiStar /> },
];

const TYPE_COLORS = {
  kurs:           { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6' },
  tedbir:         { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b' },
  sertifikasiya:  { bg: 'rgba(139,92,246,0.12)',  color: '#8b5cf6' },
  'is-vakansiyasi':{ bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  konulluluq:     { bg: 'rgba(236,72,153,0.12)',  color: '#ec4899' },
  tecrube:        { bg: 'rgba(249,115,22,0.12)',  color: '#f97316' },
};

const fmt = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : n;
const fmtDate = (d) => new Date(d).toLocaleDateString('az-AZ', { day:'numeric', month:'short', year:'numeric' });

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal = ({ elan, onClose }) => {
  const typeStyle = TYPE_COLORS[elan.type] || {};
  return (
    <motion.div className="elan-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div className="elan-detail glass-panel"
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="elan-close icon-btn" onClick={onClose}><FiX /></button>

        <div className="elan-detail__head">
          <div className="elan-type-badge" style={{ background: typeStyle.bg, color: typeStyle.color }}>
            {FILTER_TABS.find(t=>t.key===elan.type)?.label || elan.type}
          </div>
          {elan.tier === 'vip' && <div className="vip-badge"><FiStar /> VIP</div>}
        </div>

        <h2 className="elan-detail__title">{elan.title}</h2>

        <div className="elan-detail__meta">
          <span><FiCalendar /> {fmtDate(elan.publishDate)}</span>
          <span><FiEye /> {fmt(elan.views)} baxış</span>
          <span><FiShare2 /> {elan.shares} paylaşım</span>
          <span className="publisher-name">📌 {elan.publisher.name}</span>
        </div>

        <div className="elan-detail__full-desc">
          {elan.fullDesc.split('. ').map((sentence, i) => sentence && (
            <p key={i}>{sentence}{!sentence.endsWith('.') ? '.' : ''}</p>
          ))}
        </div>

        <div className="elan-tags">
          {elan.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div className="elan-detail__actions">
          <button className="btn btn--primary elan-cta-big">
            {elan.cta} <FiArrowRight />
          </button>
          <button className="btn btn--outline" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
            <FiShare2 /> Paylaş
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Single Elan Card ─────────────────────────────────────────────────────────
const ElanCard = ({ elan, onDetail }) => {
  const typeStyle = TYPE_COLORS[elan.type] || {};
  const isVip = elan.tier === 'vip';

  return (
    <motion.div
      className={`elan-card glass-panel ${isVip ? 'vip' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      layout
    >
      {isVip && <div className="vip-badge-corner"><FiStar /> VIP</div>}

      <div className="elan-card__header">
       
        <span className="elan-publisher">{elan.publisher.name}</span>
      </div>

      <h3 className="elan-card__title">{elan.title}</h3>
      <p className="elan-card__desc">{elan.shortDesc}</p>

      <div className="elan-tags">
        {elan.tags.slice(0, 3).map(tag => <span key={tag} className="tag">{tag}</span>)}
        {elan.tags.length > 3 && <span className="tag tag--more">+{elan.tags.length - 3}</span>}
      </div>

      <div className="elan-card__footer">
        <div className="elan-meta">
          <span><FiCalendar /> {fmtDate(elan.publishDate)}</span>
          <span><FiEye /> {fmt(elan.views)}</span>
          <span><FiShare2 /> {elan.shares}</span>
        </div>
        <div className="elan-actions">
          <button className="btn-detail" onClick={() => onDetail(elan)}>
            <FiExternalLink /> Ətraflı
          </button>
          <button className="btn btn--primary btn-cta">
            {elan.cta} <FiArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ElanlarPage = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch]             = useState('');
  const [selectedElan, setSelectedElan] = useState(null);

  const filtered = useMemo(() =>
    ELANLAR.filter(e => {
      const matchType   = activeFilter === 'all' || e.type === activeFilter;
      const q           = search.toLowerCase();
      const matchSearch = !q || e.title.toLowerCase().includes(q)
        || e.shortDesc.toLowerCase().includes(q)
        || e.tags.some(t => t.toLowerCase().includes(q));
      return matchType && matchSearch;
    }),
    [activeFilter, search]
  );

  return (
    <motion.div className="elanlar-page"
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Elanlar Lövhəsi</h2>
          <p>Kurslar, tədbirlər, vakansiyalar, könüllülük və staj imkanları bir yerdə.</p>
        </div>
        <div className="elan-legend">
          <span className="legend-item standard">● Standart</span>
          <span className="legend-item vip"><FiStar /> VIP</span>
        </div>
      </div>

      {/* Search */}
      <div className="elan-search glass-panel">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Elan adı, kateqoriya, tag ilə axtar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button className="clear-search" onClick={() => setSearch('')}><FiX /></button>}
      </div>

      {/* Filter Tabs */}
      <div className="elan-filters">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            className={`filter-tab ${activeFilter === tab.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="elan-results-count">
        <span>{filtered.length} elan tapıldı</span>
      </div>

      {/* Cards Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div className="elan-empty-state" key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p>Axtarışa uyğun elan tapılmadı.</p>
          </motion.div>
        ) : (
          <motion.div className="elanlar-grid">
            {filtered.map(elan => (
              <ElanCard key={elan.id} elan={elan} onDetail={setSelectedElan} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedElan && (
          <DetailModal elan={selectedElan} onClose={() => setSelectedElan(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ElanlarPage;
