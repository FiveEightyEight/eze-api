require('dotenv').config()
const { app } = require('./app')
const PORT = process.env.PORT || 5767;

app.listen(PORT, _=> {
    console.log('Listening on port: ', PORT);
});