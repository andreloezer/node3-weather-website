const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b8a2214733eab05fea25e81fd2a1a14&query=' + latitude + ',' + longitude + '&units=m'

    request ({url, json: true}, (error, {body}) => {
        if (error) {
            ('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else if (!body.location.name) {
            callback('Forecasts for this region are unavailable. Please try another location', undefined)
        } else {
            const {weather_descriptions:description, temperature, feelslike, precip, humidity, weather_icons} = body.current
            const {name, region, country} = body.location
            const report = description[0] + '. It is currently ' + temperature + ' degrees Celsius out in ' + name + ', ' + region + ', ' + country + '. It feels like ' + feelslike + ' degrees Celsius out. The relative humidity is ' + humidity + '% and there is a ' + precip + '% chance of rain.'
            const icon = weather_icons[0]
            callback(undefined, report, icon)
        }
    })
}

module.exports = forecast