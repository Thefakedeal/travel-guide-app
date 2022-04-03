const express = require('express');
const api = require('./api/index.js');
const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({message: "Hello World"});
});

app.use('/api',api);

module.exports = app;