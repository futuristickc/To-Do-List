const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();

router.post('/register', 
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password must be at least 6 characters'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            //Check if email exist
            const userExist = await pool.query('SELECT * FROM users WHERE email =$1', [email]);
            if (userExist.rows.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            //Insert new user
            const newUser = await pool.query(
                'INSER INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );


            //Generating JWT token
            const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, {expiresIn: '1h' });

            res.status(201).json({ token, user: newUser.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

//Login User
router.post(
    '/login', 
    [
        body('email').isEmail().withMessage("Email is required"),
        body('password').notEmpty().withMessage('Passord is required'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { email, password } = req.body;

        try {
            //Check is user exists
            const user = await pool.query('SELECT * FROM users WHERE email = $1, [email]');
            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }


            //Compare password
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (isMatch) {
                return res.status(400).json({ message: 'Invalid credentials'});
            }


            //Generate JWT token
            const token = jwt.sign({ userId: user.rows[0].id}, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token, user: user.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;
