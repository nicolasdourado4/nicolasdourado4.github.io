const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService= require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance()
    const result = db.GetAllData()

    result
        .then(data => res.json({data: data})) //
        .catch(err => console.log(err))
})

app.get('/getCardData', (req, res) => {
    const db = dbService.getDbServiceInstance()
    const result = db.GetCardData()

    result
        .then(data => res.json({data: data})) //
        .catch(err => console.log(err))
})

app.post('/insert', (req, res) => {
    const { email } = req.body;
    const db = dbService.getDbServiceInstance()
    const result = db.insertEmail(email)

    result
        .then(data => res.json({success: true}))
        .catch(err => console.log(err))
})

app.post('/insertCard', (req, res) => {
    const { title, description } = req.body
    const db = dbService.getDbServiceInstance()
    const result = db.insertCard(title, description)

    result
        .then(data => res.json({success: true}))
        .catch(err => console.log(err))
})


app.listen(process.env.PORT, () => {
    console.log("server started");
})