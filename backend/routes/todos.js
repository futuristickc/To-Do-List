const express = require('express');
const router = express.router;
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');