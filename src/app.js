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
const homeModel = require('../public/dto/homeModel')
const logging = require('./logging')
const port = process.env.PORT || 3000






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



app.get('', (req, res) => {
    
    homeModel.title = 'Butterflies'
    homeModel.dateToday = new Date()
    homeModel.name = 'Dalene Serfontein'
    homeModel.description = 'This is the butterfly site'
    
    res.render('index', homeModel)
})


//Setup Server
app.listen(port, () => {
    logging.log('Server is up and running on port ' + port + '.')
})


