const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createUsersTable } = require('./models/user');
const statusRoutes = require('./routes/statusRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createUsersTable();

app.use('/api', statusRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('backend');
});

app.listen(port, () => {
    console.log(`backend works on port ${port}`);
});