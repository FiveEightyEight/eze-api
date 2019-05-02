const RestaurantRouter = require('express').Router();
const {
    getByCoord,
    getByAddress
} = require('../services/main');

RestaurantRouter.get('/location/', (req, res) => {
    const {
        address
    } = req.query;
    getByAddress(address)
        .then(( data ) => {
            res.json({
                restaurants: data
            }).status(200);
        })
        .catch(_ => {
            res.json({
                message: 'Error fetching restaurant data'
            }).status(200);
        });
        return;
});

RestaurantRouter.get('/geo/', (req, res) => {
    const {
        lat,
        lon
    } = req.query;
    getByCoord(lat, lon)
        .then(parsedData => {
            res.json({
                restaurants: parsedData
            }).status(200);
        })
        .catch(_ => {
            res.json({
                message: 'Error fetching restaurant data'
            }).status(200);
        });
        return;
});

module.exports = RestaurantRouter;