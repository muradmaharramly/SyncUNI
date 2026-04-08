const fs = require('fs');
const path = require('path');

const inputData = {
  "sync_uni_full_ecosystem": {
    "metadata": {
      "generated_at": "2026-04-09",
      "region": "Azerbaijan",
      "total_students": 100,
      "integrity": "Verified"
    },
    "students": [
      { "id": "st1", "name": "Tural İsmayılov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.98, "skills": ["React", "Go", "Docker"], "status": "Looking for Work", "matches": 98 },
      { "id": "st2", "name": "Leyla Əliyeva", "uni": "UFAZ", "major": "Data Science", "gpa": 3.85, "skills": ["Python", "TensorFlow", "SQL"], "status": "Internship", "matches": 94 },
      { "id": "st3", "name": "Murad Həsənov", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.70, "skills": ["Linux", "Networking", "C++"], "status": "Active", "matches": 88 },
      { "id": "st4", "name": "Nərmin Quliyeva", "uni": "UNEC", "major": "Finance", "gpa": 3.90, "skills": ["Excel", "Accounting", "SAP"], "status": "Hired", "matches": 96 },
      { "id": "st5", "name": "Anar Abbasov", "uni": "ASOIU (ADNSU)", "major": "Information Technology", "gpa": 3.45, "skills": ["Java", "Spring Boot", "MySQL"], "status": "Looking for Work", "matches": 82 },
      { "id": "st6", "name": "Fidan Məmmədova", "uni": "ADA University", "major": "Business Administration", "gpa": 3.88, "skills": ["Marketing", "SEO", "Project Management"], "status": "Active", "matches": 91 },
      { "id": "st7", "name": "Elnur Hüseynov", "uni": "UFAZ", "major": "Petroleum Engineering", "gpa": 3.65, "skills": ["Geology", "Drilling", "Teamwork"], "status": "Internship", "matches": 85 },
      { "id": "st8", "name": "Günay Rəsulova", "uni": "UNEC", "major": "Digital Economy", "gpa": 3.78, "skills": ["E-commerce", "Python", "Data Mining"], "status": "Looking for Work", "matches": 89 },
      { "id": "st9", "name": "Zaur Cəfərov", "uni": "BMU", "major": "Industrial Engineering", "gpa": 3.55, "skills": ["Supply Chain", "AutoCAD", "Lean"], "status": "Active", "matches": 78 },
      { "id": "st10", "name": "Sevinc Mahmudova", "uni": "ASOIU (ADNSU)", "major": "Chemical Engineering", "gpa": 3.92, "skills": ["Lab Research", "Safety", "Chemistry"], "status": "Looking for Work", "matches": 93 },
      { "id": "st11", "name": "Rəşad Bağırov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.81, "skills": ["Flutter", "Dart", "Firebase"], "status": "Active", "matches": 90 },
      { "id": "st12", "name": "Fərid Ələkbərov", "uni": "UFAZ", "major": "Computer Science", "gpa": 3.68, "skills": ["Cloud", "Linux", "Python"], "status": "Internship", "matches": 86 },
      { "id": "st13", "name": "Aytən Qasımova", "uni": "UNEC", "major": "Accounting", "gpa": 3.82, "skills": ["Tax Law", "Auditing", "Excel"], "status": "Hired", "matches": 94 },
      { "id": "st14", "name": "Orxan Vəliyev", "uni": "BMU", "major": "Mechanical Engineering", "gpa": 3.42, "skills": ["SolidWorks", "Robotics", "Math"], "status": "Active", "matches": 81 },
      { "id": "st15", "name": "Lalə Səfərova", "uni": "ASOIU (ADNSU)", "major": "Geophysics", "gpa": 3.60, "skills": ["Seismic", "GIS", "Python"], "status": "Looking for Work", "matches": 83 },
      { "id": "st16", "name": "Emil Rzayev", "uni": "ADA University", "major": "IT", "gpa": 3.55, "skills": ["Windows Server", "Help Desk", "ITIL"], "status": "Active", "matches": 77 },
      { "id": "st17", "name": "Nigar Kərimova", "uni": "UFAZ", "major": "Chemical Engineering", "gpa": 3.95, "skills": ["Research", "Safety", "Analysis"], "status": "Hired", "matches": 98 },
      { "id": "st18", "name": "Vüsal Əhmədov", "uni": "UNEC", "major": "Marketing", "gpa": 3.30, "skills": ["Social Media", "Copywriting", "Sales"], "status": "Looking for Work", "matches": 72 },
      { "id": "st19", "name": "Arzu Muradova", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.84, "skills": ["Cryptography", "Network Security", "C"], "status": "Active", "matches": 95 },
      { "id": "st20", "name": "Kənan Tahirov", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.62, "skills": ["PHP", "JavaScript", "SQL"], "status": "Internship", "matches": 84 },
      { "id": "st21", "name": "Pərviz İbrahimov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.77, "skills": ["Kubernetes", "DevOps", "Go"], "status": "Active", "matches": 92 },
      { "id": "st22", "name": "Turanə Qədirova", "uni": "UNEC", "major": "Finance", "gpa": 3.94, "skills": ["Banking", "Risk", "Modeling"], "status": "Hired", "matches": 97 },
      { "id": "st23", "name": "Nicat Sultanov", "uni": "UFAZ", "major": "Data Science", "gpa": 3.50, "skills": ["SQL", "Vizualization", "Python"], "status": "Looking for Work", "matches": 80 },
      { "id": "st24", "name": "Jalə Şərifova", "uni": "BMU", "major": "Marketing", "gpa": 3.66, "skills": ["Market Research", "Public Relations"], "status": "Active", "matches": 85 },
      { "id": "st25", "name": "Ümid Zeynalov", "uni": "ASOIU (ADNSU)", "major": "Petroleum Engineering", "gpa": 3.73, "skills": ["HSE", "Drilling", "Operations"], "status": "Internship", "matches": 88 },
      { "id": "st26", "name": "Nəzrin Babayeva", "uni": "ADA University", "major": "Business Admin", "gpa": 3.96, "skills": ["Leadership", "HR", "Strategy"], "status": "Active", "matches": 99 },
      { "id": "st27", "name": "Ayxan Namazov", "uni": "UFAZ", "major": "Computer Science", "gpa": 3.58, "skills": ["C++", "Graphics", "Mathematics"], "status": "Looking for Work", "matches": 81 },
      { "id": "st28", "name": "Könül Orucova", "uni": "UNEC", "major": "Digital Economy", "gpa": 3.80, "skills": ["Blockchain", "Fintech", "Python"], "status": "Active", "matches": 92 },
      { "id": "st29", "name": "Fuad Yusifov", "uni": "BMU", "major": "Industrial Engineering", "gpa": 3.44, "skills": ["Operations", "Quality", "Stats"], "status": "Internship", "matches": 76 },
      { "id": "st30", "name": "Şəlalə Həsənli", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.69, "skills": ["React", "Node.js", "Express"], "status": "Hired", "matches": 90 },
      { "id": "st31", "name": "Babək Nəbiyev", "uni": "ADA University", "major": "Computer Science", "gpa": 3.85, "skills": ["Rust", "Embedded Systems", "C"], "status": "Active", "matches": 93 },
      { "id": "st32", "name": "Samirə Bağırova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.91, "skills": ["Big Data", "Pyspark", "Scala"], "status": "Looking for Work", "matches": 96 },
      { "id": "st33", "name": "Elnur Məmmədov", "uni": "UNEC", "major": "Finance", "gpa": 3.55, "skills": ["IFRS", "Auditing", "Excel"], "status": "Active", "matches": 82 },
      { "id": "st34", "name": "Aysel Quliyeva", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.79, "skills": ["Pentesting", "Burp Suite", "OWASP"], "status": "Hired", "matches": 91 },
      { "id": "st35", "name": "Rauf Əliyev", "uni": "ASOIU (ADNSU)", "major": "Information Technology", "gpa": 3.48, "skills": ["Swift", "iOS", "UI/UX"], "status": "Active", "matches": 84 },
      { "id": "st36", "name": "Səbinə Rzayeva", "uni": "ADA University", "major": "Business Admin", "gpa": 3.97, "skills": ["Public Speaking", "Negotiation"], "status": "Looking for Work", "matches": 98 },
      { "id": "st37", "name": "Tural Həsənov", "uni": "UFAZ", "major": "Chemical Engineering", "gpa": 3.72, "skills": ["Organic Chemistry", "Lab Management"], "status": "Internship", "matches": 87 },
      { "id": "st38", "name": "Leyla Mahmudova", "uni": "UNEC", "major": "Marketing", "gpa": 3.64, "skills": ["Google Ads", "Analytics", "SEO"], "status": "Active", "matches": 89 },
      { "id": "st39", "name": "Murad Qasımov", "uni": "BMU", "major": "Mechanical Engineering", "gpa": 3.50, "skills": ["MATLAB", "Dynamics", "CAD"], "status": "Looking for Work", "matches": 79 },
      { "id": "st40", "name": "Nigar İsmayılova", "uni": "ASOIU (ADNSU)", "major": "Geophysics", "gpa": 3.76, "skills": ["Seismology", "Remote Sensing"], "status": "Active", "matches": 88 },
      { "id": "st41", "name": "Ayxan Ələkbərov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.88, "skills": ["Next.js", "Tailwind", "Prisma"], "status": "Hired", "matches": 95 },
      { "id": "st42", "name": "Nərmin Tahirova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.93, "skills": ["Deep Learning", "NLP", "PyTorch"], "status": "Active", "matches": 97 },
      { "id": "st43", "name": "Elvin Abbasov", "uni": "UNEC", "major": "Digital Economy", "gpa": 3.42, "skills": ["E-marketing", "SQL", "Trading"], "status": "Looking for Work", "matches": 78 },
      { "id": "st44", "name": "Fidan Vəliyeva", "uni": "BMU", "major": "Industrial Engineering", "gpa": 3.70, "skills": ["Project Control", "Optimisation"], "status": "Internship", "matches": 86 },
      { "id": "st45", "name": "Orxan Sultanov", "uni": "ASOIU (ADNSU)", "major": "Information Technology", "gpa": 3.59, "skills": ["Vue.js", "Nuxt", "PostgreSQL"], "status": "Active", "matches": 83 },
      { "id": "st46", "name": "Günay Şərifova", "uni": "ADA University", "major": "Business Admin", "gpa": 3.94, "skills": ["Financial Strategy", "Management"], "status": "Hired", "matches": 96 },
      { "id": "st47", "name": "Zaur Namazov", "uni": "UFAZ", "major": "Petroleum Engineering", "gpa": 3.60, "skills": ["Geostatistics", "Petrel"], "status": "Active", "matches": 84 },
      { "id": "st48", "name": "Sevinc Orucova", "uni": "UNEC", "major": "Accounting", "gpa": 3.85, "skills": ["Costs", "Audit", "Financial Law"], "status": "Looking for Work", "matches": 92 },
      { "id": "st49", "name": "Emil Yusifov", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.52, "skills": ["Forensics", "SIEM", "Python"], "status": "Internship", "matches": 81 },
      { "id": "st50", "name": "Turanə Tahirova", "uni": "ASOIU (ADNSU)", "major": "Chemical Engineering", "gpa": 3.89, "skills": ["Polymers", "Reaction Eng."], "status": "Active", "matches": 94 },
      { "id": "st51", "name": "Anar Kərimov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.82, "skills": ["Redux", "GraphQL", "Sass"], "status": "Active", "matches": 91 },
      { "id": "st52", "name": "Səbinə Məmmədova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.75, "skills": ["Matplotlib", "Seaborn", "Numpy"], "status": "Looking for Work", "matches": 88 },
      { "id": "st53", "name": "Fərid Quliyev", "uni": "UNEC", "major": "Finance", "gpa": 3.68, "skills": ["Stocks", "Valuation", "Excel"], "status": "Active", "matches": 85 },
      { "id": "st54", "name": "Aytən Həsənova", "uni": "BMU", "major": "Marketing", "gpa": 3.55, "skills": ["Branding", "Events", "Ads"], "status": "Internship", "matches": 82 },
      { "id": "st55", "name": "Murad Əlizadə", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.40, "skills": ["ASP.NET", "C#", "EF Core"], "status": "Looking for Work", "matches": 76 },
      { "id": "st56", "name": "Nigar Bağırova", "uni": "ADA University", "major": "Business Admin", "gpa": 3.98, "skills": ["Communication", "HR Analytics"], "status": "Hired", "matches": 99 },
      { "id": "st57", "name": "Elnur Rzayev", "uni": "UFAZ", "major": "Chemical Engineering", "gpa": 3.66, "skills": ["Catalysis", "Heat Transfer"], "status": "Active", "matches": 84 },
      { "id": "st58", "name": "Leyla Qasımova", "uni": "UNEC", "major": "Accounting", "gpa": 3.83, "skills": ["IFRS", "Treasury"], "status": "Looking for Work", "matches": 92 },
      { "id": "st59", "name": "Rəşad Vəliyev", "uni": "BMU", "major": "Mechanical Engineering", "gpa": 3.49, "skills": ["AutoCAD", "Thermodynamics"], "status": "Active", "matches": 80 },
      { "id": "st60", "name": "Günay Səfərova", "uni": "ASOIU (ADNSU)", "major": "Geophysics", "gpa": 3.72, "skills": ["Seismic", "ArcGIS"], "status": "Internship", "matches": 87 },
      { "id": "st61", "name": "Tural Muradov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.90, "skills": ["Java", "Microservices", "Kafka"], "status": "Hired", "matches": 96 },
      { "id": "st62", "name": "Aysel Əhmədova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.86, "skills": ["Hadoop", "Spark", "NoSQL"], "status": "Active", "matches": 94 },
      { "id": "st63", "name": "Murad İbrahimov", "uni": "UNEC", "major": "Digital Economy", "gpa": 3.52, "skills": ["Python", "Pandas", "Trading"], "status": "Looking for Work", "matches": 81 },
      { "id": "st64", "name": "Nərmin Şərifova", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.78, "skills": ["Firewalls", "VPN", "Metasploit"], "status": "Active", "matches": 90 },
      { "id": "st65", "name": "Ayxan Rəsulov", "uni": "ASOIU (ADNSU)", "major": "Information Technology", "gpa": 3.44, "skills": ["Angular", "RxJS", "TypeScript"], "status": "Internship", "matches": 82 },
      { "id": "st66", "name": "Fidan Babayeva", "uni": "ADA University", "major": "Business Admin", "gpa": 3.92, "skills": ["Operations", "Logistics", "SAP"], "status": "Looking for Work", "matches": 93 },
      { "id": "st67", "name": "Orxan Namazov", "uni": "UFAZ", "major": "Petroleum Engineering", "gpa": 3.61, "skills": ["Reservoir", "Logging"], "status": "Active", "matches": 85 },
      { "id": "st68", "name": "Nigar Orucova", "uni": "UNEC", "major": "Finance", "gpa": 3.87, "skills": ["Portfolio", "Markets"], "status": "Hired", "matches": 95 },
      { "id": "st69", "name": "Zaur Yusifov", "uni": "BMU", "major": "Industrial Engineering", "gpa": 3.47, "skills": ["Lean", "Six Sigma"], "status": "Active", "matches": 79 },
      { "id": "st70", "name": "Sevinc Həsənli", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.65, "skills": ["React", "Express", "Mongo"], "status": "Looking for Work", "matches": 88 },
      { "id": "st71", "name": "Anar Nəbiyev", "uni": "ADA University", "major": "Computer Science", "gpa": 3.84, "skills": ["C#", "Unity", "Shaders"], "status": "Active", "matches": 91 },
      { "id": "st72", "name": "Leyla Bağırova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.90, "skills": ["Reinforcement Learning", "NLP"], "status": "Internship", "matches": 95 },
      { "id": "st73", "name": "Murad Məmmədov", "uni": "UNEC", "major": "Finance", "gpa": 3.58, "skills": ["Financial Reporting", "IFRS"], "status": "Active", "matches": 83 },
      { "id": "st74", "name": "Aysel Quliyeva", "uni": "BMU", "major": "Marketing", "gpa": 3.62, "skills": ["Content Strategy", "SEO"], "status": "Looking for Work", "matches": 84 },
      { "id": "st75", "name": "Rauf Ələkbərov", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.46, "skills": ["Django", "Python", "API"], "status": "Active", "matches": 82 },
      { "id": "st76", "name": "Səbinə Rəsulova", "uni": "ADA University", "major": "Business Admin", "gpa": 3.95, "skills": ["Teamwork", "Public Speaking"], "status": "Hired", "matches": 97 },
      { "id": "st77", "name": "Tural Tahirov", "uni": "UFAZ", "major": "Chemical Engineering", "gpa": 3.74, "skills": ["Simulation", "Kinetics"], "status": "Active", "matches": 88 },
      { "id": "st78", "name": "Leyla Muradova", "uni": "UNEC", "major": "Accounting", "gpa": 3.81, "skills": ["Quickbooks", "Audit"], "status": "Looking for Work", "matches": 90 },
      { "id": "st79", "name": "Murad İsmayılov", "uni": "BMU", "major": "Mechanical Engineering", "gpa": 3.51, "skills": ["Fusion 360", "Mechanics"], "status": "Internship", "matches": 79 },
      { "id": "st80", "name": "Nigar Qasımova", "uni": "ASOIU (ADNSU)", "major": "Geophysics", "gpa": 3.73, "skills": ["GIS", "Geology"], "status": "Active", "matches": 86 },
      { "id": "st81", "name": "Ayxan Rzayev", "uni": "ADA University", "major": "Computer Science", "gpa": 3.89, "skills": ["PostgreSQL", "Docker", "Go"], "status": "Hired", "matches": 96 },
      { "id": "st82", "name": "Nərmin Əliyeva", "uni": "UFAZ", "major": "Data Science", "gpa": 3.94, "skills": ["Pytorch", "Kubeflow"], "status": "Active", "matches": 97 },
      { "id": "st83", "name": "Elvin Quliyev", "uni": "UNEC", "major": "Digital Economy", "gpa": 3.40, "skills": ["E-com", "Facebook Ads"], "status": "Looking for Work", "matches": 75 },
      { "id": "st84", "name": "Fidan Həsənova", "uni": "BMU", "major": "Industrial Engineering", "gpa": 3.69, "skills": ["Inventory", "Procurement"], "status": "Active", "matches": 85 },
      { "id": "st85", "name": "Orxan Bağırov", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.57, "skills": ["Laravel", "MySQL", "Vue"], "status": "Internship", "matches": 83 },
      { "id": "st86", "name": "Günay Tahirova", "uni": "ADA University", "major": "Business Admin", "gpa": 3.93, "skills": ["Excel", "Operations"], "status": "Active", "matches": 94 },
      { "id": "st87", "name": "Zaur Məmmədov", "uni": "UFAZ", "major": "Petroleum Engineering", "gpa": 3.63, "skills": ["Well Testing", "Safety"], "status": "Looking for Work", "matches": 82 },
      { "id": "st88", "name": "Sevinc Rzayeva", "uni": "UNEC", "major": "Finance", "gpa": 3.86, "skills": ["Derivatives", "Risk"], "status": "Hired", "matches": 95 },
      { "id": "st89", "name": "Emil Əlizadə", "uni": "BMU", "major": "Cybersecurity", "gpa": 3.53, "skills": ["Malware Analysis", "C++"], "status": "Active", "matches": 81 },
      { "id": "st90", "name": "Turanə Həsənova", "uni": "ASOIU (ADNSU)", "major": "Chemical Engineering", "gpa": 3.90, "skills": ["Reactors", "Thermodynamics"], "status": "Looking for Work", "matches": 92 },
      { "id": "st91", "name": "Anar Rəsulov", "uni": "ADA University", "major": "Computer Science", "gpa": 3.81, "skills": ["Redis", "RabbitMQ", "Node"], "status": "Active", "matches": 90 },
      { "id": "st92", "name": "Səbinə Tahirova", "uni": "UFAZ", "major": "Data Science", "gpa": 3.77, "skills": ["OpenCV", "Scikit-learn"], "status": "Internship", "matches": 88 },
      { "id": "st93", "name": "Fərid Qasımov", "uni": "UNEC", "major": "Accounting", "gpa": 3.84, "skills": ["Corporate Tax", "IAS"], "status": "Active", "matches": 92 },
      { "id": "st94", "name": "Aytən Bağırova", "uni": "BMU", "major": "Marketing", "gpa": "3.58", "skills": ["SEO", "SEM", "Writing"], "status": "Looking for Work", "matches": 81 },
      { "id": "st95", "name": "Murad Əliyev", "uni": "ASOIU (ADNSU)", "major": "IT", "gpa": 3.42, "skills": ["Unity", "C#", "Blender"], "status": "Active", "matches": 77 },
      { "id": "st96", "name": "Nigar Həsənova", "uni": "ADA University", "major": "Business Admin", "gpa": 3.98, "skills": ["Negotiation", "Leadership"], "status": "Hired", "matches": 99 },
      { "id": "st97", "name": "Elnur Quliyev", "uni": "UFAZ", "major": "Chemical Engineering", "gpa": 3.65, "skills": ["Petrochemistry", "Safety"], "status": "Active", "matches": 83 },
      { "id": "st98", "name": "Leyla Ələkbərova", "uni": "UNEC", "major": "Finance", "gpa": 3.82, "skills": ["Valuation", "Banking"], "status": "Internship", "matches": 91 },
      { "id": "st99", "name": "Tural Şərifov", "uni": "BMU", "major": "Mechanical Engineering", "gpa": 3.48, "skills": ["SolidWorks", "HVAC"], "status": "Looking for Work", "matches": 78 },
      { "id": "st100", "name": "Aysel Rzayeva", "uni": "ASOIU (ADNSU)", "major": "Information Technology", "gpa": 3.70, "skills": ["JavaScript", "SQL", "Git"], "status": "Active", "matches": 87 }
    ],
    "job_listings": [
      { "id": "j1", "company": "PASHA Bank", "title": "Frontend Developer", "type": "Full-time", "applicants": 156 },
      { "id": "j2", "company": "ABB", "title": "Security Analyst", "type": "Internship", "applicants": 89 },
      { "id": "j3", "company": "SOCAR", "title": "Data Engineer", "type": "Full-time", "applicants": 210 },
      { "id": "j4", "company": "Azercell", "title": "Junior Python Dev", "type": "Full-time", "applicants": 120 },
      { "id": "j5", "company": "Kapital Bank", "title": "Risk Analyst", "type": "Internship", "applicants": 65 },
      { "id": "j6", "company": "Neqsol Holding", "title": "Management Trainee", "type": "Full-time", "applicants": 180 },
      { "id": "j7", "company": "Trendyol", "title": "Backend Intern", "type": "Internship", "applicants": 250 },
      { "id": "j8", "company": "AzInTelecom", "title": "Cloud Engineer", "type": "Full-time", "applicants": 95 }
    ]
  }
};

const students = inputData.sync_uni_full_ecosystem.students.map(s => {
  let status = "Looking";
  if (s.status === "Hired") status = "Hired";
  if (s.status === "Active" || s.status === "Internship") status = "Active";

  return {
    id: s.id.toUpperCase(),
    name: s.name,
    uni: s.uni,
    major: s.major,
    gpa: parseFloat(s.gpa) || 3.5,
    skills: {
      hard: s.skills,
      soft: ["Teamwork", "Problem Solving"]
    },
    verifyStatus: {
      uni: true,
      courses: ["SyncUNI Base"],
      references: Math.floor(Math.random() * 6) + 1
    },
    activityScore: Math.floor(Math.random() * (98 - 70 + 1)) + 70,
    matchRate: s.matches,
    status: status,
    timeline: []
  };
});

let dummyDataContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'dummyData.js'), 'utf8');

const transformedCode = `export const SYNC_DATA = {
  students: ${JSON.stringify(students, null, 4)},
  job_listings: ${JSON.stringify(inputData.sync_uni_full_ecosystem.job_listings, null, 4)},
  companies: [
    { id: "C01", name: "PASHA Bank", efficiency: 94, activeAds: 12, reputation: 4.9 },
    { id: "C02", name: "Azercell", efficiency: 88, activeAds: 8, reputation: 4.7 },
    { id: "C03", name: "TechAz", efficiency: 85, activeAds: 5, reputation: 4.5 }
  ],
  universities: [
    { id: "U01", name: "ADA University", placementRate: 88, totalStudents: 1500 },
    { id: "U02", name: "Baku State University", placementRate: 75, totalStudents: 8000 }
  ],
  references: [
    { id: "R1", studentId: "ST1", teacher: "Prof. Rüstəm", skills: 5, ethics: 5, teamwork: 4, comment: "Exceptional skills in React." },
    { id: "R2", studentId: "ST2", teacher: "Dosent Leyla", skills: 4, ethics: 5, teamwork: 5, comment: "Great team player." }
  ],
  hiringAccuracyTimeline: [
    { month: 'Yan', score: 78, expected: 80 },
    { month: 'Fev', score: 82, expected: 81 },
    { month: 'Mar', score: 88, expected: 85 },
    { month: 'Apr', score: 91, expected: 89 },
    { month: 'May', score: 94, expected: 92 },
  ]
};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'dummyData.js'), transformedCode);
console.log("Success");
