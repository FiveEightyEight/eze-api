require('dotenv').config()
const app = require('express')();

app.use((req, res) => {
    res.json({
        message: process.env,
    }).status(200);
});

module.exports = {app, };