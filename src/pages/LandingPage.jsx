import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiChevronDown, FiChevronUp, FiBarChart2, FiUsers, FiTrello } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './LandingPage.scss';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, q: "SyncUNI tam olaraq nədir?", a: "SyncUNI universitetlər, şirkətlər və tələbələri bir araya gətirən, məlumat əsaslı karyera və təhsil ekosistemidir." },
    { id: 2, q: "Tələbə kimi necə qeydiyyatdan keçə bilərəm?", a: "Tələbələr yalnız universitetləri tərəfindən platformaya əlavə edildikdə və ya rəsmi dəvət aldıqda qoşula bilərlər. Bu, məlumatların doğruluğunu təmin edir." },
    { id: 3, q: "Şirkətlər üçün üstünlüyü nədir?", a: "Şirkətlər tələbələrin həm akademik göstəricilərini, həm müəllim rəylərini, həm də əlavə kurs sertifikatlarını vahid profildən görə bilirlər." }
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="neon-blob purple"></div>
        <div className="neon-blob blue"></div>
        <div className="container hero__container">
          <motion.div 
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div className="floating-badge badge-1" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>Data-Driven</motion.div>
            <motion.div className="floating-badge badge-2" animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>AI Match Score</motion.div>
            <motion.div className="floating-badge badge-3" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>Skill Gap Engine</motion.div>

            <h1>SyncUNI: Təhsil və İş Dünyasını <span>Data ilə Birləşdiririk</span></h1>
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

      {/* FAQ Section */}
      <section className="faq section">
        <div className="container">
          <div className="section__header">
            <h2>Tez-tez Verilən Suallar</h2>
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
      </section>
    </div>
  );
};

export default LandingPage;
