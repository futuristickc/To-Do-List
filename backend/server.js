require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url} - Body:`, req.body);
    next();
});
app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);


app.get('/', (req, res) => {
    res.send('API is up')
});

app.get('/simple', (req, res) => {
    res.status(200).json({ message: 'Simple test passed!' });
});

app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.status(200).json({ message: 'Test successful!' });
});


app.listen(PORT, () => {
    console.log(`App is successfully running on port ${PORT}`)
})