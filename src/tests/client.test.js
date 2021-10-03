import fetchMock from 'jest-fetch-mock'
import _ from 'lodash'

import * as testData from './client.test.data'
import { testCurrentWeather } from './client.test.data'

fetchMock.enableMocks()

beforeEach(() => {
  fetch.mockClear()
})

const path = require('path')
const fs = require('fs')
window.document.body.innerHTML = fs.readFileSync(
  path.resolve(__dirname, '../../dist/index.html'))
const client = require('../client/js/client') // needs to be loaded after the HTML file

test('unknown location submitted', () => {
  fetch.once(JSON.stringify([])) // empty location list returned for unknown location
  client.submit()
  expect(
    !window.document.getElementById('error-msg').classList.contains('visibility-hidden')
  )
})

test('valid location submitted', async () => {
  fetch.once(JSON.stringify(testData.testLocation))
  const response = await client.getLocationData()
  expect(
    _.isEqual(response, testData.testLocation[0])
  )
})

test('location added to DOM', async () => {
  window.document.getElementById('location').value = testData.testLocationInput
  fetch
    .once(JSON.stringify(testData.testLocation)) // mock get location data API
    .once(JSON.stringify(testData.testCurrentWeather)) // mock get current weather API
    .once(JSON.stringify(testData.testWeatherForecast)) // mock get weather forecast API
    .once(JSON.stringify(testData.testLocationImage)) // mock get location image API
  await client.submit()
  // Spot check location data has been added
  expect(window.document.getElementById('city-0').innerText).toBe(testData.testLocation[0].name)
  expect(window.document.getElementById('city-0').innerText).toBe(testData.testLocation[0].name)
  expect(window.document.getElementById('country-0').innerText).toBe(testData.testLocation[0].countryName)
  expect(window.document.getElementById('country2-0').innerText).toBe(testData.testLocation[0].countryName)
})
