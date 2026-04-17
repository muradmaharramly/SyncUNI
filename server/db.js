const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

// Helper to convert SQLite "?" placeholders to PostgreSQL "$1, $2, ..."
const convertPlaceholders = (sql) => {
    let index = 1;
    return sql.replace(/\?/g, () => `$${index++}`);
};

const dbRun = async (query, params = []) => {
    const formattedSql = convertPlaceholders(query);
    const res = await pool.query(formattedSql, params);
    // Mimic SQLite result structure (lastID, changes)
    // Note: To get lastID, the query should have RETURNING id
    return { 
        lastID: res.rows[0]?.id || null, 
        changes: res.rowCount 
    };
};

const dbAll = async (query, params = []) => {
    const formattedSql = convertPlaceholders(query);
    const res = await pool.query(formattedSql, params);
    return res.rows;
};

const dbGet = async (query, params = []) => {
    const rows = await dbAll(query, params);
    return rows[0] || null;
};

// Initialize Database Tables
const initDb = async () => {
    try {
        await pool.query('BEGIN');

        // Auth: registered orgs and users
        await pool.query(`CREATE TABLE IF NOT EXISTS auth_users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            name TEXT NOT NULL,
            org_id TEXT,
            size_range TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // Students added by universities (pending activation)
        await pool.query(`CREATE TABLE IF NOT EXISTS invited_students (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            uni_id INTEGER NOT NULL,
            uni_name TEXT NOT NULL,
            is_activated INTEGER DEFAULT 0,
            password_hash TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS students (
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

        await pool.query(`CREATE TABLE IF NOT EXISTS companies (
            id TEXT PRIMARY KEY,
            name TEXT,
            industry TEXT,
            activeRoles INTEGER,
            hired INTEGER,
            efficiency REAL
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS courses (
            id TEXT PRIMARY KEY,
            name TEXT,
            instructor TEXT,
            category TEXT,
            rating REAL,
            enrolled INTEGER
        )`);
        
        await pool.query(`CREATE TABLE IF NOT EXISTS universities (
            id TEXT PRIMARY KEY,
            name TEXT,
            activeStudents INTEGER,
            placementRate REAL,
            events INTEGER
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS job_listings (
            id TEXT PRIMARY KEY,
            company TEXT,
            title TEXT,
            type TEXT,
            applicants INTEGER
        )`);

        await pool.query(`CREATE TABLE IF NOT EXISTS reference_templates (
            id SERIAL PRIMARY KEY,
            uni_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await pool.query('COMMIT');

        // Seeding logic
        const countRes = await pool.query('SELECT COUNT(*) FROM students');
        if (parseInt(countRes.rows[0].count) === 0) {
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
                
                if (parsed.students) {
                    for (const s of parsed.students) {
                        await pool.query('INSERT INTO students VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [
                            s.id, s.name, s.uni, s.major, s.gpa,
                            JSON.stringify(s.skills || {}),
                            JSON.stringify(s.verifyStatus || {}),
                            s.activityScore, s.matchRate, s.status,
                            JSON.stringify(s.timeline || [])
                        ]);
                    }
                }

                if (parsed.job_listings) {
                    for (const j of parsed.job_listings) {
                        await pool.query('INSERT INTO job_listings VALUES ($1, $2, $3, $4, $5)', [
                            j.id, j.company, j.title, j.type, j.applicants || 0
                        ]);
                    }
                }

                if (parsed.companies) {
                    for (const c of parsed.companies) {
                        await pool.query('INSERT INTO companies VALUES ($1, $2, $3, $4, $5, $6)', [
                            c.id, c.name, c.industry, c.activeRoles, c.hired, c.efficiency
                        ]);
                    }
                }
                
                if (parsed.universities) {
                    for (const u of parsed.universities) {
                        await pool.query('INSERT INTO universities VALUES ($1, $2, $3, $4, $5)', [
                            u.id, u.name, u.activeStudents, u.placementRate, u.events
                        ]);
                    }
                }

                if (parsed.courses) {
                    for (const c of parsed.courses) {
                        await pool.query('INSERT INTO courses VALUES ($1, $2, $3, $4, $5, $6)', [
                            c.id, c.name, c.instructor, c.category, c.rating, c.enrolled
                        ]);
                    }
                }

                console.log("Database seeded successfully!");
            } catch(err) {
                console.error("Error seeding DB", err);
            }
        }
    } catch (err) {
        if (err.message && err.message.includes('already exists')) {
             console.log('Tables already exist, skipping initialization.');
        } else {
             console.error('Initialization error:', err);
        }
        await pool.query('ROLLBACK');
    }
};

initDb();

module.exports = { pool, dbRun, dbAll, dbGet };
