require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is up')
})

const port = 5000
app.listen(port, () => {
    console.log(`App is successfully running on port ${port}`)
})