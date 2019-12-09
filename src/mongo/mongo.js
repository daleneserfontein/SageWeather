//CRUD - create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID


const {MongoClient, ObjectID} = require('mongodb')

let mongoModel = require('../../model/mongo/mongoModel')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'weather'


module.exports.saveDataToDB = (data, callback) => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            return callback('Unable to connect to database')
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
                return callback('Could not insert search history')
            }
            callback(null, result)
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
            mongoModel.searchResult = result
            callback(null, mongoModel)
        })
    })
}

module.exports.readSingleDataFromDB = (location, callback) => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            callback('Unable to connect to database')
        }

        const db = client.db(databaseName)
        
        db.collection('searchHistory').findOne({placeName: { '$regex' : location, '$options' : 'i' }}, (error, result) => {
            if (error) {
                callback('Could not read search history')
            }            
            mongoModel.searchResult = result
            if (result === null) {
                mongoModel.description = "No search results match your criteria"
            }
            callback(null, mongoModel)            
        })
    })
}