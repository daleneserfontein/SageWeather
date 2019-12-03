//CRUD - create read update delete

const mongodb = require('mongodb')
let mongoModel = require('../../public/dto/mongoModel')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'weather'


module.exports.saveDataToDB = (data) => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database')
        }

        const db = client.db(databaseName)

        db.collection('searchHistory').insertOne({
            placeName: data.placeName,
            temperature: data.temperature,
            high: data.high,
            low: data.low,
            latitude: data.latitude,
            longitude: data.longitude,
            summary: data.summary,
            rain: data.rain,
            dateAdded: new Date()
        }, (error, result) => {
            if (error) {
                return console.log('Could not insert search history')
            }

            console.log(result.ops)
            console.log(result.insertedCount)
        })

    })
}

module.exports.readDataFromDB = (callback) => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            callback('Unable to connect to database')
        }

        const db = client.db(databaseName)

        db.collection('searchHistory').find({}).toArray((error, result) => {
            if (error) {
                callback('Could not read search history')
            }

            // mongoModel.title = 'Mongo App'
            // mongoModel.dateToday = new Date()
            // mongoModel.name = ''
            // mongoModel.description = 'This is a mongo app'
            mongoModel.searchResult = result
            // mongoModel.placeName = result.placeName
            // mongoModel.temperature = result.temperature
            // mongoModel.high = result.high
            // mongoModel.low = result.low
            // mongoModel.latitude = result.latitude
            // mongoModel.longitude = result.longitude
            // mongoModel.summary = result.summary
            // mongoModel.rain = result.rain
            // mongoModel.dateAdded = result.dateAdded
            // mongoModel.id = result._id
            callback(null, mongoModel)
        })
    })
}