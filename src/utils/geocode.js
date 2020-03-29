const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFnZWRyYXNsYW4iLCJhIjoiY2s4YjltejYxMDl1eTNkcGl3YjdvZXczZCJ9.6hoOM4Y4Fye4T2QKuYwW7g';

    request({json: true, url},(error, { body }) => {
        if(error) {
            return callback('Cannot connect to location services', undefined);
        }

        if(body.features.length == 0) {
            return callback('Choose a diffrent place', undefined);
        }

        callback(undefined, {
            latitude : body.features[0].center[0],
            longitude : body.features[0].center[1],
            location : body.features[0].place_name
        });
    })
}

module.exports = geocode;