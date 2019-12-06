const path = require('path')
const express = require('express')
const hbs = require('hbs')

const aboutModel = require('../../model/share/aboutModel')
const helpModel = require('../../model/share/helpModel')
const errorModel = require('../../model/share/errorModel')

const weatherModel = require('../../model/weather/weatherModel')
const weatherIndexModel = require('../../model/weather/weatherIndexModel')

const geoCode = require('../weather/geocode')
const forecast = require('../weather/forecast')

const addressGeoCode1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const addressGeoCode2 = '.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdjw'
const addressWeather = 'https://api.darksky.net/forecast/8065c7a1b8c6e400a9dfb6fdf826430f/'

const appOwner = 'Dalene Serfontein'

const app = module.exports = express()

//Define paths for express config
//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../../pages')
const viewsPath = path.join(__dirname, '../../pages/views/weather')
const partialsPath = path.join(__dirname, '../../pages/partials/weather')

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
    aboutModel.title = 'Weather - About'
    aboutModel.description = 'This is the Weather App'
    aboutModel.dateToday = new Date()
    res.render('about', aboutModel)
})

app.get('/weather/help', (req, res) => {
    helpModel.name = appOwner
    helpModel.title = 'Weather - Help'
    helpModel.description = 'Need help with the Weather App?'
    helpModel.dateToday = new Date()
    res.render('help', helpModel)
})

app.get('/weather/*', (req, res) => {
    errorModel.name = appOwner
    errorModel.title = 'Weather - Error'
    errorModel.description = 'An error occured!'
    errorModel.dateToday = new Date()
    res.render('error', errorModel)
})


