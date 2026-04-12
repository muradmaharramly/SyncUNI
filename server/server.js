const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const apiRoutes = require('./routes/api');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
