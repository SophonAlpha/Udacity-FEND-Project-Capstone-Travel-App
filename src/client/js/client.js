import '../styles/weather-icons.min.scss'
import '../styles/resets.scss'
import '../styles/main.scss'
import '../styles/colors.scss'
import fetch from 'node-fetch'

let inputTimeOutId
const inputTimeOut = 100
let locationOptions = {}

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
  return fetch('/qLocation?' + new URLSearchParams(qStr))
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
    console.log(location)
  } else {
    getLocationData()
      .then(location => {
        console.log(location)
      })
  }
})

function getLocationData () {
  const qStr = {
    location: document.getElementById('location').value
  }
  return fetch('/qLocation?' + new URLSearchParams(qStr))
    .then(response => response.json())
    .then(jsonData => {
      return jsonData[0]
    })
    .catch((err) => {
      console.error(err)
    })
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
