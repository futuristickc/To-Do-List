require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
.then(() => console.log("Connected to Database"))
.catch(() => console.log("Error connecting to DB"))

app.get('/', (req, res) => {
    res.send('API is up')
})

const port = 5000
app.listen(port, () => {
    console.log(`App is successfully running on port ${port}`)
})