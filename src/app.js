//*****************************************
// Local testing
// localhost:3000
//
// This app has been deployed to heroku
// https://serfontein-weather.herokuapp.com/
//
//*****************************************


const path = require('path')
const express = require('express')
const hbs = require('hbs')

const appWeather = require('./appWeather')
const appMongo = require('./appMongo')
const appFile = require('./appFile')

const homeModel = require('../public/dto/homeModel')
const aboutModel = require('../public/dto/aboutModel')
const errorModel = require('../public/dto/errorModel')
const helpModel = require('../public/dto/helpModel')
const logging = require('./logging')
const port = process.env.PORT || 3000
const appOwner = 'Dalene Serfontein'
const app = express()


//Define paths for express config

//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/home')
const partialsPath = path.join(__dirname, '../templates/partials/home')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlFilePath))
app.use(appWeather)
app.use(appMongo)
app.use(appFile)



app.get('', (req, res) => {
    
    homeModel.title = 'Butterflies'
    homeModel.dateToday = new Date()
    homeModel.name = appOwner
    homeModel.description = 'This is the butterfly site'
    
    res.render('index', homeModel)
})

app.get('/about', (req, res) => {
    aboutModel.name = appOwner
    aboutModel.title = 'Butterflies - About'
    aboutModel.description = 'This is the Butterflies App'
    aboutModel.dateToday = new Date()
    res.render('about', aboutModel)
})

app.get('/help', (req, res) => {
    helpModel.name = appOwner
    helpModel.title = 'Butterflies - Help'
    helpModel.description = 'Need help with the Butterflies App?'
    helpModel.dateToday = new Date()
    res.render('help', helpModel)
})

app.get('/*', (req, res) => {
    errorModel.name = appOwner
    errorModel.title = 'Butterflies - Error'
    errorModel.description = 'An error occured!'
    errorModel.dateToday = new Date()
    res.render('error', errorModel)
})



//Setup Server
app.listen(port, () => {
    logging.log('Server is up and running on port ' + port + '.')
})


