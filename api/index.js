const express = require('express');
const serverless = require('serverless-http');
const app = express();

// Lakukan import router dari file app/router.js
const router = require('../app/router');

// Gunakan router yang sudah ada
app.use(express.json());
app.use('/', router);

// Ubah aplikasi Express menjadi serverless function
module.exports.handler = serverless(app);
