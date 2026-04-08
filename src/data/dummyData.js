export const SYNC_DATA = {
  students: [
    {
      id: "ST001", name: "Tural İsmayılov", uni: "ADA University", gpa: 3.9,
      skills: { hard: ["React", "Python", "SQL"], soft: ["Leadership", "Public Speaking"] },
      verifyStatus: { uni: true, courses: ["Udemy", "Step IT"], references: 5 },
      activityScore: 92, matchRate: 98, status: "Active", funnelStage: "Interview",
      timeline: [
        { date: "2026-01", event: "Finished Advanced React Course" },
        { date: "2026-03", event: "Won Web3 Hackathon" }
      ]
    },
    {
      id: "ST002", name: "Nəzrin Məmmədova", uni: "Baku State University", gpa: 3.6,
      skills: { hard: ["Java", "Spring Boot", "AWS"], soft: ["Teamwork", "Agile"] },
      verifyStatus: { uni: true, courses: ["Coursera"], references: 3 },
      activityScore: 85, matchRate: 88, status: "Hired",
      timeline: [
        { date: "2025-09", event: "Started Java Spring Course" },
        { date: "2026-02", event: "Internship at PASHA Bank" }
      ]
    },
    {
      id: "ST003", name: "Orxan Əliyev", uni: "UFAZ", gpa: 3.4,
      skills: { hard: ["Data Science", "Python", "Pandas"], soft: ["Analytical Thinking", "Problem Solving"] },
      verifyStatus: { uni: false, courses: [], references: 1 },
      activityScore: 70, matchRate: 65, status: "Looking",
      timeline: [
        { date: "2025-11", event: "Completed Data Science Fundamentals" }
      ]
    },
    {
      id: "ST004", name: "Aysel Qasımova", uni: "ADA University", gpa: 3.95,
      skills: { hard: ["UI/UX Design", "Figma", "Framer"], soft: ["Empathy", "User Research"] },
      verifyStatus: { uni: true, courses: ["Google UX"], references: 8 },
      activityScore: 98, matchRate: 95, status: "Active",
      timeline: [
        { date: "2025-06", event: "Google UX Design Certificate" },
        { date: "2026-01", event: "Redesigned SyncUNI Demo" }
      ]
    },
    {
      id: "ST005", name: "Rüstəm Həsənov", uni: "Khazar University", gpa: 3.2,
      skills: { hard: ["C#", ".NET", "SQL Server"], soft: ["Adaptability"] },
      verifyStatus: { uni: true, courses: [], references: 2 },
      activityScore: 75, matchRate: 72, status: "Looking",
      timeline: [
        { date: "2026-02", event: "Published personal project on GitHub" }
      ]
    },
    {
      id: "ST006", name: "Lalə Səfərova", uni: "Baku Engineering University", gpa: 3.8,
      skills: { hard: ["CyberSecurity", "Linux", "Networking"], soft: ["Detail-Oriented", "Critical Thinking"] },
      verifyStatus: { uni: true, courses: ["CompTIA Security+"], references: 4 },
      activityScore: 90, matchRate: 92, status: "Active",
      timeline: [
        { date: "2025-12", event: "Got CompTIA Security+ Badge" }
      ]
    },
    { id: "ST007", name: "Elvin Rüstəmov", uni: "UNEC", gpa: 3.1, skills: { hard: ["Excel", "Financial Modeling"], soft: ["Communication"] }, verifyStatus: { uni: true, courses: [], references: 1 }, activityScore: 60, matchRate: 55, status: "Looking", timeline: [{date: "2025-10", event: "Passed Accounting 101"}] },
    { id: "ST008", name: "Sevinc Quliyeva", uni: "ADA University", gpa: 3.5, skills: { hard: ["React", "CSS", "Tailwind"], soft: ["Creativity"] }, verifyStatus: { uni: true, courses: ["Udemy"], references: 3 }, activityScore: 82, matchRate: 85, status: "Hired", timeline: [{date: "2026-02", event: "Front-End Developer at TechAz"}] },
    { id: "ST009", name: "Rəhman Xəlilov", uni: "Baku State University", gpa: 3.3, skills: { hard: ["Go", "Docker", "Kubernetes"], soft: ["Independence"] }, verifyStatus: { uni: false, courses: [], references: 2 }, activityScore: 78, matchRate: 80, status: "Active", timeline: [{date: "2026-03", event: "Mastered DevOps Basics"}] },
    { id: "ST010", name: "Günay İbrahimova", uni: "UFAZ", gpa: 3.85, skills: { hard: ["Python", "Machine Learning", "TensorFlow"], soft: ["Logical Reasoning"] }, verifyStatus: { uni: true, courses: ["Coursera"], references: 6 }, activityScore: 95, matchRate: 99, status: "Active", timeline: [{date: "2025-11", event: "Deep Learning Specialization built."}] },
    { id: "ST011", name: "Teymur Əhədov", uni: "Khazar University", gpa: 2.9, skills: { hard: ["HTML", "CSS", "JS"], soft: ["Time Management"] }, verifyStatus: { uni: true, courses: [], references: 0 }, activityScore: 50, matchRate: 40, status: "Looking", timeline: [] },
    { id: "ST012", name: "Aytən Rəhimova", uni: "UNEC", gpa: 3.7, skills: { hard: ["Marketing", "SEO", "Google Analytics"], soft: ["Public Speaking", "Writing"] }, verifyStatus: { uni: true, courses: ["Google Ads"], references: 4 }, activityScore: 88, matchRate: 90, status: "Hired", timeline: [{date: "2026-01", event: "Joined Marketing Agency"}] },
    { id: "ST013", name: "Ceyhun Abbasov", uni: "Baku Engineering University", gpa: 3.4, skills: { hard: ["C++", "Algorithms"], soft: ["Problem Solving"] }, verifyStatus: { uni: true, courses: [], references: 2 }, activityScore: 74, matchRate: 70, status: "Active", timeline: [{date: "2026-02", event: "Competitive Programming Rank 10"}] },
    { id: "ST014", name: "Nigar Hüseynova", uni: "ADA University", gpa: 3.9, skills: { hard: ["Project Management", "Jira", "Scrum"], soft: ["Leadership", "Agile"] }, verifyStatus: { uni: true, courses: ["Scrum Master"], references: 7 }, activityScore: 96, matchRate: 95, status: "Active", timeline: [{date: "2025-08", event: "Certified Scrum Master"}] },
    { id: "ST015", name: "Kamran Qarayev", uni: "UFAZ", gpa: 3.6, skills: { hard: ["React Native", "TypeScript"], soft: ["Flexibility"] }, verifyStatus: { uni: true, courses: ["Udemy"], references: 3 }, activityScore: 85, matchRate: 88, status: "Looking", timeline: [{date: "2026-03", event: "Built Cross-platform Weather App"}] },
    { id: "ST016", name: "Zəhra Sadiqova", uni: "Baku State University", gpa: 3.2, skills: { hard: ["Node.js", "Express", "MongoDB"], soft: ["Teamwork"] }, verifyStatus: { uni: false, courses: [], references: 1 }, activityScore: 72, matchRate: 68, status: "Looking", timeline: [{date: "2026-01", event: "Backend API development"}] },
    { id: "ST017", name: "Rizvan Paşayev", uni: "Khazar University", gpa: 3.75, skills: { hard: ["Data Analytics", "PowerBI", "Tableau"], soft: ["Analytical"] }, verifyStatus: { uni: true, courses: [], references: 5 }, activityScore: 89, matchRate: 92, status: "Hired", timeline: [{date: "2025-10", event: "Data Analyst at Azercell"}] },
    { id: "ST018", name: "Mina Kərimova", uni: "Baku Engineering University", gpa: 3.5, skills: { hard: ["Solidity", "Blockchain"], soft: ["Curiosity"] }, verifyStatus: { uni: true, courses: ["Web3 Bootcamp"], references: 2 }, activityScore: 80, matchRate: 84, status: "Active", timeline: [{date: "2026-02", event: "Smart Contract deployed"}] },
    { id: "ST019", name: "Vüqar Nəsibov", uni: "ADA University", gpa: 3.8, skills: { hard: ["Ruby on Rails", "PostgreSQL"], soft: ["Mentoring"] }, verifyStatus: { uni: true, courses: [], references: 4 }, activityScore: 91, matchRate: 89, status: "Active", timeline: [{date: "2025-12", event: "Mentoring junior devs"}] },
    { id: "ST020", name: "Leyla Abdullayeva", uni: "UNEC", gpa: 3.9, skills: { hard: ["Corporate Law", "Contracts"], soft: ["Negotiation", "Ethics"] }, verifyStatus: { uni: true, courses: [], references: 6 }, activityScore: 94, matchRate: 91, status: "Hired", timeline: [{date: "2026-04", event: "Legal advisor role"}] },
  ],
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
    { id: "R1", studentId: "ST001", teacher: "Prof. Rüstəm", skills: 5, ethics: 5, teamwork: 4, comment: "Exceptional skills in React." },
    { id: "R2", studentId: "ST002", teacher: "Dosent Leyla", skills: 4, ethics: 5, teamwork: 5, comment: "Great team player." }
  ],
  hiringAccuracyTimeline: [
    { month: 'Yan', score: 78, expected: 80 },
    { month: 'Fev', score: 82, expected: 81 },
    { month: 'Mar', score: 88, expected: 85 },
    { month: 'Apr', score: 91, expected: 89 },
    { month: 'May', score: 94, expected: 92 },
  ]
};
