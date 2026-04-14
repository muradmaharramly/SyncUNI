const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbRun, dbAll, dbGet } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'syncuni_jwt_secret_2026';
const SALT_ROUNDS = 10;

// ─── REGISTER ────────────────────────────────────────────────────────────────
// Register: University, Company, Course
router.post('/register', async (req, res) => {
    const { name, email, password, role, sizeRange } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Bütün sahələr doldurulmalıdır.' });
    }

    const allowedRoles = ['university', 'company', 'course'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: 'Yalnız universitet, şirkət və ya kurs qeydiyyatdan keçə bilər.' });
    }

    try {
        const existing = await dbGet('SELECT id FROM auth_users WHERE email = ?', [email]);
        if (existing) {
            return res.status(409).json({ error: 'Bu e-poçt ünvanı artıq qeydiyyatdadır.' });
        }

        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await dbRun(
            'INSERT INTO auth_users (email, password_hash, role, name, size_range) VALUES (?, ?, ?, ?, ?) RETURNING id',
            [email, password_hash, role, name, sizeRange || null]
        );

        const token = jwt.sign(
            { id: result.lastID, email, role, name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: { id: result.lastID, email, role, name, sizeRange }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Qeydiyyat zamanı xəta baş verdi.' });
    }
});

// ─── LOGIN ────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-poçt və şifrə tələb olunur.' });
    }

    try {
        // Check orgs (company/university/course)
        const orgUser = await dbGet('SELECT * FROM auth_users WHERE email = ?', [email]);
        if (orgUser) {
            const valid = await bcrypt.compare(password, orgUser.password_hash);
            if (!valid) return res.status(401).json({ error: 'E-poçt və ya şifrə yanlışdır.' });

            const token = jwt.sign(
                { id: orgUser.id, email: orgUser.email, role: orgUser.role, name: orgUser.name },
                JWT_SECRET,
                { expiresIn: '7d' }
            );
            return res.json({
                success: true, token,
                user: { id: orgUser.id, email: orgUser.email, role: orgUser.role, name: orgUser.name, sizeRange: orgUser.size_range }
            });
        }

        // Check invited students
        const student = await dbGet('SELECT * FROM invited_students WHERE email = ?', [email]);
        if (student) {
            if (!student.is_activated || !student.password_hash) {
                return res.status(403).json({ error: 'Hesabınız hələ aktiv edilməyib. Universitetinizlə əlaqə saxlayın.' });
            }
            const valid = await bcrypt.compare(password, student.password_hash);
            if (!valid) return res.status(401).json({ error: 'E-poçt və ya şifrə yanlışdır.' });

            const token = jwt.sign(
                { id: student.id, email: student.email, role: 'student', name: student.name, uni: student.uni_name },
                JWT_SECRET,
                { expiresIn: '7d' }
            );
            return res.json({
                success: true, token,
                user: { id: student.id, email: student.email, role: 'student', name: student.name, uni: student.uni_name }
            });
        }

        return res.status(401).json({ error: 'Bu e-poçt ünvanı qeydiyyatda tapılmadı.' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Giriş zamanı xəta baş verdi.' });
    }
});

// ─── STUDENT: Activate account (first-time password set) ─────────────────────
router.post('/student/activate', async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await dbGet('SELECT * FROM invited_students WHERE email = ?', [email]);
        if (!student) return res.status(404).json({ error: 'Tələbə tapılmadı.' });
        if (student.is_activated) return res.status(409).json({ error: 'Hesab artıq aktivdir.' });

        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        await dbRun('UPDATE invited_students SET is_activated = 1, password_hash = ? WHERE email = ?', [password_hash, email]);

        const token = jwt.sign(
            { id: student.id, email: student.email, role: 'student', name: student.name, uni: student.uni_name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({
            success: true, token,
            user: { id: student.id, email: student.email, role: 'student', name: student.name, uni: student.uni_name }
        });
    } catch (err) {
        console.error('Activate error:', err);
        res.status(500).json({ error: 'Aktivasiya zamanı xəta baş verdi.' });
    }
});

// ─── UNIVERSITY: Check if student email is invited ────────────────────────────
router.get('/student/check/:email', async (req, res) => {
    try {
        const student = await dbGet('SELECT id, name, uni_name, is_activated FROM invited_students WHERE email = ?', [req.params.email]);
        if (!student) return res.json({ exists: false });
        res.json({ exists: true, isActivated: !!student.is_activated, name: student.name, uni: student.uni_name });
    } catch (err) {
        res.status(500).json({ error: 'Xəta baş verdi.' });
    }
});

// ─── UNIVERSITY: Invite/add a student ────────────────────────────────────────
router.post('/students/invite', async (req, res) => {
    const { name, email, token: authToken } = req.body;

    // verify JWT
    let decoded;
    try {
        decoded = jwt.verify(authToken, JWT_SECRET);
    } catch {
        return res.status(401).json({ error: 'İcazəsiz əməliyyat.' });
    }

    if (decoded.role !== 'university') {
        return res.status(403).json({ error: 'Yalnız universitetlər tələbə əlavə edə bilər.' });
    }

    try {
        const existing = await dbGet('SELECT id FROM invited_students WHERE email = ?', [email]);
        if (existing) return res.status(409).json({ error: 'Bu e-poçt artıq əlavə edilib.' });

        await dbRun(
            'INSERT INTO invited_students (name, email, uni_id, uni_name) VALUES (?, ?, ?, ?)',
            [name, email, decoded.id, decoded.name]
        );
        res.json({ success: true });
    } catch (err) {
        console.error('Invite error:', err);
        res.status(500).json({ error: 'Tələbə əlavə edilərkən xəta baş verdi.' });
    }
});

// ─── UNIVERSITY: List invited students ───────────────────────────────────────
router.get('/students/invited', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token yoxdur.' });
    try {
        const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        if (decoded.role !== 'university') return res.status(403).json({ error: 'Giriş yoxdur.' });
        const students = await dbAll('SELECT id, name, email, is_activated, created_at FROM invited_students WHERE uni_id = ?', [decoded.id]);
        res.json({ students });
    } catch (err) {
        res.status(401).json({ error: 'Token keçərsizdir.' });
    }
});

// ─── GET All Universities (for student registration dropdown) ─────────────────
router.get('/universities', async (req, res) => {
    try {
        const unis = await dbAll("SELECT id, name FROM auth_users WHERE role = 'university' ORDER BY name", []);
        res.json({ universities: unis });
    } catch (err) {
        res.status(500).json({ error: 'Universitetlər yüklənə bilmədi.' });
    }
});

module.exports = router;
