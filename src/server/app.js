// Import required packages.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config({ path: path.resolve(__dirname, '.env') })

// const geoNamesApiUrl = process.env.GeoNamesAPIUrl
// const geoNamesApiUser = process.env.GeoNamesAPIUser

if (typeof process.env.GeoNamesAPIUser === 'undefined' ||
  process.env.GeoNamesAPIUrl === 'undefined') {
  console.error('File ./src/server/.env not found! The file contains the URL and API key for the ' +
    'MeaningCloud sentiment analysis service. See ./src/server/.env_tmpl for a template.')
}

// Set up instance of Express app.
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Set path to static web content.
app.use(express.static('dist'))

app.get('/', function (request, response) {
  response.status(200).sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.get('/location', function (request, response) {
  getLocation(request.query.location, function (jsonData) {
    response.status(200).send(JSON.stringify(jsonData))
  })
})

app.get('/currentWeather', function (request, response) {
  getCurrentWeather(request.query.lat, request.query.lon, function (jsonData) {
    response.status(200).send(JSON.stringify(jsonData))
  })
})

app.get('/weatherForecast', function (request, response) {
  getWeatherForecast(request.query.lat, request.query.lon, function (jsonData) {
    response.status(200).send(JSON.stringify(jsonData))
  })
})

function getLocation (location, callback) {
  const url = new URL(process.env.GeoNamesAPIUrl)
  url.search = new URLSearchParams(
    [
      ['name', location],
      ['maxRows', '10'],
      ['username', process.env.GeoNamesAPIUser],
      ['type', 'json'],
      ['featureClass', 'P'],
      ['featureClass', 'A'],
    ]
  ).toString()
  axios.get(url.href)
    .then(response => {
      const suggestions = []
      response.data.geonames.forEach((elem) => {
        suggestions.push(
          {
            lng: elem.lng,
            lat: elem.lat,
            name: elem.name,
            adminName1: elem.adminName1,
            countryName: elem.countryName,
            countryCode: elem.countryCode
          }
        )
      })
      callback(suggestions)
    })
    .catch(error => {
      console.error(error)
    })
}

function getCurrentWeather (lat, lon, callback) {
  const url = new URL(process.env.WeatherbitAPIUrlCurrent)
  url.search = new URLSearchParams(
    [
      ['lat', lat],
      ['lon', lon],
      ['key', process.env.WeatherbitAPIKey]
    ]
  ).toString()
  axios.get(url.href)
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}

function getWeatherForecast (lat, lon, callback) {
  const url = new URL(process.env.WeatherbitAPIUrlForecast)
  url.search = new URLSearchParams(
    [
      ['lat', lat],
      ['lon', lon],
      ['key', process.env.WeatherbitAPIKey]
    ]
  ).toString()
  axios.get(url.href)
    .then(response => {
      callback(response.data)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = app
