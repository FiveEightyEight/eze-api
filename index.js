require('dotenv').config()
const app = require('express')();
const PORT = process.env.PORT || 5767;


app.use((req, res) => {
    res.json({
        message: process.env,
    }).status(200);
});

app.listen(PORT, _=> {
    console.log('Listening on port: ', PORT);
});