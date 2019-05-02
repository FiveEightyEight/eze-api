const axios = require('axios');
const key = process.env.YELP_KEY;


const parseYelpData = ({
    businesses
}) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(businesses) || !businesses.length) return reject('Invalid data passed, Must be a yelp data response');
        const obj = {}
        const a = businesses.reduce((acc, e, i) => {
            const {
                name,
                alias,
                display_phone,
                image_url,
                price,
                phone,
            } = e;
            if (!obj[name]) {
                const categories = e.categories.reduce((acc, e) => {
                    acc.push(e.title)
                    return acc;
                }, []);
                acc.push({
                    name,
                    display_phone: display_phone || null,
                    phone: phone || null,
                    menu_url: 'https://www.yelp.com/menu/' + alias,
                    image_url: image_url || null,
                    price: price || null,
                    categories
                })
                obj[name] = true
            }

            return acc;
        }, [])
        return resolve(a)
    });
};


const getByCoord = (lat, lon) => {
    return axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=fastfood&latitude=${lat}&longitude=${lon}&limit=50`,
            headers: {
                Authorization: `BEARER ${key}`,
                Origin: 'https://eze-api.herokuapp.com/'
            }
        })
        .then(res => {
            return parseYelpData(res.data)
        })
        .catch( err => {
            return err;
        });;
};

const getByAddress = (address) => {
    return axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=fastfood&location=${address}&limit=50`,
            headers: {
                Authorization: `BEARER ${key}`,
                Origin: 'https://eze-api.herokuapp.com/'
            }
        })
        .then(res => {
            return parseYelpData(res.data)
        })
        .catch( err => {
            return err;
        });
};

module.exports = {
    getByCoord,
    getByAddress
};