const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

// setup handlerbars engine  
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather Service'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.render('index', {
            title : 'Weather Service',
            error: 'Please provide a valid city'
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.render('index', {
                title : 'Weather Service',
                error: 'Please provide a valid city'
            });
        }
            forecast(latitude, longitude, (error, forcastData) => {
                if(error) {
                    return res.send(error);
                }

                res.render('index', {
                    title : 'Weather Service',
                    forecast: forcastData,
                    location: location,
                });
            })
    });

    // res.render('index', {
    //     title : 'Weather Service',
    //     forecast: 'its snowing',
    //     location: 'egypt',
    //     address: req.query.address
    // });
});



app.listen(3000); 