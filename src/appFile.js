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
const yargs = require('yargs')
const fileCrud = require('./utils/fileCrud')

const fileModel = require('../public/dto/fileModel')
const aboutModel = require('../public/dto/aboutModel')
const helpModel = require('../public/dto/helpModel')
const errorModel = require('../public/dto/errorModel')

const appOwner = 'Dalene Serfontein'

const app = module.exports = express()

//Define paths for express config
//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/file')
const partialsPath = path.join(__dirname, '../templates/partials/file')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlFilePath))

//Request calls

app.get('/file', (req, res) => {
    fileModel.name = appOwner
    res.render('index', fileModel)
})

app.get('file/about', (req, res) => {
    aboutModel.name = appOwner
    aboutModel.title = 'Files - About'
    aboutModel.description = 'This is the Files App'
    aboutModel.dateToday = new Date()
    res.render('about', aboutModel)
})

app.get('/file/help', (req, res) => {
    helpModel.name = appOwner
    helpModel.title = 'Files - Help'
    helpModel.description = 'Need help with the Files App?'
    helpModel.dateToday = new Date()
    res.render('help', helpModel)
})

app.get('/file/*', (req, res) => {
    errorModel.name = appOwner
    errorModel.title = 'File - Error'
    errorModel.description = 'An error occured!'
    errorModel.dateToday = new Date()
    res.render('error', errorModel)
})


