import '../styles/weather-icons.min.scss'
import '../styles/resets.scss'
import '../styles/main.scss'
import '../styles/colors.scss'
import { DateTime } from 'luxon'
import fetch from 'node-fetch'

let inputTimeOutId
const inputTimeOut = 100
const locationOptions = {}

// listen to changes in the location input element
document.getElementById('location').addEventListener('input', function (event) {
  // The event is fired at every keystroke. To avoid flooding the server, we wait a
  // bit before calling the API.
  window.clearTimeout(inputTimeOutId)
  inputTimeOutId = setTimeout(locationTextChanged, inputTimeOut)
})

function locationTextChanged () {
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
  // console.log(jsonData)
  const newOptions = []
  jsonData.forEach((elem) => {
    const option = document.createElement('option')
    option.value = `${elem.name}, ${elem.adminName1}, ${elem.countryName}`
    newOptions.push(option)
    locationOptions[option.value] = elem
  })
  document.getElementById('suggestions').replaceChildren(...newOptions)
}

// click on submit button
document.getElementById('submit').addEventListener('click', function (event) {
  // console.log(locationOptions[document.getElementById('location').value])
  let location = {}
  if (locationOptions.hasOwnProperty(document.getElementById('location').value)) {
    location = locationOptions[document.getElementById('location').value]
    displayData(location)
  } else {
    getLocationData()
      .then(location => {
        displayData(location)
      })
  }
})

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
  displayWeatherData(location).then()
}

function displayWeatherData (location) {
  const qStr = {
    lat: location.lat,
    lon: location.lng
  }
  return fetch('/currentWeather?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(currentWeather => {
      updateCurrentWeather(location, currentWeather)
      // displayCurrentTime(currentWeather).then()
    })
    .catch((err) => {
      console.error(err)
    })
}

function updateCurrentWeather (location, currentWeather) {
  document.getElementById('city').innerText = `${location.name}, `
  document.getElementById('country').innerText = `${location.countryName}`
  document.getElementById('temp').innerText = `${currentWeather.data[0].temp}`
  const currTime = DateTime.now().setZone(currentWeather.data[0].timezone)
  document.getElementById('current-time')
    .innerText = currTime.toFormat('T')
  document.getElementById('tz')
    .innerText = `(${currTime.toFormat('ZZZZ')})`
  document.getElementById('weather-description')
    .innerText = currentWeather.data[0].weather.description
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
  // TODO: translate sunrise and sunset to correct time zone
  document.getElementById('sunrise')
    .innerText = currentWeather.data[0].sunrise
  document.getElementById('sunset')
    .innerText = currentWeather.data[0].sunset
  console.log('location:')
  console.log(location)
  console.log('currentWeather:')
  console.log(currentWeather)
}

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
