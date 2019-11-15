const path = require('path')
const express = require('express')
const hbs = require('hbs')

const chalk = require('chalk')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//error1: invalid url
//const url = 'https://kapi.mapbox.com/geocoding/v5/mapbox.places/123what.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdjw'
//error2: invalid token
//const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/pretoria.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdj'
//error3: empty features for search term
//const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/pretoria.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdjw'
//no error
const addressGeoCode1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const addressGeoCode2 = '.json?access_token=pk.eyJ1IjoiZGFsZW5lc2VyZm9udGVpbiIsImEiOiJjazJidG9ncTAwdnJyM2htanZ4aTBzb2lhIn0.R9yB05e0nAnTFEEtLPmdjw'


// const addressWeather = 'https://api.darksky.net/forecast/8065c7a1b8c6e400a9dfb6fdf826430f/' + data.latitude + ',' + data.longitude + '?units=si'
//  const addressWeather = 'https://api.darksky.net/forecast/8065c7a1b8c6e400a9dfb6fdf826430f/0?units=si'
const addressWeather = 'https://api.darksky.net/forecast/8065c7a1b8c6e400a9dfb6fdf826430f/'



const log = function (msg) {
    if (typeof msg === 'string') {
        console.log(chalk.bgGreen.black(msg))
    } else {
        console.log(msg)
    }
}

const err = function (msg) {
    if (typeof msg === 'string') {
        console.log(chalk.bgRed.black(msg))
    } else {
        console.log(chalk.red(msg))
    }
}


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config

//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlFilePath))


//Models
let indexModel = {
    title: 'Weather App',
    dateToday: new Date(),
    name: 'Dalene Serfontein',
    description: 'What is the weather today?',
    placeName: '',
    latitude: '',
    longitude: '',
    location: '',
    summary: '',
    rain:'',
    temparature:''
}

let aboutModel = {
    title: 'Weather App - About',
    dateToday: new Date(),
    name: 'Dalene Serfontein',    
    description: 'This is a weather app'    
}

let helpModel = {
    title: 'Weather App - Help',
    dateToday: new Date(),
    description: 'Need some help with the weather app?',
    name: 'Dalene Serfontein'    
}

let errorModel = {
    title: 'Weather App - Error',
    dateToday: new Date(),
    description: 'That page does not exist',
    name: 'Dalene Serfontein'
}

let errorHelpModel = {
    title: 'Weather App - Help Error',
    dateToday: new Date(),
    description: 'The help does not exist',    
    name: 'Dalene Serfontein'
}


//Request calls
app.get('', (req, res) => {
    res.render('index', indexModel)
})

app.get('/about', (req, res) => {
    res.render('about', aboutModel)
})

app.get('/help', (req, res) => {
    res.render('help', helpModel)
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        errorModel.description = 'You must provide a location'
        return res.send(errorModel)        
    }
    indexModel.location = encodeURIComponent(req.query.location)
    const addressGeoCode = addressGeoCode1 + indexModel.location + addressGeoCode2
    geoCode.getGeoCodes(addressGeoCode, indexModel, (error, data) => {
        if (error) {
            errorModel.description = error
            return res.send(errorModel)
        }
        const weatherUrl = addressWeather + indexModel.latitude + ',' + indexModel.longitude + '?units=si'
        forecast.getForecast(weatherUrl, indexModel, (error, data) => {
            if (error) {
                errorModel.description = error
                return res.send(errorModel)
            }
            res.send(indexModel)
        })        
    })
})

app.get('*', (req, res) => {
    errorModel = {
        title: 'Weather App - Error',
        dateToday: new Date(),
        description: 'That page does not exist',
        name: 'Dalene Serfontein'
    }
    res.render('error', errorModel)
})


//Setup Server
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '.')
})


