//CRUD - create read update delete

const mongodb = require('mongodb')
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
            high:data.high,
            low:data.low,
            latitude: data.latitude,
            longitude: data.longitude,
            summary: data.summary,
            rain: data.rain            
        }, (error, result) => {
            if (error) {
                return console.log('Could not insert search history')
            }

            console.log(result.ops)
            console.log(result.insertedCount)
        })

    })
}

// module.exports.readDataFromDB = () => {
//     MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
//         if (error) {
//             return console.log('Unable to connect to database')
//         }

//         const db = client.db(databaseName)

//         db.collection('searchHistory'). insertOne({
//             placeName: data.placeName,
//             temperature: data.temperature,
//             high:data.high,
//             low:data.low,
//             latitude: data.latitude,
//             longitude: data.longitude,
//             summary: data.summary,
//             rain: data.rain            
//         }, (error, result) => {
//             if (error) {
//                 return console.log('Could not insert search history')
//             }

//             console.log(result.ops)
//             console.log(result.insertedCount)
//         })

//     })
// }