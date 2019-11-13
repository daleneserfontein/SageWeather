const request = require('request')

module.exports.getGeoCodes = (url, data, callback) => {

    request({ url, json: true }, (error, { body }) => {
        if (error) { //error1
            callback('Unable to connect to geo coding!')
        } else if (body.message) { //error2
            callback(body.message)
        } else if (body.features.length === 0) { //error3
            callback('No results for search term')
        } else { //no error
            data.longitude = body.features[0].center[0].toString()
            data.latitude = body.features[0].center[1].toString()
            data.placeName = body.features[0].place_name

            callback(null, data)
        }
    })
}