const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Auth: registered orgs and users
    db.run(`CREATE TABLE IF NOT EXISTS auth_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        org_id TEXT,
        size_range TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Students added by universities (pending activation)
    db.run(`CREATE TABLE IF NOT EXISTS invited_students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        uni_id INTEGER NOT NULL,
        uni_name TEXT NOT NULL,
        is_activated INTEGER DEFAULT 0,
        password_hash TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        name TEXT,
        uni TEXT,
        major TEXT,
        gpa REAL,
        skills TEXT,
        verifyStatus TEXT,
        activityScore INTEGER,
        matchRate INTEGER,
        status TEXT,
        timeline TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT,
        industry TEXT,
        activeRoles INTEGER,
        hired INTEGER,
        efficiency REAL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        name TEXT,
        instructor TEXT,
        category TEXT,
        rating REAL,
        enrolled INTEGER
    )`);
    
    db.run(`CREATE TABLE IF NOT EXISTS universities (
        id TEXT PRIMARY KEY,
        name TEXT,
        activeStudents INTEGER,
        placementRate REAL,
        events INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS job_listings (
        id TEXT PRIMARY KEY,
        company TEXT,
        title TEXT,
        type TEXT,
        applicants INTEGER
    )`);

    db.get('SELECT COUNT(*) as cnt FROM students', (err, row) => {
        if (row && row.cnt === 0) {
            console.log("Seeding database...");
            const dataPath = path.join(__dirname, '../src/data/dummyData.js');
            try {
                let fileStr = fs.readFileSync(dataPath, 'utf-8');
                let jsonStr = fileStr.replace('export const SYNC_DATA = ', '').trim();
                if(jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
                
                let parsed;
                try {
                parsed = eval('(' + jsonStr + ')');
                } catch(e) {
                console.error("Failed to parse dummy data for seeding.", e);
                return;
                }
                
                const insertStudent = db.prepare('INSERT INTO students VALUES (?,?,?,?,?,?,?,?,?,?,?)');
                if (parsed.students) {
                    parsed.students.forEach(s => {
                        insertStudent.run(
                            s.id, s.name, s.uni, s.major, s.gpa,
                            JSON.stringify(s.skills || {}),
                            JSON.stringify(s.verifyStatus || {}),
                            s.activityScore, s.matchRate, s.status,
                            JSON.stringify(s.timeline || [])
                        );
                    });
                }
                insertStudent.finalize();

                const insertJob = db.prepare('INSERT INTO job_listings VALUES (?,?,?,?,?)');
                if (parsed.job_listings) {
                    parsed.job_listings.forEach(j => {
                        insertJob.run(j.id, j.company, j.title, j.type, j.applicants || 0);
                    });
                }
                insertJob.finalize();

                const insertCompany = db.prepare('INSERT INTO companies VALUES (?,?,?,?,?,?)');
                if (parsed.companies) {
                    parsed.companies.forEach(c => {
                        insertCompany.run(c.id, c.name, c.industry, c.activeRoles, c.hired, c.efficiency);
                    });
                }
                insertCompany.finalize();
                
                const insertUni = db.prepare('INSERT INTO universities VALUES (?,?,?,?,?)');
                if (parsed.universities) {
                    parsed.universities.forEach(u => {
                        insertUni.run(u.id, u.name, u.activeStudents, u.placementRate, u.events);
                    });
                }
                insertUni.finalize();

                const insertCourse = db.prepare('INSERT INTO courses VALUES (?,?,?,?,?,?)');
                if (parsed.courses) {
                    parsed.courses.forEach(c => {
                        insertCourse.run(c.id, c.name, c.instructor, c.category, c.rating, c.enrolled);
                    });
                }
                insertCourse.finalize();

                console.log("Database seeded successfully!");
            } catch(err) {
                console.error("Error seeding DB", err);
            }
        }
    });

});

const dbRun = (query, params) => new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
    });
});

const dbAll = (query, params) => new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
    });
});

module.exports = { db, dbRun, dbAll };
