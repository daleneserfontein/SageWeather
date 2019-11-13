const request = require('request')

module.exports.getForecast = (url, data, callback) => {

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback(body.error)
        } else if (body.daily === null || body.currently === null || body.daily.data.length === 0) {
            callback(body.error)
        } else {
            data.summary = body.daily.data[0].summary
            data.temperature = body.currently.temperature + '°C'
            data.rain = Math.round(body.currently.precipProbability*100,0) + '% chance of rain'
            callback(null, data)
        }
    })
}