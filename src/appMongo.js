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
const logging = require('./logging')

const mongoModel = require('../public/dto/mongoModel')
const appOwner = 'Dalene Serfontein'

const app = module.exports = express()

//Define paths for express config
//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/mongo')
const partialsPath = path.join(__dirname, '../templates/partials/mongo')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlFilePath))

//Request calls

app.get('/mongo', (req, res) => {
    mongoModel.name = appOwner
    res.render('index', mongoModel)
})

// app.get('/mongo/*', (req, res) => {
//     errorModel.name = appOwner
//     res.render('error', errorModel)
// })


