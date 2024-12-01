const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas da API primeiro
app.get('/api/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance()
    const result = db.GetAllData()

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err))
});

app.get('/api/getCardData', (req, res) => {
    const db = dbService.getDbServiceInstance()
    const result = db.GetCardData()

    result
        .then(data => res.json({data: data}))
        .catch(err => console.log(err))
});

app.post('/api/insert', (req, res) => {
    const { email } = req.body;
    const db = dbService.getDbServiceInstance()
    const result = db.insertEmail(email)

    result
        .then(data => res.json({success: true}))
        .catch(err => console.log(err))
});

app.post('/api/insertCard', (req, res) => {
    const { title, description } = req.body;
    const db = dbService.getDbServiceInstance()
    const result = db.insertCard(title, description)

    result
        .then(data => res.json({success: true}))
        .catch(err => console.log(err))
});

// Servir arquivos estáticos depois das rotas da API
app.use(express.static(path.join(__dirname, '..')));

// Rota catch-all por último
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
});