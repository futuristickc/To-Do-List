const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        console.log('🔹 Registering user:', req.body); 
        const { username, email, password } = req.body;

        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if (userExists.rows.length > 0) {
            console.log('❌ User already exists:', email);
            return res.status(400).json({ message: 'User already exist' });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        console.log('✅ User created:', newUser.rows[0]);
        res.status(201).json({ message: 'User Created' });
    } catch (error) {
        console.error('🔥 Error in registration:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const userEmail = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );
        if (userEmail.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        };

        const validPassword = await bcrypt.compare(password, userEmail.rows[0].password);
        if(!validPassword) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        };

        
        const token = jwt.sign({ userid: userEmail.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ message: 'Successful Login', token })
    } catch (error) {
        console.error("🔥 Error in login:", error);
        res.status(500).json({ message: 'Server Error'})
    }
});



module.exports = router;
