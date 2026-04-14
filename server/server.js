const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*', // Production mühitində bunu konkrét Netlify URL-i ilə əvəz etmək daha təhlükəsizdir
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler (CORS xətalarının qarşısını almaq üçün)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Daxili server xətası baş verdi.', 
        details: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
