const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// atau jika ingin lebih spesifik mengizinkan localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// ... routes and other middleware
