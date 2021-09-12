import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '../styles/weather-icons.min.scss'
import '../styles/resets.scss'
import '../styles/main.scss'
import '../styles/colors.scss'
import { DateTime } from 'luxon'
import fetch from 'node-fetch'

let inputTimeOutId
const inputTimeOut = 100
const locationOptions = {}

// Register a service worker
//
// To allow ServiceWorkers to register when running on 'localhost' add 'localhost' to
// list of sites for which cookies and site data is not deleted at browser close. See also:
// https://stackoverflow.com/questions/49539306/firefox-service-worker-securityerror-domexception-the-operation-is-insecure
// If not done, it will cause a "Service Worker: SecurityError: DOMException:
// The Operation is insecure" error.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./service-worker.js')
      .then(function (registration) {
        console.log('Service worker registration was successful. Scope: ', registration.scope)
      }, function (err) {
        console.error('Service worker registration failed: ', err)
      })
  })
}

// listen to changes in the location input element
document.getElementById('location').addEventListener('input', function (event) {
  // The event is fired at every keystroke. To avoid flooding the GeoNames API
  // server, we wait a bit before calling the API.
  window.clearTimeout(inputTimeOutId)
  inputTimeOutId = setTimeout(locationTextChanged, inputTimeOut)
})

// click on submit button
document.getElementById('submit').addEventListener('click', function (event) {
  let location = {}
  if (locationOptions.hasOwnProperty(document.getElementById('location').value)) {
    location = locationOptions[document.getElementById('location').value]
    displayData(location)
  } else {
    getLocationData()
      .then(location => {
        if (typeof location === 'undefined') {
          document.getElementById('error-msg').classList.remove('visibility-hidden')
        } else {
          displayData(location)
        }
      })
  }
})

// Set the date field to today's date.
const currDate = DateTime.now()
document.getElementById('date').min = currDate.toISODate()
document.getElementById('date').value = currDate.toISODate()

function locationTextChanged () {
  // Hide the data and image sections. Remove the error message.
  document.getElementById('data-section').classList.add('display-none')
  document.getElementById('image-section').classList.add('display-none')
  document.getElementById('error-msg').classList.add('visibility-hidden')
  // Get a list of suggestions for locations.
  const qStr = {
    location: document.getElementById('location').value
  }
  return fetch('/Location?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(jsonData => {
      // update datalist for location input field
      updateLocationSuggestions(jsonData)
    })
    .catch((err) => {
      console.error(err)
    })
}

function updateLocationSuggestions (jsonData) {
  const newOptions = []
  jsonData.forEach((elem) => {
    const option = document.createElement('option')
    option.value = `${elem.name}, ${elem.adminName1}, ${elem.countryName}`
    newOptions.push(option)
    locationOptions[option.value] = elem
  })
  document.getElementById('suggestions').replaceChildren(...newOptions)
}

function getLocationData () {
  const qStr = {
    location: document.getElementById('location').value
  }
  return fetch('/location?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(jsonData => {
      return jsonData[0]
    })
    .catch((err) => {
      console.error(err)
    })
}

function displayData (location) {
  displayLocation(location)
  displayCurrentWeather(location).then()
  displayWeatherForecast(location).then()
  unhideDataSection()
  displayImage(location).then()
  unhideImageSection()
}

function displayLocation (location) {
  document.getElementById('city').innerText = `${location.name},`
  document.getElementById('country').innerText = ` ${location.countryName}`
}

function displayCurrentWeather (location) {
  const qStr = {
    lat: location.lat,
    lon: location.lng
  }
  return fetch('/currentWeather?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(currentWeather => {
      updateCurrentWeather(location, currentWeather)
    })
    .catch((err) => {
      console.error(err)
    })
}

function updateCurrentWeather (location, currentWeather) {
  const currTime = DateTime.now().setZone(currentWeather.data[0].timezone)
  document.getElementById('current-time')
    .innerText = currTime.toFormat('T')
  document.getElementById('tz')
    .innerText = `(${currTime.toFormat('ZZZZ')})`
  document.getElementById('current-day-icon')
    .setAttribute('class', `wi wi-xx-large icon wi-owm-${currentWeather.data[0].weather.code}`)
  document.getElementById('weather-description')
    .innerText = currentWeather.data[0].weather.description
  document.getElementById('temp').innerText = `${currentWeather.data[0].temp}`
  document.getElementById('wind-speed')
    .innerText = currentWeather.data[0].wind_spd.toFixed(1)
  document.getElementById('wind-direction')
    .innerText = currentWeather.data[0].wind_cdir_full
  document.getElementById('aqi')
    .innerText = currentWeather.data[0].aqi
  document.getElementById('relative-humidity')
    .innerText = currentWeather.data[0].rh.toFixed(0)
  document.getElementById('pressure')
    .innerText = currentWeather.data[0].pres.toFixed(0)
  document.getElementById('sunrise')
    .innerText = DateTime.fromISO(currentWeather.data[0].sunrise, { zone: 'utc' })
      .setZone(currentWeather.data[0].timezone)
      .toFormat('T')
  document.getElementById('sunset')
    .innerText = DateTime.fromISO(currentWeather.data[0].sunset, { zone: 'utc' })
      .setZone(currentWeather.data[0].timezone)
      .toFormat('T')
}

function displayWeatherForecast (location) {
  const qStr = {
    lat: location.lat,
    lon: location.lng
  }
  return fetch('/weatherForecast?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(weatherForecast => {
      updateWeatherForecast(weatherForecast)
    })
    .catch((err) => {
      console.error(err)
    })
}

function updateWeatherForecast (weatherForecast) {
  for (let i = 0; i < 7; i++) {
    document.getElementById(`day-${i}`)
      .innerText = DateTime.fromISO(weatherForecast.data[i].datetime).toFormat('ccc')
    // TODO: double check whether correct icons are displayed
    // TODO: check html layout when displaying New York
    document.getElementById(`day-${i}-icon`)
      .setAttribute('class', `wi forc-icons wi-owm-${weatherForecast.data[i].weather.code}`)
    document.getElementById(`day-${i}-low_temp`)
      .innerText = weatherForecast.data[i].low_temp.toFixed(0)
    document.getElementById(`day-${i}-max_temp`)
      .innerText = weatherForecast.data[i].max_temp.toFixed(0)
    document.getElementById(`day-${i}-temp`)
      .innerText = weatherForecast.data[i].temp.toFixed(0)
  }
}

function unhideDataSection () {
  document.getElementById('data-section').classList.remove('display-none')
}

async function displayImage (location) {
  const queries = [
    { query: `${location.name}+${location.adminName1}+${location.countryName}` },
    { query: `${location.name}+${location.countryName}` },
    { query: `${location.countryName}` }
  ]
  let imgFound = false
  while (queries.length > 0) {
    const qStr = queries.shift()
    const locationImage = await fetch('/locationImage?' + new URLSearchParams(qStr))
      .then(response => response.json())
      .catch((err) => {
        console.error(err)
      })
    if (locationImage.total > 0) {
      updateLocationImage(locationImage)
      imgFound = true
      break
    }
  }
  if (!imgFound) {
    // TODO: No image found. Hide the image panel.
  }
}

function updateLocationImage (locationImage) {
  document.getElementById('img-box')
    .style.backgroundImage = `url("${locationImage.hits[0].webformatURL}")`
  document.getElementById('img-credit')
    .href = `https://pixabay.com/users/${locationImage.hits[0].user}-${locationImage.hits[0].user_id}/`
  document.getElementById('img-credit').innerText = locationImage.hits[0].user
}

function unhideImageSection () {
  document.getElementById('image-section').classList.remove('display-none')
}
