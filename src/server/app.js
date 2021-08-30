// Import required packages.
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const axios = require('axios')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const geoNamesApiUrl = process.env.GeoNamesAPIUrl
const geoNamesApiUser = process.env.GeoNamesAPIUser

if (typeof geoNamesApiUser === 'undefined' || geoNamesApiUrl === 'undefined') {
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

app.get('/qLocation', function (request, response) {
  getGeoNames(request.query.location, function (jsonData) {
    response.status(200).send(JSON.stringify(jsonData))
  })
})

function getGeoNames (location, callback) {
  const url = new URL(geoNamesApiUrl)
  url.search = new URLSearchParams(
    [
      ['name', location],
      ['maxRows', '10'],
      ['username', geoNamesApiUser],
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

module.exports = app
