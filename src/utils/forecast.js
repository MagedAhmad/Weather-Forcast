const request = require('request');

const forecast = (latitude, longitude, callback) => {
    url = 'https://api.darksky.net/forecast/0f7eb77aa6f04724e62a1a41ddfa4a81/'+ longitude +','+ latitude;

    request({url, json: true}, (error, { body }) => {
        if(error) {
            return callback('Cannot connect to weather service', undefined);
        }

        callback(undefined, body.daily.data[0].summary);
    });
}

module.exports = forecast;