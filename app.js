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

const auth = (req, res, next) => {
    const { tkn } = req.headers;
    if(tkn === process.env.tkn){
        next();
        return;
    } else {
        res.status(400);
    };
};

app.get('/fb', auth, (req, res) => {
    res.json({
        fb: process.env.fb 
    }).status(200)
});

app.use((req, res) => {
    res.json({
        message: "Let's Eat!",
    }).status(200);
});

module.exports = {app, };