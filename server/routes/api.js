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

module.exports = router;
