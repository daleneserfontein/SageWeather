//*****************************************
// Local testing
// localhost:3000/weater
//
// This app has been deployed to heroku
// https://serfontein-weather.herokuapp.com/
//
//*****************************************

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const logging = require('./logging')

const aboutModel = require('../public/dto/aboutModel')
const helpModel = require('../public/dto/helpModel')
const errorModel = require('../public/dto/errorModel')
const weatherModel = require('../public/dto/weatherModel')
const weatherIndexModel = require('../public/dto/weatherIndexModel')

const addressGeoCode1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const addressGeoCode2 = '.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdjw'
const addressWeather = 'https://api.darksky.net/forecast/8065c7a1b8c6e400a9dfb6fdf826430f/'
const appOwner = 'Dalene Serfontein'

const app = module.exports = express()

//Define paths for express config
//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/weather')
const partialsPath = path.join(__dirname, '../templates/partials/weather')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// app.engine('hbs', hbs({defaultLayout: 'layout'}));

//Setup static directory to serve
app.use(express.static(htmlFilePath))

//Request calls

app.get('/weather', (req, res) => {
    weatherIndexModel.name = appOwner
    res.render('weather', weatherIndexModel)
})

app.get('/weather/main', (req, res) => {
    if (!req.query.location) {
        errorModel.description = 'You must provide a location'
        return res.send(errorModel)        
    }
    weatherModel.location = encodeURIComponent(req.query.location)
    const addressGeoCode = addressGeoCode1 + weatherModel.location + addressGeoCode2
    geoCode.getGeoCodes(addressGeoCode, weatherModel, (error, data) => {
        if (error) {
            errorModel.description = error
            return res.send(errorModel)
        }
        const weatherUrl = addressWeather + weatherModel.latitude + ',' + weatherModel.longitude + '?units=si'
        forecast.getForecast(weatherUrl, weatherModel, (error, data) => {
            if (error) {
                errorModel.description = error
                return res.send(errorModel)
            }
            res.send(weatherModel)
        })        
    })
})

app.get('/weather/about', (req, res) => {
    aboutModel.name = appOwner
    res.render('about', aboutModel)
})

app.get('/weather/help', (req, res) => {
    helpModel.name = appOwner
    res.render('help', helpModel)
})

app.get('/weather/*', (req, res) => {
    errorModel.name = appOwner
    res.render('error', errorModel)
})


