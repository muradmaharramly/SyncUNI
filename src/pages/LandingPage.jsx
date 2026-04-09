import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiChevronDown, FiChevronUp, FiBarChart2, FiUsers, FiTrello } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './LandingPage.scss';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeRole, setActiveRole] = useState('company');

  const faqs = [
    { id: 1, q: "SyncUNI tam olaraq nədir?", a: "SyncUNI universitetlər, şirkətlər və tələbələri bir araya gətirən, məlumat əsaslı karyera və təhsil ekosistemidir. Məqsədimiz bazardakı 'Skill-gap' (bacarıq boşluğu) problemini riyazi data ilə ölçməkdir." },
    { id: 2, q: "Tələbə kimi platformaya necə qeydiyyatdan keçə bilərəm?", a: "Tələbələr yalnız universitetləri tərəfindən platformaya əlavə edildikdə və ya rəsmi dəvət aldıqda qoşula bilərlər. Bu, məlumatların (GPA, İxtisas) doğruluğunu təmin edir." },
    { id: 3, q: "Şirkətlər üçün üstünlüyü nədir?", a: "Şirkətlər CV yığını içində itmədən, birbaşa aktiv vakansiyalarına uyğun gələn tələbələri 'Match Score' (uyğunluq balı) vasitəsilə ən üstdə görə bilirlər. Sistem həmçinin xüsusi Drag-and-Drop idarəetmə paneli təklif edir." },
    { id: 4, q: "Tədris Mərkəzləri (Kurslar) sistemə necə inteqrasiya olunur?", a: "Rəsmi partnyor kurslar tələbələrin profillərinə keçdikləri təlimlər barədə rəsmi 'Badge' və Sertifikatlar əlavə edə bilərlər. Bu da şirkətlərin namizədlərə olan güvənini artırır." },
    { id: 5, q: "Sistem ödənişlidirmi?", a: "Hazırda baza xidmətlər (Tələbə portfel idarəetməsi və fundamental şirkət profilləri) pulsuzdur. Ətraflı analitika və AI əsaslı tövsiyələr üçün Premium paketlər mövcuddur." }
  ];

  const pricingData = {
    company: [
      { id: 'c1', title: "Startap Planı", price: "199 AZN", period: "/ay", features: ["3 Aktiv vakansiya", "AI Süni Zəka Birləşdirməsi", "Baza karyera portfelləri"], button: "Şirkət Olaraq Seç" },
      { id: 'c2', title: "Korporativ Plan", price: "499 AZN", period: "/ay", features: ["Limitsiz vakansiya", "Dərin analitika", "Aktiv HR idarəetməsi"], badge: "Populyar", button: "Şirkət Olaraq Seç" },
      { id: 'c3', title: "Uğur Komissiyası", price: "5%", period: " / kadrın illik maaşından", features: ["Hər uğurlu işə qəbul üçün xidmət haqqı", "Namizəd zəmanəti", "Fərdi axtarış"], badge: "Nəticəyə Görə", button: "Dəstək Komandası" }
    ],
    university: [
      { id: 'u1', title: "Tərəfdaşlıq Planı", price: "49 AZN", period: "/ay", sub: "Sizin datanız sistemin ruhudur (İnteqrasiya Endirimi)", features: ["Məzun izləmə sistemi", "Sənaye uyğunluq hesabatı", "Rəqəmsal referans idarəçiliyi"], badge: "Xüsusi Tərəfdaşlıq", button: "Universitet Kimi Qoşul" }
    ],
    course: [
      { id: 'co1', title: "Standart Plan", price: "99 AZN", period: "/ay", features: ["Kursların rəsmi siyahıda görünməsi", "Tələbə hədəfləmə analitikası", "5 ədəd reklam banneri"], button: "Kurs Olaraq Seç" },
      { id: 'co2', title: "Böyümə Komissiyası", price: "10%", period: " / kurs haqqından", features: ["Hər qazanılan tələbə üçün", "Doğrulanmış sertifikatlar vermə", "Reytinq xidməti"], badge: "Performans", button: "Bizimlə Tərəfdaş Ol" }
    ]
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="neon-blob purple"></div>
        <div className="neon-blob blue"></div>
        
        {/* Roadmap Roadmap Path BG */}
        <div className="hero__roadmap-bg" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none'}}>
           <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M-100 500 C 300 0, 800 600, 1500 100" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="none" strokeDasharray="30 20" />
             <path d="M-100 600 C 400 100, 700 800, 1500 200" stroke="rgba(124, 58, 237, 0.08)" strokeWidth="8" fill="none" />
           </svg>
        </div>

        <div className="container hero__container">
            <motion.div 
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>SyncUNI: Təhsil və İş Dünyasını <br className="hide-mobile" /><span>Data ilə Birləşdiririk</span></h1>
            <p>Universitetlər, Şirkətlər və Kurslar arasında sinerji yaradaraq, tələbələrin karyera yolunu rəqəmsal və şəffaf şəkildə idarə edirik.</p>
            <div className="hero__actions">
              <Link to="/login" className="btn btn--primary">Platformaya Daxil Ol <FiArrowRight className="icon"/></Link>
              <a href="#about" className="btn btn--outline">Daha Ətraflı</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section - Skills Gap */}
      <section id="about" className="about section">
        <div className="container">
          <div className="section__header">
            <h2>Biz Nəyi Həll Edirik?</h2>
            <p>Universitetlər və Şirkətlər arasındakı "Skills Gap" problemini aradan qaldırırıq.</p>
          </div>
          <div className="about__content">
            <div className="about__text">
              <ul>
                <li><FiCheckCircle className="check-icon" /> İşəgötürənlərin real tələbləri ilə akademik proqramların uyğunlaşdırılması.</li>
                <li><FiCheckCircle className="check-icon" /> Tələbələrin bacarıqlarının mütəxəssislər tərəfindən doğrulanması.</li>
                <li><FiCheckCircle className="check-icon" /> Vahid rəqəmsal "Talent Passport" vasitəsilə asan işə qəbul.</li>
              </ul>
            </div>
            <div className="about__visual">
              {/* Dummy SVG Graphic for Skills Gap */}
              <div className="skills-gap-graphic">
                <div className="node uni">Universitetlər</div>
                <div className="bridge">
                  SyncUNI Data Körpüsü
                </div>
                <div className="node company">Şirkətlər</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="features" className="services section bg-alt">
        <div className="container">
          <div className="section__header">
            <h2>Xidmətlərimiz</h2>
            <p>Hər bir iştirakçı üçün xüsusi həllər</p>
          </div>
          <div className="services__grid">
            <div className="service-card">
              <FiBarChart2 className="service-icon" />
              <h3>Tələbə Analitikası</h3>
              <p>Tələbələrin real bacarıqlarını və inkişaf dinamikasını göstərən qrafiklər və hesabatlar.</p>
            </div>
            <div className="service-card">
              <FiTrello className="service-icon" />
              <h3>Vakansiya İdarəetməsi</h3>
              <p>Şirkətlər üçün tələblərə uyğun ən yaxşı namizədləri avtomatik uyğunlaşdıran sistem.</p>
            </div>
            <div className="service-card">
              <FiUsers className="service-icon" />
              <h3>Kurs İnteqrasiyası</h3>
              <p>Özəl kursların tələbələrə əlavə bacarıq (badge) verməsi və təsdiqləməsi prosesi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate Us */}
      <section id="partners" className="collaborate section">
        <div className="container">
          <div className="section__header">
            <h2>Platformaya Qoşulun</h2>
            <p>Siz kimsiniz və təklifimiz nələrdir?</p>
          </div>
          <div className="collaborate__grid">
            <div className="collab-card">
              <h3>Universitetlər üçün</h3>
              <p>Məzunlarınızın işlə təmin olunma faizini ölçün və müəllim rəylərini sisteme daxil edin.</p>
              <button className="btn btn--outline">Müraciət Et</button>
            </div>
            <div className="collab-card">
              <h3>Kurslar üçün</h3>
              <p>Sertifikatlarınızı rəqəmsallaşdırın və məzunlarınızın şirkətlər tərəfindən kəşf edilməsini təmin edin.</p>
              <button className="btn btn--outline">Müraciət Et</button>
            </div>
            <div className="collab-card">
              <h3>Şirkətlər üçün</h3>
              <p>Vaxtınıza qənaət edin, təsdiqlənmiş bacarıqlara və real müəllim referanslarına əsaslanaraq işə qəbul edin.</p>
              <button className="btn btn--outline">Müraciət Et</button>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Edge Section */}
      <section className="competitor section bg-alt">
        <div className="container">
          <div className="section__header">
            <h2>Niyə SyncUNI?</h2>
            <p>Bizim ənənəvi platformalardan (LinkedIn, Indeed) üstünlüyümüz</p>
          </div>
          <div className="table-responsive">
            <table className="competitor-table">
              <thead>
                <tr>
                  <th>Xüsusiyyət</th>
                  <th>SyncUNI</th>
                  <th>Standart Platformalar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Məlumatın Doğruluğu</td>
                  <td>Universitet tərəfindən rəsmi təsdiqlənir</td>
                  <td>İstifadəçinin özü daxil edir (risq)</td>
                </tr>
                <tr>
                  <td>Akademik İnteqrasiya</td>
                  <td>Bəli (GPA, Rəsmi Kurslar)</td>
                  <td>Xeyr</td>
                </tr>
                <tr>
                  <td>Müəllim Referansları</td>
                  <td>Rəqəmsal, doğrulanmış</td>
                  <td>Çətin tapılan, əsasən açıqdır</td>
                </tr>
                <tr>
                  <td>Fokus</td>
                  <td>Gənclər, Tələbələr və Məzunlar</td>
                  <td>Ümumi peşəkarlar</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing section">
        <div className="container">
          <div className="section__header">
            <h2>Dinamik Paketlər</h2>
            <p>Hər rol üçün xüsusi olaraq düşünülmüş və data-ya əsaslanan qiymətləndirmə.</p>
          </div>
          
          <div className="pricing__toggle">
             <div className="segmented-control">
                <button className={activeRole === 'company' ? 'active' : ''} onClick={() => setActiveRole('company')}>Şirkətlər Üçün</button>
                <button className={activeRole === 'university' ? 'active' : ''} onClick={() => setActiveRole('university')}>Universitetlər Üçün</button>
                <button className={activeRole === 'course' ? 'active' : ''} onClick={() => setActiveRole('course')}>Kurslar Üçün</button>
             </div>
          </div>

          <div className="pricing__grid">
             {pricingData[activeRole].map((plan, i) => (
                <motion.div 
                   key={plan.id}
                   className={`pricing-card glass-card ${plan.badge === 'Popular' ? 'popular' : ''} ${activeRole === 'university' ? 'university-card' : ''}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                   {plan.badge && <div className="card-badge">{plan.badge}</div>}
                   <h3 className="plan-title">{plan.title}</h3>
                   <div className="plan-price">
                      <h2>{plan.price}</h2>
                      <span>{plan.period}</span>
                   </div>
                   {plan.sub && <p className="plan-sub">{plan.sub}</p>}
                   <ul className="plan-features">
                      {plan.features.map((feature, j) => (
                         <li key={j}><FiCheckCircle className="check-icon" /> {feature}</li>
                      ))}
                   </ul>
                   <button className={`btn btn--full ${plan.badge === 'Popular' ? 'btn--primary' : 'btn--outline'}`}>
                      {plan.button}
                   </button>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="modern-cta section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-badge"> SyncUNI - Karyera və Təhsil Ekosistemi</div>
            <h2>Potensialı Karyeraya Çevir!</h2>
            <p>Data əsaslı platformamızla real potensialınızı üzə çıxarın: Bacarıqlarınıza ən uyğun vakansiyaları tapın və şirkətlərin axtardığı top kadrlar sırasına qoşulun.</p>
            <Link to="/login" className="btn btn--primary cta-btn" style={{borderRadius: '2rem', padding: '1rem 2rem', fontSize: '1.1rem'}}>
              Başla <FiArrowRight className="icon"/>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq section">
        <div className="container faq__wrapper" style={{display: 'flex', gap: '4rem', alignItems: 'stretch'}}>
          
          {/* FAQ Visual Left Side */}
          <div className="faq__visual hide-mobile" style={{flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', borderRadius: '15px', border: '1px solid var(--border-color)', overflow: 'hidden'}}>
             <div style={{fontSize: '20rem', color: 'rgba(124, 58, 237, 0.1)', lineHeight: '1', fontWeight: '900', userSelect: 'none', position: 'absolute'}}>?</div>
             <div style={{position: 'absolute', top: '15%', left: '15%', fontSize: '4rem', color: 'rgba(56, 189, 248, 0.2)'}}>?</div>
             <div style={{position: 'absolute', bottom: '15%', right: '20%', fontSize: '6rem', color: 'rgba(124, 58, 237, 0.15)'}}>?</div>
             <div style={{position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem'}}>
                <h3 style={{color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '1rem'}}>Maraqlandığınızı tapmadınız?</h3>
                <p style={{color: 'var(--text-muted)'}}>Bizim peşəkar komandamız sizin bütün texniki və təşkilati suallarınızı cavablandırmağa hər zaman hazırdır.</p>
             </div>
          </div>

          {/* FAQ Content Right Side */}
          <div className="faq__content" style={{flex: 1.5}}>
            <div className="section__header" style={{textAlign: 'left', alignItems: 'flex-start', marginBottom: '2rem'}}>
              <h2 style={{fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Suallarına Cavab Tap</h2>
              <p style={{color: 'var(--text-muted)'}}>Platforma haqqında ən çox soruşulan vacib detallar</p>
            </div>
            <div className="faq__list">
            {faqs.map(faq => (
              <div key={faq.id} className={`faq-item ${openFaq === faq.id ? 'open' : ''}`}>
                <div className="faq-item__header" onClick={() => toggleFaq(faq.id)}>
                  <h3>{faq.q}</h3>
                  {openFaq === faq.id ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                <div className="faq-item__content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__container">
          <div className="footer__brand">
             <h3>Sync<span>UNI</span></h3>
             <p>Təhsil və İş Dünyasını Data ilə Birləşdirən Rəqəmsal Körpü.</p>
          </div>
          <div className="footer__links">
             <div className="link-group">
                <h4>Platform</h4>
                <a href="#features">Xidmətlər</a>
                <a href="#partners">Partnyorlar</a>
                <a href="/login">Giriş</a>
             </div>
             <div className="link-group">
                <h4>Şirkət</h4>
                <a href="#about">Biz Kimik?</a>
                <a href="#">Karyera</a>
             </div>
             <div className="link-group">
                <h4>Hüquqi</h4>
                <a href="#">Məxfilik Şərtləri</a>
                <a href="#">Qaydalar</a>
             </div>
          </div>
        </div>
        <div className="footer__bottom container">
          <p>&copy; {new Date().getFullYear()} SyncUNI. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
