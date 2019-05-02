require('dotenv').config()
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { RestaurantRouter } = require('./routes/');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/restaurants', RestaurantRouter);

app.use((req, res) => {
    res.json({
        message: process.env,
    }).status(200);
});

module.exports = {app, };