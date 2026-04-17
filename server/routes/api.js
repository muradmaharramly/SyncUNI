const express = require('express');
const router = express.Router();
const { dbAll, dbRun } = require('../db');

// Parse JSON strings back into objects when sending to frontend
const parseJsonField = (field, fallback) => {
    if (!field) return fallback;
    try { return JSON.parse(field); } catch(e) { return fallback; }
};

// GET full ecosystem Data for DataContext
router.get('/ecosystem', async (req, res) => {
    try {
        const students = await dbAll('SELECT * FROM students');
        const jobs = await dbAll('SELECT * FROM job_listings');
        const companies = await dbAll('SELECT * FROM companies');
        const universities = await dbAll('SELECT * FROM universities');
        const courses = await dbAll('SELECT * FROM courses');

        // Transform students back
        const formattedStudents = students.map(s => ({
            ...s,
            skills: parseJsonField(s.skills, { hard: [], soft: [] }),
            verifyStatus: parseJsonField(s.verifyStatus, { uni: false, courses: [], references: 0 }),
            timeline: parseJsonField(s.timeline, [])
        }));

        res.json({
            record: {
                sync_uni_full_ecosystem: {
                    students: formattedStudents,
                    job_listings: jobs,
                    companies: companies,
                    universities: universities,
                    courses: courses
                }
            }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update Student Status (Hire, active, etc.)
router.put('/students/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status, matchRateIncrease, funnelStage } = req.body;
    try {
        // Just directly update the status
        await dbRun('UPDATE students SET status = ? WHERE id = ?', [status, id]);
        
        if (matchRateIncrease) {
            await dbRun('UPDATE students SET matchRate = MIN(matchRate + ?, 100) WHERE id = ?', [matchRateIncrease, id]);
        }
        res.json({ success: true });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

router.put('/students/:id/endorse', async (req, res) => {
    const { id } = req.params;
    try {
        await dbRun('UPDATE students SET activityScore = MIN(activityScore + 2, 100) WHERE id = ?', [id]);
        res.json({ success: true });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

// Create New Course
router.post('/courses', async (req, res) => {
    const { name, category, instructor, enrolled, rating } = req.body;
    if (!name) return res.status(400).json({ error: 'Ad mütləqdir' });

    const newId = 'C' + Date.now().toString().slice(-6);
    try {
        await dbRun(
            'INSERT INTO courses (id, name, category, instructor, enrolled, rating) VALUES (?, ?, ?, ?, ?, ?)',
            [newId, name, category || 'General', instructor || 'SyncUNI Partner', enrolled || 0, rating || 5.0]
        );
        res.json({ success: true, id: newId });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

// Create Reference Template
router.post('/references/templates', async (req, res) => {
    const { title, content, uni_id } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Başlıq və mətn mütləqdir' });

    try {
        await dbRun(
            'INSERT INTO reference_templates (uni_id, title, content) VALUES (?, ?, ?)',
            [uni_id || 1, title, content]
        );
        res.json({ success: true });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

// Bulk Upload Students
router.post('/bulk-upload/students', async (req, res) => {
    const { students, uni_id, uni_name } = req.body;
    if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ error: 'Siyahı boşdur' });
    }

    try {
        await dbRun('BEGIN');
        for (const s of students) {
            await dbRun(
                'INSERT INTO invited_students (name, email, uni_id, uni_name) VALUES (?, ?, ?, ?) ON CONFLICT (email) DO NOTHING',
                [s.name, s.email, uni_id, uni_name]
            );
        }
        await dbRun('COMMIT');
        res.json({ success: true, count: students.length });
    } catch(err) {
        await dbRun('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Bulk upload error' });
    }
});

// Create Job Listing
router.post('/job-listings', async (req, res) => {
    const { title, type, company } = req.body;
    if (!title) return res.status(400).json({ error: 'Başlıq mütləqdir' });

    const newId = 'J' + Date.now().toString().slice(-6);
    try {
        await dbRun(
            'INSERT INTO job_listings (id, company, title, type, applicants) VALUES (?, ?, ?, ?, ?)',
            [newId, company || 'SyncUNI Partner', title, type || 'Full-time', 0]
        );
        res.json({ success: true, id: newId });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'DB Error' });
    }
});

module.exports = router;
