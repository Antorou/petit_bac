const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./models/index');
require('dotenv').config();

const { createUsersTable } = require('./models');
const statusRoutes = require('./routes/statusRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initializeDatabase()

app.use('/api', statusRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/game', gameRoutes);

app.get('/', (req, res) => {
    res.send('backend');
});

app.listen(port, () => {
    console.log(`backend works on port ${port}`);
});