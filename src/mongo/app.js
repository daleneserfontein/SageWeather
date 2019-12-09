const path = require('path')
const express = require('express')
const hbs = require('hbs')

const aboutModel = require('../../model/share/aboutModel')
const helpModel = require('../../model/share/helpModel')
const errorModel = require('../../model/share/errorModel')
const findIndexModel = require('../../model/mongo/findIndexModel')

const mongo = require('./mongo')

const appOwner = 'Dalene Serfontein'

const app = module.exports = express()

//Define paths for express config
//express expects the views directory for the handlebars pages.  if it is not present, need to set the path to templates
const htmlFilePath = path.join(__dirname, '../../pages')
const viewsPath = path.join(__dirname, '../../pages/views/mongo')
const partialsPath = path.join(__dirname, '../../pages/partials/mongo')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') //handlebars templates for pages
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(htmlFilePath))

//Request calls

app.get('/mongo', (req, res) => {
    mongo.readDataFromDB((error, data) => {
        if (error) {
            errorModel.description = error
            return res.send(errorModel)
        }
        data.name = appOwner
        res.render('index', data)    
    })
    
})

app.get('/mongo/find', (req, res) => {
    findIndexModel.name = appOwner
    res.render('find', findIndexModel)
})

app.get('/mongo/findOne', (req, res) => {
    if (!req.query.location) {
        errorModel.description = 'You must provide a location'
        return res.send(errorModel)        
    }

    mongo.readSingleDataFromDB(encodeURIComponent(req.query.location), (error, data) => {
        if (error) {
            errorModel.description = error
            return res.send(errorModel)
        }
        data.name = appOwner
        res.send(data)    
    })
})

app.get('/mongo/about', (req, res) => {
    aboutModel.name = appOwner
    aboutModel.title = 'Mongo - About'
    aboutModel.description = 'This is the Mongos App'
    aboutModel.dateToday = new Date()
    res.render('about', aboutModel)
})

app.get('/mongo/help', (req, res) => {
    helpModel.name = appOwner
    helpModel.title = 'Mongo - Help'
    helpModel.description = 'Need help with the Mongo App?'
    helpModel.dateToday = new Date()
    res.render('help', helpModel)
})

app.get('/mongo/*', (req, res) => {
    errorModel.name = appOwner
    errorModel.title = 'Mongo - Error'
    errorModel.description = 'An error occured!'
    errorModel.dateToday = new Date()
    res.render('error', errorModel)
})



