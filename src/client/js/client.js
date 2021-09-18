import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '../styles/weather-icons.min.scss'
import '../styles/resets.scss'
import '../styles/main.scss'
import '../styles/colors.scss'
import { DateTime } from 'luxon'
import fetch from 'node-fetch'

let tripsData
let tripElement
let inputTimeOutId
let tripIndex = 0
const inputTimeOut = 100
const locationOptions = {}

class Trip {
  constructor (tripNo, location, departureDate) {
    this.tripNo = tripNo
    this.location = location
    this.departureDate = departureDate
  }

  display () {
    this.addTripPanel()
    this.displayTripHeader()
    this.displayCurrentWeather().then()
    this.displayWeatherForecast().then()
    this.displayImage().then()
  }

  addTripPanel () {
    const template = document.getElementById('trip-tmpl')
    const clone = template.content.cloneNode(true)
    const ids = clone.querySelectorAll('[id]')
    ids.forEach((id) => {
      clone.getElementById(id.id).id = `${id.id}${this.tripNo}`
    })
    document.getElementById('trips').appendChild(clone)
    this.addRemoveEventHandler()
  }

  addRemoveEventHandler () {
    document.getElementById(`remove-${this.tripNo}`)
      .addEventListener('click', function (event) {
        const tripIdx = parseInt(event.target.id.replace('remove-', ''))
        const tripId = `trip-${tripIdx}`
        document.getElementById(tripId).remove()
        removeLocal(tripIdx)
      })
  }

  displayTripHeader () {
    document.getElementById(`city-${this.tripNo}`).innerText = `${this.location.name},`
    document.getElementById(`city2-${this.tripNo}`).innerText = `${this.location.name},`
    document.getElementById(`country-${this.tripNo}`).innerText = ` ${this.location.countryName}`
    document.getElementById(`country2-${this.tripNo}`).innerText = ` ${this.location.countryName}`
    document.getElementById(`departure-time-${this.tripNo}`)
      .innerText = DateTime.fromISO(this.departureDate).toLocaleString(DateTime.DATE_FULL)
    const diffDays = this.daysToTrip()
    document.getElementById(`days-to-trip-${this.tripNo}`)
      .innerText = `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
  }

  daysToTrip () {
    const departureDateTime = DateTime.fromISO(this.departureDate)
    const currTime = DateTime.now()
    const timeNow = DateTime.fromObject({
      year: currTime.year,
      month: currTime.month,
      day: currTime.day
    })
    return Math.round(departureDateTime.diff(timeNow, 'days').toObject().days)
  }

  displayCurrentWeather () {
    const qStr = {
      lat: this.location.lat,
      lon: this.location.lng
    }
    return fetch('/currentWeather?' + new URLSearchParams(qStr))
      .then(response => response.json())
      .then(currentWeather => {
        this.updateCurrentWeather(currentWeather)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  updateCurrentWeather (currentWeather) {
    const currTime = DateTime.now().setZone(currentWeather.data[0].timezone)
    document.getElementById(`current-time-${this.tripNo}`)
      .innerText = currTime.toFormat('T')
    document.getElementById(`tz-${this.tripNo}`)
      .innerText = `(${currTime.toFormat('ZZZZ')})`
    document.getElementById(`current-day-icon-${this.tripNo}`)
      .setAttribute('class', `wi wi-xx-large icon wi-owm-${currentWeather.data[0].weather.code}`)
    document.getElementById(`weather-description-${this.tripNo}`)
      .innerText = currentWeather.data[0].weather.description
    document.getElementById(`temp-${this.tripNo}`).innerText = `${currentWeather.data[0].temp}`
    document.getElementById(`wind-speed-${this.tripNo}`)
      .innerText = currentWeather.data[0].wind_spd.toFixed(1)
    document.getElementById(`wind-direction-${this.tripNo}`)
      .innerText = currentWeather.data[0].wind_cdir_full
    document.getElementById(`aqi-${this.tripNo}`)
      .innerText = currentWeather.data[0].aqi
    document.getElementById(`relative-humidity-${this.tripNo}`)
      .innerText = currentWeather.data[0].rh.toFixed(0)
    document.getElementById(`pressure-${this.tripNo}`)
      .innerText = currentWeather.data[0].pres.toFixed(0)
    document.getElementById(
      `sunrise-${this.tripNo}`).innerText = DateTime.fromISO(
      currentWeather.data[0].sunrise, { zone: 'utc' }
    ).setZone(currentWeather.data[0].timezone).toFormat('T')
    document.getElementById(
      `sunset-${this.tripNo}`).innerText = DateTime.fromISO(
      currentWeather.data[0].sunset, { zone: 'utc' }
    ).setZone(currentWeather.data[0].timezone).toFormat('T')
  }

  displayWeatherForecast () {
    const qStr = {
      lat: this.location.lat,
      lon: this.location.lng
    }
    return fetch('/weatherForecast?' + new URLSearchParams(qStr))
      .then(response => response.json())
      .then(weatherForecast => {
        this.updateWeatherForecast(weatherForecast)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  updateWeatherForecast (weatherForecast) {
    for (let i = 0; i < 7; i++) {
      const template = this.getDayForecastTempl(i)
      // Fill in the weather values for the day.
      template.getElementById(`day-${i}-${this.tripNo}`)
        .innerText = DateTime.fromISO(weatherForecast.data[i].datetime).toFormat('ccc')
      if (i > 0) {
        template.getElementById(`day-${i}-icon-border-${this.tripNo}`).classList.add('border-l')
      }
      template.getElementById(`day-${i}-icon-${this.tripNo}`)
        .setAttribute('class', `wi forc-icons wi-owm-${weatherForecast.data[i].weather.code}`)
      template.getElementById(`day-${i}-low_temp-${this.tripNo}`)
        .innerText = weatherForecast.data[i].low_temp.toFixed(0)
      template.getElementById(`day-${i}-max_temp-${this.tripNo}`)
        .innerText = weatherForecast.data[i].max_temp.toFixed(0)
      template.getElementById(`day-${i}-temp-${this.tripNo}`)
        .innerText = weatherForecast.data[i].temp.toFixed(0)
      // Append to DOM.
      document.getElementById(`forecast-${this.tripNo}`).appendChild(template)
    }
  }

  getDayForecastTempl (dayIndex) {
    const template = document.getElementById('forecast-tmpl')
    const clone = template.content.cloneNode(true)
    const ids = clone.querySelectorAll('[id]')
    let newId
    ids.forEach((id) => {
      newId = id.id.replace('{weekday}', `${dayIndex}`).replace('{trip}', `${this.tripNo}`)
      clone.getElementById(id.id).id = newId
    })
    return clone
  }

  async displayImage () {
    const queries = [
      { query: `${this.location.name}+${this.location.adminName1}+${this.location.countryName}` },
      { query: `${this.location.name}+${this.location.countryName}` },
      { query: `${this.location.countryName}` }
    ]
    let imgFound = false
    let qStr
    while (queries.length > 0) {
      qStr = queries.shift()
      const locationImage = await fetch('/locationImage?' + new URLSearchParams(qStr))
        .then(response => response.json())
        .catch((err) => {
          console.error(err)
        })
      if (locationImage.total > 0) {
        this.updateLocationImage(locationImage)
        imgFound = true
        break
      }
    }
    if (!imgFound) {
      console.error(`No image found for ${qStr}`)
    }
  }

  updateLocationImage (locationImage) {
    document.getElementById(`img-box-${this.tripNo}`)
      .style.backgroundImage = `url("${locationImage.hits[0].webformatURL}")`
    document.getElementById(`img-credit-${this.tripNo}`)
      .href = `https://pixabay.com/users/${locationImage.hits[0].user}-${locationImage.hits[0].user_id}/`
    document.getElementById(`img-credit-${this.tripNo}`).innerText = locationImage.hits[0].user
  }
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

// listen to changes in the location input element
document.getElementById('location').addEventListener('input', function (event) {
  // The event is fired at every keystroke. To avoid flooding the GeoNames API
  // server, we wait a bit before calling the API.
  window.clearTimeout(inputTimeOutId)
  inputTimeOutId = setTimeout(locationTextChanged, inputTimeOut)
})

// click on submit button
document.getElementById('submit').addEventListener('click', async function (event) {
  const departureDate = document.getElementById('date').value
  let location
  if (locationOptions.hasOwnProperty(document.getElementById('location').value)) {
    location = locationOptions[document.getElementById('location').value]
  } else {
    location = await getLocationData()
  }
  if (typeof location === 'undefined') {
    document.getElementById('error-msg').classList.remove('visibility-hidden')
  } else {
    storeLocal(tripIndex, location, departureDate)
    tripElement = new Trip(tripIndex, location, departureDate)
    tripElement.display()
    tripIndex++
  }
})

// Set the date in the input field to today's date.
const currDate = DateTime.now()
document.getElementById('date').min = currDate.toISODate()
document.getElementById('date').value = currDate.toISODate()

// Retrieve and display trips stored locally
displayLocallyStoredTrips()

function displayLocallyStoredTrips () {
  tripsData = JSON.parse(localStorage.getItem('yourTravelPlanner'))
  console.log('tripsData')
  console.log(tripsData)
  if (tripsData != null) {
    let trip
    tripsData.keys().forEach((key) => {
      trip = tripsData[key]
      tripElement = new Trip(tripIndex, trip.location, trip.departureDate)
      tripElement.display()
      tripIndex++
    })
  } else {
    tripsData = {}
  }
}

function locationTextChanged () {
  // Remove the error message.
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

function storeLocal (tripIdx, location, departureDate) {
  console.log('tripIdx, location, departureDate')
  console.log(tripIdx, location.name, departureDate)
  console.log('typeof tripsData')
  console.log(typeof tripsData)
  tripsData[tripIdx] = {
    location: location,
    departureDate: departureDate
  }
  // eslint-disable-next-line no-undef
  localStorage.setItem('yourTravelPlanner', JSON.stringify(tripsData))
}

function removeLocal (tripIdx) {
  delete tripsData[tripIdx]
  // eslint-disable-next-line no-undef
  localStorage.setItem('yourTravelPlanner', JSON.stringify(tripsData))
}
