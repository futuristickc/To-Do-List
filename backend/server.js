require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: '*',  // Allow requests from all origins
    methods: 'GET,POST,PUT,DELETE',  // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization',  // Allow specific headers
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url} - Body:`, req.body);
    next();
});
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);


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