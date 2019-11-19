//CRUD - create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

module.exports.saveDataToDB = (data) => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
        if (error) {
            return console.log('Unable to connect to database')
        }

        const db = client.db(databaseName)

        db.collection('searchHistory').insertOne({
            summary: body.daily.data[0].summary,
            temperature: body.currently.temperature + '°C',
            rain: Math.round(body.currently.precipProbability*100,0) + '% chance of rain',
            high:body.daily.data[0].temperatureHigh + '°C',
            low:body.daily.data[0].temperatureLow + '°C'
        }, (error, result) => {
            if (error) {
                return console.log('Could not insert search history')
            }

            console.log(result.ops)
            console.log(result.insertedCount)
        })

        // db.collection('users').insertMany([{
        //     name: "Hennie",
        //     age: 42
        // }, {
        //     name: "Lubin",
        //     age: 9
        // }, { 
        //     name: "Niamé",    
        //     age: 7
        // }, {
        //     name: "Liam",
        //     age: 6
        // }], (error, result) => {
        //     if (error) {
        //         return console.log('Could not insert many')
        //     }
        //     console.log(result.ops)
        //     console.log(result.insertedCount)
        // })

        //   db.collection('tasks').insertMany([{
        //     description: "Task 1",
        //     completed: true
        // }, {
        //     description: "Task 2",
        //     completed: true
        // }, { 
        //     description: "Task 3",
        //     completed: false
        // }, {
        //     description: "Task 4",
        //     completed: false
        // }], (error, result) => {
        //     if (error) {
        //         return console.log('Could not insert many')
        //     }
        //     console.log(result.ops)
        //     console.log(result.insertedCount)
        // })

    })
}